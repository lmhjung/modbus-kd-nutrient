
// https://www.tahapaksu.com/crc/


/* eslint-disable no-console, no-unused-vars, spaced-comment */

const colors        = require('colors');
const moment        = require('moment');

// const events = require("events");
// const EventEmitter = events.EventEmitter || events;
const EventEmitter = require("events");
// const modbus3288Event = new EventEmitter();
// modbus3288Event.emit("My first event");


const ModbusRTU = require("./src/mbus_3288_main.js");
const { send } = require('process');


global.holdingRegisters = {};
const coils = {};
const inputRegisters = {};
const discreteInputs = {};


const vector = {
    getInputRegister: function(addr) {
        return inputRegisters[addr];
    },
    getMultipleInputRegisters: function(startAddr, length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values[i] = inputRegisters[startAddr + i];
        }
        return values;
    },
    getDiscreteInput: function(addr) {
        return discreteInputs[addr];
    },
    getHoldingRegister: function(addr) {
        return holdingRegisters[addr];
    },
    setRegister: function(addr, value) {
        holdingRegisters[addr] = value;
        return;
    },
    setRegister3288_Float32: function(addr, value, status) {
        const hexStr                = Float32ToHex(value);
        holdingRegisters[addr]      = parseInt( hexStr.substr(4, 4) , 16);
        holdingRegisters[addr+1]    = parseInt( hexStr.substr(0, 4) , 16);
        holdingRegisters[addr+2]    = status;    // "B.3" 에 정의됨, 0:정상, 1:오류, 등등....
        return;

        // hexString = yourNumber.toString(16);
        // yourNumber = parseInt(hexString, 16);
        // '03'.padStart(6,'0'); // '000003'
        // '2500'.padStart(8,'$'); // "$$$$2500"
        // '12345'.padStart(10); // "     12345"
        // 'abc'.padEnd(9,'123'); // "abc123123"
        // '주석문'.padStart(6,'*').padEnd(9,'*'); // "***주석문***"

        // // 28.8
        // // 41E66666
        // const val = 28.8;
        // const buf2 = Buffer.alloc(4)
        // buf2.writeFloatBE(val, 0)
        // console.log( buf2 )
        // console.log( buf2.readIntBE(0, 2), buf2.readIntBE(2, 2) )
        // const num = ieee754_read(buf2, 0, false, 23, 4)
        // console.log( num )

    },
    setRegister3288_UInt32: function(addr, value) {
        let dd = value.toString(16).padStart(8,'0')
        // console.log('aa',  dd);
        // console.log('aa',  dd);
        // console.log('aa',  dd);
        const hexStr                = value.toString(16).padStart(8,'0');
        holdingRegisters[addr]      = parseInt( hexStr.substr(4, 4) , 16);
        holdingRegisters[addr+1]    = parseInt( hexStr.substr(0, 4) , 16);
        return;
    },

    getMultipleHoldingRegisters: function(startAddr, length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values[i] = holdingRegisters[startAddr + i];
        }
        // console.log( values )
        return values;
    },
    getCoil: function(addr) {
        return coils[addr];
    },
    setCoil: function(addr, value) {
        coils[addr] = value;
        return coils[addr];
    },
    readDeviceIdentification: function() {
        return {
            // 0x01: 3,
            // 0x0002: 2,
            // 0x0003: 3,
        };
    }
};



// https://www.tahapaksu.com/crc/
// https://www.tahapaksu.com/crc/
setInterval(() => {
    /**
        // 01 10 01 F8 00 09 12 00 01 00 02 00 03 00 04 00 05 00 06 00 07 00 08 00 09 5B 2B
        01          // 1byte device ID
        10          // 1byte FC16
        01 F8       // 2byte 504      <<< 시작 주소 
        00 09       // 2byte num of registers
        12          // 1byte num of byte  ( 9개 값을 보내니깐 바이트는 18 EA Good !!! )
        00 01       // 2byte all value
        00 02 
        00 03 
        00 04 
        00 05 
        00 06 
        00 07 
        00 08 
        00 09 
        5B 2B       // 2byte CRC
    */

    // // buf.readUIntBE(offset, byteLength)
    // const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);
    // console.log(buf.readUInt32BE(0, 2).toString(16));
    // // Prints: 12345678

    // let myNumber = new Buffer.from('41E66666', 'hex').readFloatBE()
    // console.log( myNumber )


}, 1000);






const Float32ToHex = (float32) => {
    const getHex = i => ('00' + i.toString(16)).slice(-2);
    var view = new DataView(new ArrayBuffer(4))
    view.setFloat32(0, float32);
    return Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join('');
}

