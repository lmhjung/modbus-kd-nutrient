



// https://www.tahapaksu.com/crc/

// DEC to HEX https://www.rapidtables.com/convert/number/decimal-to-hex.html?x=372 
// Float To HEX https://gregstoll.com/~gregstoll/floattohex/ 
// CRC https://www.lddgo.net/en/encrypt/crc


const myProcess = process.memoryUsage();
let tmrCheck = 0;
setInterval(() => {
    console.log(tmrCheck ++, (`${Math.round(myProcess['rss'] / 1024 / 1024 * 100) / 100} MB`).brightYellow)
}, 30 * 1000);







/* eslint-disable no-console, no-unused-vars, spaced-comment */
const colors                = require('colors');
const moment                = require('moment');

const Mbus_3288_Slave       = require("./index.js");
const Mbus_3288_Alarm       = require("./src/mbus_3288_alarm.js");
const Mbus_3288_Database    = require("./src/mbus_3288_database.js");
// const Mbus_3288_Httppost    = require("../src/mbus_3288_httppost.js"); // to be...



const mbus_3288_slave       = new Mbus_3288_Slave( 'COM6', 115200, 1, 3 );
const mbus_3288_alarm       = new Mbus_3288_Alarm();
const mbus_3288_database    = new Mbus_3288_Database();


const KSX = require('./src/KSX_Define.js');


mbus_3288_slave.on("buy", (email, price, timestamp) => {
    console.log( 'get buy' )
    mbus_3288_alarm.send(email);
    mbus_3288_database.save(email, price, timestamp);
});
mbus_3288_slave.on("error", (error) => {
    console.error(`Gracefully handling our error: ${error}`);
});


const onBuy = () => {
    console.log("I will be removed soon");
};

console.log(`We have ${mbus_3288_slave.listenerCount("buy")} listener(s) for the buy event`);
console.log(`We have ${mbus_3288_slave.listenerCount("error")} listener(s) for the error event`);


mbus_3288_slave.buy("test@email.com", 10);
mbus_3288_slave.buy("test@email.com", 10);
mbus_3288_slave.buy("test@email.com", 10);
// mbus_3288_slave.off("buy", onBuy);




// console.log( KSX.Appendix_3288 )



// 각 회사의 양액기 템플릿
let myDevice = {
    OPID : 100,
    company : {
        default : {
            org_code        : 0,
            comp_code       : 0,
            pdt_type        : 3,
            pdt_code        : KSX.Appendix_3288.B_6.level3, 
            protocol_ver    : 20,
            chanel_no       : 21,
            serial_no       : 50
        }
    },
    devices : {
        ex : [ 12, 12, 12 ],
        ph : [ 16, 16, 16 ],
        solar : [
            {107:7}
        ],
        flow : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
        nutrient_level : KSX.Appendix_3288.B_6.level3
    },
    // ------------------------------------------------------------------------
    // ------- B.3 상태 코드
    // ------------------------------------------------------------------------                
    // 공통             READY                   0	        정상, 준비중, 정지
    //                  ERROR	                1	        오류
    //                  BUSY	                2	        처리 불능
    //                  VOLTAGE_ERROR	        3	        동작 전압 이상
    //                  CURRENT_ERROR	        4	        동작 전류 이상
    //                  TEMPERATURE_ERROR	    5	        동작 온도 이상
    //                  FUSE_ERROR	            6	        휴즈 이상
    //                  RESERVED	            7-99	    공통 예약(reserved)
    // ------------------------------------------------------------------------                
    // 센서	            NEED_REPLACE	        101	        센서 및 소모품 교체 요망
    //                  NEED_CALIBRATION	    102	        센서 교정 요망
    //                  NEED_CHECK	            103	        센서 점검 필요
    // ------------------------------------------------------------------------                
    // 양액기	        PREPARING(또는 MIXING)  401	        준비 중
    //                  SUPPLYING	           402	        제공 중
    //                  STOPPING	           403	        정지 중
    // ------------------------------------------------------------------------                
    // 기타             VENDOR_SPECIFIC_ERROR	900-999	    제조사 정의 에러 코드    
    nutri_status : {            // 양액기 노드 상태정보 B.3 상태(status) 코드
        201 : KSX.Appendix_3288.B_3.READY,                // 
        202 : 100,              // start time defien to 100
        203 : 1,                // 초기화 상태에서 제어권은 1(로컬)로 되어야 함.
    },

    sensor_val : {              // 양액기 노드 상태정보 B.3 상태(status) 코드
        ec          : [0, 0, 0],
        ph          : [0, 0, 0],
        temp        : [0, 0, 0],
        solar       : [0],
        flow        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },

    control : {
        501 : KSX.Appendix_3288.B_3.READY,
        502 : 100,              // 초기화 상태 
        503 : 1                 // 조기화 상태
    },

}













