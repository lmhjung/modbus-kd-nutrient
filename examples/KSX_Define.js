

// 101	온도1	uint16	1
// 102	온도2	uint16	1
// 103	온도3	uint16	1
// 104	습도1	uint16	2
// 105	이슬점 센서	uint16	3
// 106	감우 센서	uint16	4
// 107	유량 센서	uint16	5
// 108	강우 센서	uint16	6
// 109	일사 센서	uint16	7
// 110	풍속 센서	uint16	8
// 111	풍향 센서	uint16	9
// 112	전압 센서	uint16	10
// 113	CO2센서	uint16	11
// 114	EC센서	uint16	12
// 115	광양자 센서	uint16	13
// 116	토양함수율 센서	uint16	14
// 117	토양수분장력 센서	uint16	15
// 118	pH	uint16	16
// 119	지온	uint16	17
// 120	온도4	uint16	1




// // ============================================================================= 
// // ==========        CLASS exprt
// // ============================================================================= 
// class Calculator {
//     add(a, b) {
//         return a + b
//     }
//     substract(a, b) {
//         return a - b
//     }
// }
// module.exports = Calculator;

// module.exports.FirebaseInterval     = 5;            // 5초간격으로 데이타를 올린다. 

// // ============================================================================= 
// // ==========        농가(시스템) 정보 
// // ============================================================================= 
// let _HOUSE_NUM              = 1;
// let _BENCH_NUM              = 1;
// let _SITE_NAME              = 'KJH'
// module.exports.HOUSE_NUM    = _HOUSE_NUM;
// module.exports.BENCH_NUM    = _BENCH_NUM;
// module.exports.SITE_NAME    = _SITE_NAME;

// let _CONTROLLER_NAME                = 'IRRIGATION';
// module.exports.CONTROLLER_NAME      = _CONTROLLER_NAME;


module.exports.Appendix_3267 = {
    // A_1_2 : {
    //     temperature     : [
    //         {
    //             address     : 101,
    //             type        : UInt16,
    //             dev_code    : 1
    //         },
    //         {
    //             address     : 102,
    //             type        : Uint16,
    //             dev_code    : 1
    //         },
    //         {
    //             address     : 103,
    //             type        : Uint16,
    //             dev_code    : 1
    //         }
    //     ],
    //     humidity            : [
    //         {
    //             address     : 101,
    //             type        : UInt16,
    //             dev_code    : 1
    //         }
    //     ],
    //     ec                  : [
    //         {
    //             address     : 101,
    //             type        : UInt16,
    //             dev_code    : 1
    //         },
    //         {
    //             address     : 102,
    //             type        : Uint16,
    //             dev_code    : 1
    //         },
    //         {
    //             address     : 103,
    //             type        : Uint16,
    //             dev_code    : 1
    //         }
    //     ],



    // },

}