const Float32ToBin = (float32) => {
    const HexToBin = hex => (parseInt(hex, 16).toString(2)).padStart(32, '0');
    const getHex = i => ('00' + i.toString(16)).slice(-2);
    var view = new DataView(new ArrayBuffer(4))
    view.setFloat32(0, float32);
    return HexToBin(Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join(''));
}

const HexToFloat32 = (str) => {
    var int = parseInt(str, 16);
    if (int > 0 || int < 0) {
        var sign = (int >>> 31) ? -1 : 1;
        var exp = (int >>> 23 & 0xff) - 127;
        var mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
        var float32 = 0
        for (i = 0; i < mantissa.length; i += 1) { float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp-- }
        return float32 * sign;
    } else return 0
}

const BinToFloat32 = (str) => {
    var int = parseInt(str, 2);
    if (int > 0 || int < 0) {
        var sign = (int >>> 31) ? -1 : 1;
        var exp = (int >>> 23 & 0xff) - 127;
        var mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
        var float32 = 0
        for (i = 0; i < mantissa.length; i += 1) { float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp-- }
        return float32 * sign;
    } else return 0
}




// // Full example
// // var test_value = -0.3;
// var test_value = 28.8;
// console.log(`Input value (${test_value}) => hex (${Float32ToHex(test_value)}) [${Math.ceil(Float32ToHex(test_value).length / 2)} bytes] => float32 (${HexToFloat32(Float32ToHex(test_value))})`);
// console.log(`Input value (${test_value}) => binary (${Float32ToBin(test_value)}) [${Float32ToBin(test_value).length} bits] => float32 (${BinToFloat32(Float32ToBin(test_value))})`);



class Mbus_3288_Slave extends EventEmitter {
    constructor( _port, _rate, _id, supply ) {
        super();

        let self = this;
        this.supply = supply;
        this.name = 'packet';
        
        try {
            this.serverSerial = new ModbusRTU.ServerSerial(
                vector,
                {
                    port: _port || 'COM6',
                    baudRate: _rate || 9600,
                    debug: true,
                    unitID: _id || 1,
                    enron: false,
                    enronTables: {
                        booleanRange: [1001, 1999],
                        shortRange: [3001, 3999],
                        longRange: [5001, 5999],
                        floatRange: [7001, 7999]
                    }
                }
            );
        } 
        catch (error) {
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
            console.log( 'serial error' )            
        }


        this.serverSerial.on("error", function(err) {
            try {
                // Handle socket error if needed, can be ignored
                console.error(err);
                self.emit( 'myerror', {msg:'error', data: err } );
            } 
            catch (error) {
                
            }
        });
        
        this.serverSerial.on("initialized", function() {
            console.log("initialized");
        });
        
        this.serverSerial.on("socketError", function(err) {
            console.error(err);
            this.serverSerial.close(closed);
        });
        
        function closed() {
            console.log("server closed");
        }
        
        this.serverSerial.on("open", function() {
            console.log("opened");
        });    


        // ├───────────────────────────────────────────────┐ 
        // ├────   rxData                                  │
        // ├───────────────────────────────────────────────┘
        this.serverSerial.on("rxData", async function(data) {
            try {
                let bufArr = [...data];

                self.emit( 'TxRx', {msg:'3288 rxBuffer', data: data } );

                if( holdingRegisters[203] === 3 ) {
                    this.emit( 'myMessage', {msg:'log', data: '명령취소(수동모드)' } );
                    return;
                }

                // 01 10 01 F5 00 03 06 00 02 00 65 00 02 1F B1
                if( bufArr[1] === 16 ) {    // if( bufArr[1]===6 || bufArr[1]===16 ) {
                    console.log( colors.bgBrightCyan( `get write message CMD=${data.readUInt16BE(2, 2)}` ) );
                    let cmd_no = data.readUInt16BE(2, 2);

                    if( cmd_no === 501 || cmd_no === 504 ) {
                        console.log( `get cmd_no =${cmd_no}` )
                    }
                    else {
                        this.emit( 'mylog', {msg:'log', data: 'we need 501 or 504' } );
                        return;
                    }

                    // OPID 가 변경된 상황인지 체크 즉, 명령이 변경되었음을 확인.
                    if(holdingRegisters[202] !== data.readUInt16BE(9, 2) ) {
                        switch ( cmd_no ) {

                            /**
                             * 제어권 변경을 위해 
                             * 501 주소에 2,101,2 << 이렇게 넣으면 
                             * 01 10 01 F5 00 03 06 00 02 00 65 00 02 1F B1  << 15 byte
                             * 
                             */
                            // 제어권 변경을 위해 
                            // 
                            
                            case 501:

                                if( holdingRegisters[203] === 1 && data.readUInt16BE(11, 2) === 2 ) {
                                    self.emit( 'command_form_master_ctlChange', {msg: 'cmd changed'} );
                                }

                                vector.setRegister(501, data.readUInt16BE(7, 2))
                                vector.setRegister(502, data.readUInt16BE(9, 2))
                                vector.setRegister(503, data.readUInt16BE(11, 2))

                                vector.setRegister(201, 0)
                                vector.setRegister(202, data.readUInt16BE(9, 2))
                                vector.setRegister(203, data.readUInt16BE(11, 2))
                                self.emit( 'command_form_master', {msg: 501, data: data} );



                                break;
                        
                            case 504:
                                // 01 10 01 F8 00 02 04 01 91 00 66 20 E6
                                console.log( holdingRegisters[203] )
                                if( holdingRegisters[203] === 2) {
                                    console.log( data.readUInt16BE(7, 2) )
                                    vector.setRegister(202, data.readUInt16BE(9, 2));   // OPID
                                    vector.setRegister(502, data.readUInt16BE(9, 2))    // OPID

                                    vector.setRegister(504, data.readUInt16BE(7, 2))    // 401 (1회관수)
                                    vector.setRegister(505, data.readUInt16BE(9, 2))    // OPID

                                    // 0    : OFF
                                    // 401  : 1회관수
                                    // 402  : AREA_ON
                                    // 403  : PARAM_ON
                                    self.emit( 'command_form_master', {msg: data.readUInt16BE(7, 2), data: data } );
                                }
                                else {
                                    console.log( '   '.bgMagenta, '제어권이 REMOTE 상태가 아닙니다.'.magenta )
                                }
                                break;

                            default:
                                break;
                        }

                    }
                    else {
                        console.log( '   '.bgMagenta, 'OPID가 동일하여 명령이 취소됩니다.'.magenta )
                    }
                }
                // // console.log( 'RX:', data )
                // self.emit( 'TxRx', {msg:'rxBuffer', data: data } );
            } 
            catch (error) {
                self.emit( 'myerror', {msg:'error', data: error } );
            }


        });

        // ├───────────────────────────────────────────────┐ 
        // ├────   txData                                  │ 
        // ├───────────────────────────────────────────────┘
        this.serverSerial.on("txData", function(data) {
            self.emit( 'TxRx', {msg:'3288 txBuffer', data: data} );
            // console.log( 'TX:', [...data] )
            // console.log( 'TX:', data )
        });

        this.serverSerial.on("onDebug", function(data) {
            // // let bufArr = [...data];
            // // console.log( 'check :', data, bufArr );
            // console.log( data );
            // // data.readHoldingRegister === 501 
            // // if(bufArr[])
        });

    }