// - 1      ~   8       (기관코드, 회사코드, 제품타입, 제품코드, 프로토콜버전, 채널수,시리얼번호)
// - 101    ~   121     (노드부착디바이스)
// - 201    ~   203     (양액기노드상태)
// - 204    ~   263     (센서상태)
// - 401    ~   406     (양액기상태)
// - 501    ~   513     (양액기노드제어)

console.log( '------------------ START ------------------' );
console.log( '------------------ START ------------------' );
setTimeout( async ()  => {
    mbus_3288_slave.makeRegisterMap()       // 레지스터 초기화 
    console.log( '------------------ RUN ------------------' );
    console.log( '------------------ RUN ------------------' );

    mbus_3288_slave.setRegisterUInt16( 201, 0 )      // 양액기노드 상태정보 
    mbus_3288_slave.setRegisterUInt16( 202, 100 )    // OPID 
    mbus_3288_slave.setRegisterUInt16( 203, 1 )      // 양액기노드 제어권상태정보
    console.log( '------- 양액기 노드 상태 정보 완료 (안건드렸음) -------' );

    mbus_3288_slave.setRegisterUInt16(501, 0)          //
    mbus_3288_slave.setRegisterUInt16(502, 100)        //
    mbus_3288_slave.setRegisterUInt16(503, 1)          //
    console.log( '------- write 양액기노드 제어정보 -------' )

    mbus_3288_slave.setRegisterUInt16(401, 0)          //
    mbus_3288_slave.setRegisterUInt16(402, 0)          //
    mbus_3288_slave.setRegisterUInt16(403, 0)          //
    mbus_3288_slave.setRegisterUInt16(404, 0)          //
    mbus_3288_slave.setRegisterUInt32(405, 0)          //       // UInt32
    console.log( '------- write 양액기노드 제어정보 -------' )


    // ├───────────────────────────────────────────────┐ 
    // ├──── 컴퍼니 / 제품 / 정보 업데이트 
    // ├───────────────────────────────────────────────┘
    let json = {
        topic: 'organization',
        no : 1,
        value : {
            r001    : KSX.Appendix_3288.A_1_1.ORGANIZATION_CODE,
            r002    : KSX.Appendix_3288.A_1_1.COMPANY_CODE,
            r003    : KSX.Appendix_3288.A_1_1.PRODUCT_TYPE,
            r004    : KSX.Appendix_3288.A_1_1.PRODUCT_CODE,
            r005    : KSX.Appendix_3288.A_1_1.PROTOCOL_VER,
            r006    : KSX.Appendix_3288.A_1_1.CHANNEL_COUNT,
            r007    : KSX.Appendix_3288.A_1_1.SERIAL_NO,
        }
    }
    await mbus_3288_slave.writeReg_companyInfo(json)
    console.log( '------- 컴퍼니 정보 업데이트 -------' )


    // ├───────────────────────────────────────────────┐ 
    // ├──── 디바이스 부착 센서 업데이트
    // ├───────────────────────────────────────────────┘
    json = {
        topic       : 'devices',
        no          : 1,
        value       : {   // [ec1, ec2, ec3, ph1, ph2, ph3, solar1, flow0, flow1, flow2 ..... flow12]
            ec      : [12,0,0],          // ec 1개 1번에 부착, EC코드는 12
            ph      : [16,0,0],          // ph 1개 1번에 부착  PH코드는 16
            solar   : [7],            // 일사는 1개 부착 
            flow    : [5,5,5,5,5,5,5,5,5,5,5,5,5], // 13개(전체유량 포함)
            irr     : 204           // 201/202/203/204    레벨3 양액기
        }
    }
    await mbus_3288_slave.writeReg_attachDevice(json);
    console.log( holdingRegisters[101] )
    console.log( '------- 디바이스 부착정보 입데이트 -------' );


}, 100 );












/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 

1번장비에 16번 멀티바이트 Write기능으로 
501, 502, 503 주소에 
2,   103,  2  를 날릴경우 <<< 아래처럼 된다.

TX : 01 10 01 F5 00 03 06 00 02 00 67 00 02 BE 71
RX : 01 10 01 F5 00 03 91 C6


*/


// ✅✍ 🂩 🅰🅿 🥺ྀི ♓
// ✉💚⌛⏩⏰ ⏩ 👉 𒅄 𒆕