module.exports.Appendix_3288 = {

    A_1_1 : {
        ORGANIZATION_CODE   : 0,        // 기관코드a	uint16	0
        COMPANY_CODE        : 0,        // 회사코드a	uint16	0
        PRODUCT_TYPE        : 3,        // 제품타입	uint16	3(복합노드)
        PRODUCT_CODE        : 4,        // 제품코드	uint16	1 / 2 / 3 / 4
        PROTOCOL_VER        : 20,       // 프로토콜버전	uint16	20
        CHANNEL_COUNT       : 21,       // 채널수c	uint16	21
        SERIAL_NO           : 0         // 시리얼번호	uint32	0
    },


    A_1_2 : {                           // 제품의 상황에 따라 작성
        ec                  : [
            { address     : 101,  type        : Uint16Array,   dev_code    : 12 },
            { address     : 102,  type        : Uint16Array,   dev_code    : 12 },
            { address     : 103,  type        : Uint16Array,   dev_code    : 12 },
        ],
        ph                  : [
            { address     : 104,  type        : Uint16Array,   dev_code    : 16 },
            { address     : 105,  type        : Uint16Array,   dev_code    : 16 },
            { address     : 106,  type        : Uint16Array,   dev_code    : 16 },
        ],

        // ├───────────────────────────────
        solar               : [
            { address     : 107,  type        : Uint16Array,   dev_code    : 7 },
        ],
        flow                : [
            { address     : 108,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 109,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 110,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 111,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 112,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 113,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 114,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 115,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 116,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 117,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 118,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 119,  type        : Uint16Array,   dev_code    : 5 },
            { address     : 120,  type        : Uint16Array,   dev_code    : 5 },
        ],
        nutrient            : [
            { address     : 121,  type        : Uint16Array,   dev_code    : 204 },
        ],

    },


    // ├───────────────────────────────━ B.1
    B_1 : {
        node                        : 3,            // 복합노드 3
    },
   

    // ├──────────────────────────────── B.2
    B_2 : {
        level0 : 1,
        level1 : 2,
        level2 : 3,
        level3 : 4,
    },

    // ┌───────────────────────────────────────────────┐ 
    // │    상태 (Status) 코드                         │ B.3
    // └───────────────────────────────────────────────┘
    B_3 : {
        READY                       : 0,            // 정상, 준비중, 정지
        ERROR                       : 1,            // 오류 
        BUSY                        : 2,            // 처리 불능
        VOLTAGE_ERROR               : 3,            // 동장 전압 이상 
        CURRENT_ERROR               : 4,            // 동작 전류 이상 
        TEMPERATURE_ERROR           : 5,            // 동장 온도 이상 
        FUSE_ERROR                  : 6,            // 휴즈 이상 
        RESERVED                    : 7,            // 공통 예약 
        // ------------------------
        NEED_REPLACE                : 101,          // 센서 및 소모품 교체 요망
        NEED_CALIBRATION            : 102,          // 센서 교정 요망
        NEED_CHECK                  : 103,          // 센서 점검 필요
        // ------------------------
        PREPARING                   : 401,          // 준비중
        SUPPLYING                   : 402,          // 제공중 
        STOPPING                    : 403,          // 정지중 
        // ------------------------
        VENDOR_SPECIFIC_ERROR       : 900           // 900-999	    제조사 정의 에러 코드     
    },

    // ┌───────────────────────────────────────────────┐ 
    // │    제어권 상태 및 설정코드                    │ B.4
    // └───────────────────────────────────────────────┘
    B_4 : { 
        LOCAL                       : 1,            // 로컬 제어 (제어권이 노드에 있는 경우)
        REMOTE                      : 2,            // 원격 제어 (제어권이 노드에 있지 않는 경우)
        MANUAL                      : 3,            // 수동 제어
    },

    
    // ┌───────────────────────────────────────────────┐ 
    // │    제어명령 ( operation ) 코드                │ B.5
    // └───────────────────────────────────────────────┘
    B_5 : {
        CONTROL                     : 2,   
        ON                          : 401,          // 작동 시작 (1회 관수)
        OFF                         : 0,            // 작동 멈춤
        AREA_ON                     : 402,          // 원수 관수 ???? 
        PARAM_ON                    : 403           // 양액 관수 
    },



    // ┌───────────────────────────────────────────────┐ 
    // │    양액기 ( nutrient-supply) 코드             │ B.6
    // └───────────────────────────────────────────────┘
    B_6 : { 
        level0                      : 201,          // 레벨 0 양애기
        level1                      : 202,          // 레벨 1 양애기
        level2                      : 203,          // 레벨 2 양애기
        level3                      : 204,          // 레벨 3 양애기
    },

    
    // ┌───────────────────────────────────────────────┐ 
    // │    경보정보 ( alert information ) 코드        │ B.7
    // └───────────────────────────────────────────────┘
    B_7 : { 
        NORMAL                      : 0,            // 정상
        HIGH_CONCENTRATION_EC       : 1,            // 고농도 EC
        LOW_CONCENTRATION_EC        : 2,            // 저농도 EC
        HIGH_CONCENTRATION_pH       : 3,            // 고농도 pH
        LOW_CONCENTRATION_pH        : 4,            // 저농도 pH
        LOW_FLOW_ALARM              : 5,            // 저유량 경보
        HIGH_TEMPERATURE_ALARM      : 6,            // 고온 경보
        LOW_TEMPERATURE_ALARM       : 7,            // 저온경보
        ABNORMAL                    : 8,            // 앞에 나열된 경우를 제외한 장비 이상 작동 시의 경보
        LOW_LEVEL_ALARM             : 9,            // 저수위 경보
        OVER_LOAD_ALARM             : 10,           // 과부하 경보
    },


}





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
        //                  SUPPLYING	            402	        제공 중
        //                  STOPPING	            403	        정지 중
        // ------------------------------------------------------------------------                
        // 기타             VENDOR_SPECIFIC_ERROR	900-999	    제조사 정의 에러 코드
            

        // ------------------------------------------------------------------------
        // ------- B.4 	
        // ------------------------------------------------------------------------                
        // 제어권 (control) 상태 및 설정 코드
        // 대상	제어권 정보	코드 값	의미
        // 노드	            LOCAL	        1	로컬 제어 (제어권이 노드에 있는 경우)
        // 	                REMOTE	        2	원격 제어 (제어권이 노드에 있지 않는 경우)
        // 	                MANUAL	        3	수동 제어


        // ------------------------------------------------------------------------
        // ------- B.5 	제어명령 (operation) 코드
        // ------------------------------------------------------------------------
        // 대상	제어 명령	코드 값	의미
        // 노드	            CONTROL	        2	        제어권(로컬/원격/수동 등의 제어권 설정을 위한 명령)
        // ------------------------------------------------------------------------
        // 양액기	        ON	            401	        작동 시작   (양액기에 기 설정된 EC, pH 값이 반영된 대로 1회 관수 작동 시작을 요청하는 명령)
        // 	                OFF	            0	        작동 멈춤   (양액기를 강제로 정지시키고자 하는 명령)
        // 	                AREA_ON	        402	        구역관수    (양액기에 지정된 시간과 구역으로 관수를 요청하는 명령)
        // 	                PARAM_ON	    403	        파라미터 관수 (양액기에 파라미터로 전달되는 EC, pH 값이 반영되어 지정된 시간과 지정된 구역으로 관수를 요청하는 명령)


        // ------------------------------------------------------------------------
        // ------- B.6 	양액기 (nutrient-supply) 코드 
        // ------------------------------------------------------------------------
        // 대상	레벨	코드 값	의미
        // 양액기	    nutrient-supply/level0  201	레벨 0 양액기
        //              nutrient-supply/level1  202	레벨 1 양액기
        //              nutrient-supply/level2  203	레벨 2 양액기
        //              nutrient-supply/level3  204	레벨 3 양액기



        // // 504	제어 명령	uint16
        // // 505	명령 ID (opid)	uint16
        // // 506	관수 시작 구역	uint16
        // // 507	관수 종료 구역	uint16
        // // 508	관수 시간(초)	uint32
        // // 509		
        // // 510	EC 설정값	float
        // // 511		
        // // 512	pH 설정값	float