    buy(email, price) {
        if (this.supply > 0) {
            this.supply--;
            this.emit("buy", email, price, Date.now());
            return;
        }
        this.emit("TxRx", new Error("There are no more tickets left to purchase"));
    };


    send( json) {
        console.log( 'zzz' )
    };

    setRegisterUInt16( add, val ) {
        vector.setRegister( add, val )
    };

    setRegisterUInt32( add, val ) {
        vector.setRegister3288_UInt32( add, val )
        // this.emit( 'TxRx', json );
    };

    /**
     *  ============================================================== update flow
     * 유량정리 
     * @param {*} json 
     * @returns 
     */
    writeReg_flow (json) {
        // console.log( 'get flow update ', json )
        this.emit( 'mylog', json );

        // 전체유량 업데이트 
        let readVal = new Buffer.from( `${holdingRegisters[226].toString(16).padStart(4,'0')}${holdingRegisters[225].toString(16).padStart(4,'0')}`, 'hex').readFloatBE();
        let targetVal = readVal + json.value;
        // console.log( 'get flow : ', readVal, targetVal )
        vector.setRegister3288_Float32(225, targetVal, 0)
        
        // 구역유량 업데이트 
        let curNo = json.no*3
        readVal = new Buffer.from( `${holdingRegisters[226+curNo].toString(16).padStart(4,'0')}${holdingRegisters[225+curNo].toString(16).padStart(4,'0')}`, 'hex').readFloatBE();
        targetVal = readVal + json.value;
        // console.log( readVal, targetVal )
        vector.setRegister3288_Float32(225+curNo, targetVal, 0)

        return;
    };


    /**
     *  ============================================================== update ecph
     * Ec, pH 정리
     * @param {} json 
     * 
    */
    writeReg_ecph (json) {
        // console.log( 'get Ec/pH update ', json )
        this.emit( 'mylog', json );

        let _regAddress = 204 + (json.no - 1) * 3
        vector.setRegister3288_Float32(_regAddress, json.value[0] , 0)      // 순간 일사값
        _regAddress += 9;
        vector.setRegister3288_Float32(_regAddress, json.value[1] , 0)      // 누적 일사값
        // _regAddress += 9;
        // vector.setRegister3288_Float32(_regAddress, json.value[1] , 0)      // 수온값 <<< 아직 없음
    };