// ├───────────────────────────────────────────────┐ 
// ├────   Register WRITE 제어관련 내용            │
// ├───────────────────────────────────────────────┘
mbus_3288_slave.on( "command_form_master", (json) => {
    // console.log( 'get read_from_node', json )
    try {

        console.log( 'get command :', json.msg )
        if( holdingRegisters[203] === 2 ) {
            console.log( json.msg, json.msg, json.msg, json.msg, json.msg )

            let curjson = {
                topic: 'working',
                no : 1,
                value : {   // [ec1, ec2, ec3, ph1, ph2, ph3, solar1, flow0, flow1, flow2 ..... flow12]
                    r401 : KSX.Appendix_3288.B_3.PREPARING,
                    r402 : 5,
                    r403 : KSX.Appendix_3288.B_7.NORMAL,
                    r404 : holdingRegisters[202],
                    r405 : 350
                }
            }

            switch (json.msg) {
                case 0:             // 정지
                    console.log( '𒆕𒆕𒆕 양액 정지' )
                    curjson.value.r401 = KSX.Appendix_3288.B_3.READY 
                    curjson.value.r402 = 0
                    curjson.value.r403 = KSX.Appendix_3288.B_7.NORMAL
                    curjson.value.r404 = holdingRegisters[202]
                    curjson.value.r405 = 0        // 남은시간 
                    mbus_3288_slave.writeReg_working(curjson);             // 양액기 운전상태 업데이트 

                    System_Stop_From_3288( { msg:'stop', data:json.data } );
                    break;
            
                case 401:           // 1회관수 
                    console.log( '𒆕𒆕𒆕 1회관수 시작' )
                    curjson.value.r401 = KSX.Appendix_3288.B_3.PREPARING
                    curjson.value.r402 = 1
                    curjson.value.r403 = KSX.Appendix_3288.B_7.NORMAL
                    curjson.value.r404 = holdingRegisters[202]
                    curjson.value.r405 = 200        // 남은시간 
                    mbus_3288_slave.writeReg_working(curjson);             // 양액기 운전상태 업데이트 

                    System_Stop_From_3288( { msg:'once', data:json.data } );
                    break;

                case 402:           // 구역관수(원수공급)
                    // 01 10 01 F8 00 05 0A 01 92 00 64 00 01 00 02 00 03 24 A4
                    console.log( '𒆕𒆕𒆕 구역 관수' )
                    curjson.value.r401 = KSX.Appendix_3288.B_3.PREPARING
                    curjson.value.r402 = 1
                    curjson.value.r403 = KSX.Appendix_3288.B_7.NORMAL
                    curjson.value.r404 = holdingRegisters[202]
                    curjson.value.r405 = 200        // 남은시간 
                    mbus_3288_slave.writeReg_working(curjson);             // 양액기 운전상태 업데이트 

                    System_Stop_From_3288( { msg:'section', data:json.data } );
                    break;

                case 403:           // 파라메타 관수
                    console.log( '𒆕𒆕𒆕 파라메타 관수' )
                    curjson.value.r401 = KSX.Appendix_3288.B_3.PREPARING
                    curjson.value.r402 = 1
                    curjson.value.r403 = KSX.Appendix_3288.B_7.NORMAL
                    curjson.value.r404 = holdingRegisters[202]
                    curjson.value.r405 = 200        // 남은시간 
                    mbus_3288_slave.writeReg_working(curjson);             // 양액기 운전상태 업데이트 

                    System_Stop_From_3288( { msg:'param', data:json.data } );
                    break;
    
                default:
                    break;
            }

        }


    } 
    catch (error) {
        console.log( colors.magenta( error ) );
    }
});



// ├──── 주석을 제거후 사용
// ├───────────────────────────────────────────────┐ 
// ├──── Mobbus Log 이벤트                         
// ├───────────────────────────────────────────────┘
mbus_3288_slave.on( "TxRx", (json) => {
    try {
        console.log( colors.green(json.msg), ':', json.data  )
        // let bufArr = [...json.data];
        // console.log( colors.inverse(json.msg, bufArr.join(' ')) );
    } 
    catch (error) {
        console.log( colors.magenta( error ) )        
    }
});
// ├──── 주석을 제거후 사용
// ├───────────────────────────────────────────────┐ 
// ├──── Mobbus Log 이벤트                         
// ├───────────────────────────────────────────────┘
mbus_3288_slave.on( "mylog", (json) => {
    // console.log( 'get log : ', json )
});


mbus_3288_slave.on( "myerror", (json) => {
    console.log( 'error'.bgMagenta, colors.magenta( json ) )
});
console.log(`We have ${mbus_3288_slave.listenerCount("read_from_node")} listener(s) for the error event`);













/**
 * 
 * 센서값 업데이트 
 * 
 */