// alloc()	            Creates a Buffer object of the specified length
// allocUnsafe()	    Creates a non-zero-filled Buffer of the specified length
// allocUnsafeSlow	    Creates a non-zero-filled and non-pooled Buffer of the specified length
// byteLength()	        Returns the numbers of bytes in a specified object
// compare()	        Compares two Buffer objects
// concat()	            Concatenates an array of Buffer objects into one Buffer object
// copy()	            Copies the specified number of bytes of a Buffer object
// entries()	        Returns an iterator of "index" "byte" pairs of a Buffer object
// equals()	            Compares two Buffer objects, and returns true if it is a match, otherwise false
// fill()	            Fills a Buffer object with the specified values
// from()	            Creates a Buffer object from an object (string/array/buffer)
// includes()	        Checks if the Buffer object contains the specified value. Returns true if there is a match, otherwise false
// indexOf()	        Checks if the Buffer object contains the specified value. Returns the first occurrence, otherwise -1
// isBuffer()	        Checks if an object is a Buffer object
// isEncoding()	        Checks if the Buffer object supports the specified encoding
// keys()	            Returns an array of keys in a Buffer object
// lastIndexOf()	    Checks if the Buffer object contains the specified value. Returns the first occurrence, starting from the end, otherwise -1
// length	            Returns the length of a Buffer object, in bytes
// poolSize	Sets or returns the number of bytes used for pooling
// readDoubleBE()	    Reads a 64 bit double from a Buffer object, returns the result in big endian
// readDoubleLE()	    Reads a 64 bit double from a Buffer object, returns the result in little endian
// readFloatBE()	    Reads a 32 bit float from a Buffer object, returns the result in big endian
// readFloatLE()	    Reads a 32 bit float from a Buffer object, returns the result in little endian
// readInt8()	        Reads a 8 bit integer from a Buffer object
// readInt16BE()	    Reads a 16 bit integer from a Buffer object, returns the result in big endian
// readInt16LE()	    Reads a 16 bit integer from a Buffer object, returns the result in little endian
// readInt32BE()	    Reads a 32 bit integer from a Buffer object, returns the result in big endian
// readInt32LE()	    Reads a 32 bit integer from a Buffer object, returns the result in little endian
// readIntBE()	        Reads the specified number of bytes from a Buffer object, returns the result in big endian
// readIntLE()	        Reads the specified number of bytes from a Buffer object, returns the result in little endian
// readUInt8()	        Reads an unsigned 8 bit integer from a Buffer object
// readUInt16BE()	    Reads an unsigned 16 bit integer from a Buffer object, returns the result in big endian
// readUInt16LE()	    Reads an unsigned 16 bit integer from a Buffer object, returns the result in little endian
// readUInt32BE()	    Reads an unsigned 32 bit integer from a Buffer object, returns the result in big endian
// readUInt32LE()	    Reads an unsigned 32 bit integer from a Buffer object, returns the result in little endian
// readUintBE()	        Reads the specified number of bytes from a Buffer object, returns the result as an unsigned integer
// readUIntLE()	        Reads the specified number of bytes from a Buffer object, returns the result as an unsigned integer
// slice()	            Slices a Buffer object into a new Buffer objects starting and ending at the specified positions
// swap16()	            Swaps the byte-order of a 16 bit Buffer object
// swap32()	            Swaps the byte-order of a 32 bit Buffer object
// swap64()	            Swaps the byte-order of a 64 bit Buffer object
// toString()	        Returns a string version of a Buffer object
// toJSON()	            Returns a JSON version of a Buffer object
// values()	            Returns an array of values in a Buffer object
// write()	            Writes a specified string to a Buffer object
// writeDoubleBE()	    Writes the specified bytes, using big endian, to a Buffer object. The bytes should be 64 bit double.
// writeDoubleLE()	    Writes the specified bytes, using little endian, to a Buffer object. The bytes should be 64 bit double.
// writeFloatBE()	    Writes the specified bytes, using big endian, to a Buffer object. The bytes should be 32 bit float.
// writeFloatLE()	    Writes the specified bytes, using little endian, to a Buffer object. The bytes should be 32 bit float.
// writeInt8()	        Writes the specified bytes to a Buffer object. The bytes should be 8 bit integer
// writeInt16BE()	    Writes the specified bytes, using big endian, to a Buffer object. The bytes should be 16 bit integer.
// writeInt16LE()	    Writes the specified bytes, using little endian, to a Buffer object. The bytes should be 16 bit integer.
// writeInt32BE()	    Writes the specified bytes, using big endian, to a Buffer object. The bytes should be 32 bit integer.
// writeInt32LE()	    Writes the specified bytes, using little endian, to a Buffer object. The bytes should be 32 bit integer.
// writeIntBE()	        Writes the specified bytes, using big endian, to a Buffer object.
// writeIntLE()	        Writes the specified bytes, using little endian, to a Buffer object.
// writeUInt8()	        Writes the specified bytes to a Buffer object. The bytes should be 8 bit unsigned integer
// writeUInt16BE()	    Writes the specified bytes, using big endian, to a Buffer object. The bytes should be 16 bit unsigned integer.
// writeUInt16LE()	    Writes the specified bytes, using little endian, to a Buffer object. The bytes should be 16 bit unsigned integer.
// writeUInt32BE()	    Writes the specified bytes, using big endian, to a Buffer object. The bytes should be 32 bit unsigned integer.
// writeUInt32LE()	    Writes the specified bytes, using little endian, to a Buffer object. The bytes should be 32 bit unsigned integer.
// writeUIntBE()	    Writes the specified bytes, using big endian, to a Buffer object
// writeUIntLE()	    Writes the specified bytes, using little endian, to a Buffer object