    /**
     *  ============================================================== update Solar 일사 순간? 누적?
     * 일사값 정리 
     * @param {} json 
     * 
    */
    writeReg_solar (json) {
        // console.log( 'get solar update ', json )
        this.emit( 'mylog', json );

        let _regAddress = 222;
        vector.setRegister3288_Float32(_regAddress, json.value[0] , 0)      // 일사 값 

    };
    


    // - 1      ~   8       (기관코드, 회사코드, 제품타입, 제품코드, 프로토콜버전, 채널수,시리얼번호)
    writeReg_companyInfo (json) {
        // console.log( 'get solar update ', json )
        this.emit( 'mylog', json );
        // value : {   
        //     org_code : 0,
        //     comp_code : 0,
        //     pdt_type : 3,
        //     pdt_code : 204, 
        //     protocol_ver : 20,
        //     chanel_no : 21,
        //     serial_no : 50
        // }
        let _regAddress = 0;
        vector.setRegister( _regAddress+1, json.value.r001 );
        vector.setRegister( _regAddress+2, json.value.r002 );
        vector.setRegister( _regAddress+3, json.value.r003 );
        vector.setRegister( _regAddress+4, json.value.r004 );
        vector.setRegister( _regAddress+5, json.value.r005 );
        vector.setRegister( _regAddress+6, json.value.r006 );
        vector.setRegister3288_UInt32( _regAddress+7, json.value.r007 );
        console.log( '------- 기관코드 설정완료 -------' )

    };
    


    // - 101    ~   121     (노드부착디바이스)
    writeReg_attachDevice (json) {
        try {
            // console.log( 'get solar update ', json )
            this.emit( 'mylog', json );
            let _regAddress = 101;
            vector.setRegister(_regAddress+0, json.value.ec[0] );       // EC1 센서 
            vector.setRegister(_regAddress+1, json.value.ec[1] );       // EC2 센서 
            vector.setRegister(_regAddress+2, json.value.ec[2]);       // EC3 센서 
            vector.setRegister(_regAddress+3, json.value.ph[0]);       // PH1 센서 
            vector.setRegister(_regAddress+4, json.value.ph[1]);       // PH2 센서 
            vector.setRegister(_regAddress+5, json.value.ph[2]);       // PH3 센서 
            vector.setRegister(_regAddress+6, json.value.solar[0]);    // 일사센서 
            for(let i=0; i<13; i++) {       // 전체유량 포함하면 12구역 + 총유량 = 13개 임
                vector.setRegister( 108 + i, json.value.flow[i] );       // 전체 /  구역유량센서 
            }
            vector.setRegister(121, json.value.irr );    // 레벨3 양액기
            console.log( '------- 부착센서 완료 -------' );
        } 
        catch (error) {
            console.log( error )            
        }

    };
    



    makeRegisterMap( ) {

        // ------------------------------------------------------------------------
        // ------- A.1.4 	양액기 노드 상태 정보
        // ------------------------------------------------------------------------
        // 양액기 노드 상태 정보 조회 패킷 201번 부터 3개 요청 (201, 202, 203)
        // 01 03 00 C9 00 03 D5 F5
        // ------------------------------------------------------------------------
        // 레지스터 주소   의미                타입
        // ------------------------------------------------------------------------
        // 201	        노드 상태               uint16
        // 202	        명령 ID (opid)          uint16
        // 203	        제어권 상태             uint16

        // vector.setRegister(201, 0)          // B.3   READY
        // vector.setRegister(202, 1)          // opid  ???
        // vector.setRegister(203, 1)          // B.4   LOCAL(1)/REMOTE(2)/MANUAL(3)
        // console.log( '------- 양액기 노드 상태 정보 완료 (안건드렸음) -------' )

        
        /**
         * 
         * 센서값 
         * 
         */
        for(let i=204; i<264; i+=3) {
            vector.setRegister3288_Float32(i, 0.00, 0);       // EC #1
            // console.log( 'run this', i )
        }
        console.log( '------- write 양액기노드 센서값 정보 -------' )
    
        console.log( '------- write 임시 온도센서 상태 28.8 -------' )
    





    }


    /**
     *  ============================================================== 양액기 운전정보 업데이트 
     * 양액기 운전정보 업데이트 
     * @param {} json 
     * 
    */
     writeReg_working (json) {
        vector.setRegister( 401, json.value.r401 );             // 동작상태 
        vector.setRegister( 402, json.value.r402 );             // 관수구역 
        vector.setRegister( 403, json.value.r403 );             // 경보정보
        vector.setRegister( 404, json.value.r404 );             // OPID
        vector.setRegister3288_UInt32( 405, json.value.r405 );  // 남은 관수시간
    };
    

}


/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */

module.exports = Mbus_3288_Slave
