let myCnt = 0;
 setInterval(() => {
    // return;
    // let rand_0_99 = (Math.floor(Math.random() * 1000))/10 ;
    // vector.setRegister3288_Float32(204, rand_0_99, 0)

    // flow update
    // // 1 ~ 12 사이 정수 (임의의 구역선택)
    // console.log( Math.floor(Math.random()*(12)) + 1 );
    // ( Math.random () * (최대값 - 최소값) ) + 최소값



    // ├───────────────────────────────────────────────┐ 
    // ├────   유량 업데이트                           │ 
    // ├───────────────────────────────────────────────┘
    let flow_idx = Math.floor(Math.random()*(12)) + 1 
    let json = {
        topic   : 'flow',
        no      : flow_idx,       // 2번구역 업데이트 / 전체유량은 자동업데이트
        value   : 10                                        // 5리터 혹은 10리터 
    }
    myDevice.sensor_val.flow[flow_idx-1]     += 10;
    mbus_3288_slave.writeReg_flow( json );

    // console.log( 
    //     Math.floor((Math.random() * 5)*100) / 100,  // EC 0 ~ 5
    //     Math.floor((Math.random() * 14)*100) / 100, // PH 0 ~ 14
    //     Math.floor(( Math.random() * (30-20) + 20 )*10) / 10
    // )




    // ├───────────────────────────────────────────────┐ 
    // ├────   EC / PH  업데이트                       │ 
    // ├───────────────────────────────────────────────┘
    let ecph_idx        = Math.floor( Math.random () * (3) ) + 1;
    let ecph_idx_ec     = Math.floor((Math.random() * 5)*100) / 100;  // EC 0 ~ 5
    let ecph_idx_ph     = Math.floor((Math.random() * 14)*100) / 100; // PH 0 ~ 14
    let ecph_idx_temp   = Math.floor(( Math.random() * (30-20) + 20 )*10) / 10;
    json = {
        topic   : 'ecph',
        no      : ecph_idx,    // 최대 3개의 ec,ph 중 몇번째인지 체크
        value   : [
                ecph_idx_ec,
                ecph_idx_ph,
                ecph_idx_temp
            ]                    // ec, ph, water temp
    }

    myDevice.sensor_val.ec[ecph_idx-1]     = ecph_idx_ec;
    myDevice.sensor_val.ph[ecph_idx-1]     = ecph_idx_ph;
    myDevice.sensor_val.temp[ecph_idx-1]   = ecph_idx_temp;
    mbus_3288_slave.writeReg_ecph(json);



    // ├───────────────────────────────────────────────┐ 
    // ├────   일사센서 업데이트                       │ 
    // ├───────────────────────────────────────────────┘
    let solar_val   = Math.floor(( Math.random() * (100-1) + 1 )*10) / 10;
    json = {
        topic   : 'solar',
        no      : 1,                     // 일사센서 업데이트 1번고정
        value   : [
                solar_val, 
                1200.6
            ]      // 순간일사, 누적일사
    }
    myDevice.sensor_val.solar[0]   = solar_val;
    mbus_3288_slave.writeReg_solar(json);

    // console.log( ecph_idx )



    // // ├───────────────────────────────────────────────┐ 
    // // ├────   양액기 업데이트                         │ 
    // // ├───────────────────────────────────────────────┘
    // json = {
    //     topic: 'working',
    //     no : 1,
    //     value : {   // [ec1, ec2, ec3, ph1, ph2, ph3, solar1, flow0, flow1, flow2 ..... flow12]
    //         r401 : KSX.Appendix_3288.B_7.NORMAL,
    //         r402 : flow_idx,
    //         r403 : KSX.Appendix_3288.B_3.PREPARING ,
    //         r404 : holdingRegisters[202],
    //         r405 : myCnt
    //     }
    // }
    // mbus_3288_slave.writeReg_working(json);             // 양액기 운전상태 업데이트 



    myCnt++;
}, 1 * 1000);




setInterval(() => {
    // console.log( '201 : ', holdingRegisters[201], holdingRegisters[202], holdingRegisters[203] )
    // console.log( '501 : ', holdingRegisters[501], holdingRegisters[502], holdingRegisters[503] )
    console.log( '202 vs 502 : ', holdingRegisters[202], holdingRegisters[502] )
    // console.log( `제어권 : ${myDevice.nutri_status[203]}, OPID : ${myDevice.OPID}`, 
    // holdingRegisters[202], 
    // holdingRegisters[502], 
    // );
}, 1000 );




setTimeout(() => {
    // 1회관수 테스트 
}, 5000 );







function System_Stop_From_3288( _json ) {

    
    switch (_json.msg) {
        case 'stop':
            
            break;

        case 'once':
            
            break;
        case 'section':
        
            break;
        case 'param':
            
            break;
    
        default:
            break;
    
        }




    
        console.log( colors.cyan('get Running Message ', _json) );


}







