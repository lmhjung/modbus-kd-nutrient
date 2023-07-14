# modbus-kd-nutrient (now ongoing...)
## modbus KS X 3288
- 기능적으로 아직 완전하지 않은 상태입니다.(검토 및 보완중에 있습니다)
- 본 저장소에 올려진 내용의 범위는 자체 양액기 시스템에 상위단으로 부터 3288 형식의 명령어로 데이타를 받아서 양액기 시스템을 구동하는 샘플 부분입니다. 
- 온전한 양액기 GUI 및 양액기 구동 프로그램은 올려놓지는 않았습니다. 
- 


## <span style="color:black; background-color:#D8DF68">1. 폴더구조 및 사용법  </span>
```javascript
"modbus-kd-nutrient"
   ├─── index.js                       // 양액기 <> 3288 
   ├─── irrigation-master.js           // 모드버스 슬레이브 양액기
   ├─── src                            // 
   │     ├─── KSX_Define.js            // 표준문서의 도표를 JSON 오브젝트로 정리중 
   │     ├─── mbus_3288.alarm.js       // 사용안함 (to be...)
   │     ├─── mbus_3288.database.js    // 사용안함 (to be...)
   │     ├─── mbus_3288.main.js        // Wrapper module for "modbus-serial"
   │     ├─── mbus_3288.slave.js       // Modbus Event Module for 3288
   │


irrigation-master.js 
- 위 파일이 양액기를 돌리는 프로세서이다. 
```

> ### 설치방법
> - 1. git clone https://github.com/lmhjung/modbus-kd-nutrient.git
> - 2. cd modbus-kd-nutrient
> - 3. npm install
> ```javascript
> // "irrigation-master.js" 를 열고 아래의 포트, 속도등을 변경해 준다. 
> // 변경후 저장한다. 
> const mbus_3288_slave       = new Mbus_3288_Slave( 'COM6', 115200, 1, 3 );
> ```
> - 4. npm start 
> - 5. 상위단 (ex, 온실통합제어기 혹은 통합테스트 프로그램등)에서 제어시작 
> 



## <span style="color:black; background-color:#D8DF68">2. 양액기 읽기  </span>
>``` javascript
>- 사용자정의
>
>- 1~8 (기관코드, 회사코드, 제품타입, 제품코드, 프로토콜버전, 채널수,시리얼번호)
> // (온실통합제어기)  01 03 00 01 00 08 15 CC
> // (양액기)          01 03 10 00 00 00 00 00 03 00 04 00 14 00 15 00 00 00 00 80 1F
>
>- 101~121 (노드부착디바이스)
> // (온실통합제어기)   01 03 00 01 00 08 15 CC
> // (양액기)           01 03 2A 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 CC 2E 8D
>
>- 201~203 (양액기노드상태)
> // (온실통합제어기)   01 03 00 C9 00 03 D5 F5
> // (양액기)           01 03 06 00 00 00 64 00 01 A1 6A
>
>- 204~263(센서상태)
> // (온실통합제어기)   01 03 00 CC 00 3C 85 E4
> // (양액기)           01 03 78 1E B8 3F A5 00 00 C2 8F 3F D5 00 00 14 7B 3E 2E 00 00 A3 D7 40 F8 00 00 14 7B 40 6E 00 00 47 AE 41 49 00 00 00 00 42 B5 00 00 32 00 47 6B 00 00 90 00 45 92 00 00 60 00 45 9A 00 00 50 00 45 AF 00 00 90 00 45 A1 00 00 50 00 45 A0 00 00 00 00 45 9B 00 00 60 00 45 9F 00 00 C0 00 45 9E 00 00 E0 00 45 9C 00 00 40 00 45 9C 00 00 A0 00 45 8C 00 00 90 00 45 9C 00 00 82 BC
>
>- 401~406(양액기상태)
> // (온실통합제어기)   01 03 01 91 00 06 95 D9
> // (양액기)           01 03 0C 00 00 00 00 00 00 00 00 00 00 00 00 93 70
>
>- 501~513(양액기노드제어)
> // (온실통합제어기)   01 03 01 F5 00 0D 95 C1
> // (양액기)           01 03 1A 00 00 00 64 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 5F CA
>
>
>
>
>
>```




## <span style="color:black; background-color:#D8DF68">2. 양액기 읽기  </span>
```javascript
Read Modbus (양액기)
- 사용자정의
- 1~8 (기관코드, 회사코드, 제품타입, 제품코드, 프로토콜버전, 채널수,시리얼번호)
- 101~121 (노드부착디바이스)
- 201~203 (양액기노드상태)
- 204~263(센서상태)
- 401~406(양액기상태)
- 501~513(양액기노드제어)

```




## [Cloned repository](https://github.com/aditya0929/reactBoard)

This project is an admin dashboard built using JavaScript and React.js. It provides a comprehensive user interface for managing and monitoring various aspects of an application or system. The dashboard offers a range of features, including data visualization, user management, and system configuration.
 

test


additonally, take a look at the package.json for all the dependencies that i had during the project.

## Features

- **Data Visualization:** The dashboard includes interactive charts, graphs, and tables to help visualize and analyze data.
- **User Management:** Administrators can manage user accounts, including creating new users, updating profiles, and assigning roles and permissions.
- **Real-Time Monitoring:** Users can view real-time statistics and metrics to monitor the performance and health of the system.
- **Responsive Design:** The user interface is designed to be responsive and accessible across various devices and screen sizes.

## Installation

To run the admin dashboard locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/aditya0929/reactBoard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd admin-dashboard
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your web browser and visit `http://localhost:3000` to access the admin dashboard.


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request to the GitHub repository.

## Acknowledgements

- The dashboard UI design and components were inspired by various open-source projects and design libraries.
## Contact

If you have any questions, suggestions, or feedback, please feel free to me at adityajha8906@gmail.com.


<br>
<br>
<br>
<br>


## [DEC to HEX링크](https://www.rapidtables.com/convert/number/decimal-to-hex.html?x=372) / [Float To HEX링크](https://gregstoll.com/~gregstoll/floattohex/) / [CRC 링크](https://www.lddgo.net/en/encrypt/crc)  

https://www.rapidtables.com/convert/number/decimal-to-hex.html?x=372 DEC to HEX Link  
https://gregstoll.com/~gregstoll/floattohex/  Float to HEX Link  
https://www.lddgo.net/en/encrypt/crc  CRC Link  
<hr>

# KS X 3288
> 디폴트 레지스트리 맵 구조
1. 노드정보
   > 1 ~ 8
2. 디바이스 코드 목록
   > 101 ~ 121
3. 노드 및 센서 상태정보
   > 201 ~ 263
 
5. 양액기 상태정보
   > 401 ~ 404

6. 노드 및 양액기 제어명령
   > 501 ~ 513





# <span style="color:black; background-color:yellow">레지스트 업데이트 항목 MCU</span>
> |<span style="color:orange">대상</span>|<span style="color:orange"> 번호 </span>|<span style="color:orange"> Length </span>|<span style="color:orange">Value</span> | <span style="color:orange">HEX</span> | <span style="color:orange">내용</span> | <span style="color:orange">설명</span> |
> |:---:|---:|:---:|:---|:---|:---|:---|
> | **양액기노드정보** | 001       | 2 | 0 | 0x0000  | 기관 코드  | 디폴트맵은 0 |
> |         | 002       | 2 | 0 | 0x0000  |회사 코드  | 디폴트맵은 0 |
> |         | 003       | 2 | 3 | 0x0003  |제품 타입 | 양액기는 복합노드 |
> |         | 004       | 2 | 4 | 0x0004  |제품 코드 | 레벨 0, 1, 2, 3 KD제품은 레벨3 코드값 4 |
> |                 |           | 2 | 1 | 0x0001   | 레벨 0 양액기 | | 
> |                 |           | 2 | 2 | 0x0002   | 레벨 1 양액기 | | 
> |                 |           | 2 | 3 | 0x0003   | 레벨 2 양액기 | | 
> |                 |           | 2 | 4 | 0x0004   | 레벨 3 양액기 | | 
> |         | 005       | 2 | 20 | 0x0014  |프로토콜버전 | 여기표준은 20으로 고정 |
> |         | 006       | 2 | 21 | 0x0015  |부탁된 디바이스 수 | |
> |         | 007-008   | 4 | 0 | 0x00000000  |양애긱노드의 시리얼 번호 | |
> |  |
> | **노드부착 디바이스정보**  | 101       | 2 | 12 | 0x000C  | EC 센서 1  | 센서가 있으므로 값은 12 |
> |         | 102       | 2 | 0 | 0x0000  | EC 센서 2  | 센서가 없으면 값은 0 |
> |         | 103       | 2 | 0 | 0x0000  | EC 센서 3  | 센서가 없으면 값은 0 |
> |         | 104       | 2 | 16 | 0x0010  | PH 센서 1  | 센서가 있으므로 값은 16 |
> |         | 105       | 2 | 0 | 0x0000  | PH 센서 2  | 센서가 없으므로 값은 0 |
> |         | 106       | 2 | 0 | 0x0000  | PH 센서 3  | 센서가 없으므로 값은 0 |
> |         | 107       | 2 | 7 | 0x0007  | PH 센서 3  | 센서가 있으므로 값은 7 | 일사센서는 7
> |         | 108       | 2 | 5 | 0x0005  | 전체 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 109       | 2 | 5 | 0x0005  | 01구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 110       | 2 | 5 | 0x0005  | 02구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 111       | 2 | 5 | 0x0005  | 03구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 112       | 2 | 5 | 0x0005  | 04구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 113       | 2 | 5 | 0x0005  | 05구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 114       | 2 | 5 | 0x0005  | 06구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 115       | 2 | 5 | 0x0005  | 07구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 116       | 2 | 5 | 0x0005  | 08구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 117       | 2 | 5 | 0x0005  | 09구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 118       | 2 | 5 | 0x0005  | 10구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 119       | 2 | 5 | 0x0005  | 11구역 누적유량 센서  | 센서가 있으므로 값은 5 |
> |         | 120       | 2 | 5 | 0x0005  | 12구역 누적유량 센서  | 센서가 있으므로 값은 5 | << 총 12구역 >>
> |         | 121       | 2 | **204** | 0x00CC  | 양액기  | 3레벨 양액기 | 
> |  |
> | **양액기노드 상태 정보** |
> |<span style="color:orange">대상</span>|<span style="color:orange"> 번호 </span>|<span style="color:orange"> Length </span>|<span style="color:orange">Value</span> | <span style="color:orange">HEX</span> | <span style="color:orange">내용</span> | <span style="color:orange">설명</span> |
> |         | 201       | 2 | X  | 0x0000  | 노드 상태  | 아래에서 선택 |
> |         |           |   | 0  | 0x0000  | READY |  |
> |         |           |   | 1  | 0x0001  | ERROR |  |
> |         |           |   | 2  | 0x0002  | BUSY |  |
> |         |           |   | 3  | 0x0003  | VOLTAGE_ERROR |  |
> |         |           |   | 4  | 0x0004  | CURRENT_ERROR |  |
> |         |           |   | 5  | 0x0005  | TEMPERATURE_ERROR |  |
> |         |           |   | 6  | 0x0006  | FUSE_ERROR |  |
> |         |           |   | 7-99  | 0x0000  | RESERVED |  |
> |         | 202       | 2 | X  | 0x000XXX  | 명령 ID  | XXX |
> |         | 203       | 2 |  X | 0x000X  | 제어권 상태  | 아래에서 선택 |
> |         |           |   |  1 | 0x0001  | LOCAL | 로컬 제어 (제어권이 노드) | 
> |         |           |   |  2 | 0x0002  | REMOTE | 원격 제어 (제어권이 노드에 없음) | 
> |         |           |   |  3 | 0x0003  | MANUAL | 수동 제어 | 
> | **센서 상태 정보** |
> |         | 204-205      | 4 | 2.3  | 0xXXXX XXXX   | 1번 EC센서      | float (센서값) |
> |         | 206          | 2 | 0    | 0xXXXX        | 1번 상태        | 상태값 0~7중 선택 |
> |         | 207-208      | 4 | 2.3  | 0x0000 0000   | 2번 EC센서      | float (센서값) |
> |         | 209          | 2 | 0    | 0x0000        | 2번 상태        | 상태값 0~7중 선택 |
> |         | 210-211      | 4 | 2.3  | 0xXXXX XXXX   | 3번 EC센서      | float (센서값) |
> |         | 212          | 2 | 0    | 0xXXXX        | 3번 상태        | 상태값 0~7중 선택 |
> |         | 213-214      | 4 | 6.5  | 0xXXXX XXXX   | 1번 PH센서      | float (센서값) |
> |         | 215          | 2 | 0    | 0xXXXX        | 1번 상태        | 상태값 0~7중 선택 |
> |         | 216-217      | 4 | 6.5  | 0x0000 0000   | 2번 PH센서      | float (센서값) |
> |         | 218          | 2 | 0    | 0x0000        | 2번 상태        | 상태값 0~7중 선택 |
> |         | 219-220      | 4 | 6.5  | 0x0000 0000   | 3번 PH센서      | float (센서값) |
> |         | 221          | 2 | 0    | 0x0000        | 3번 상태        | 상태값 0~7중 선택 |
> |         | 222-223      | 4 | 500  | 0x01F4 0000   | 일사 센서       | float (센서값) |
> |         | 224          | 2 | 0    | 0x0000        | 일사 상태       | 상태값 0~7중 선택 |
> |         | 225-226      | 4 | 3000 | 0x0BB8 0000   | 누적전체유량    | float (센서값) |
> |         | 227          | 2 | 0    | 0x0000        | 유량계 상태     | 상태값 0~7중 선택 |
> |         | 228-229      | 4 | 30   | 0x001E 0000   | 01구역유량      | float (센서값) |
> |         | 230          | 2 | 0    | 0x0000        | 유량계 상태     | 상태값 0~7중 선택 |
> | **<<12 번 센서까지 계속>>** |
> |         | 261-262      | 4 | 30   | 0x001E 0000   | 12구역유량      | float (센서값) |
> |         | 263          | 2 | 0    | 0x0000        | 12유량계 상태   | 상태값 0~7중 선택 |

> |<span style="color:orange">대상</span>|<span style="color:orange"> 번호 </span>|<span style="color:orange"> Length </span>|<span style="color:orange">Value</span> | <span style="color:orange">HEX</span> | <span style="color:orange">내용</span> | <span style="color:orange">설명</span> |
> |:---:|---:|:---:|:---|:---|:---|:---|
> | **양액기 상태 정보** |
> | 동작상태        | 401          | 2 | XX  | 0xXXXX XXXX   | 아래값 참조  |
> |                 |           |   | 401 | 0x0191   | 준비중 |  PREPARING | 
> |                 |           |   | 402 | 0x0192   | 제공중 |  SUPPLYING |
> |                 |           |   | 403 | 0x0193   | 정지중 |  STOPPING |
> | 관수구역        | 402          | 2 | 0    | 0xXXXX        | 1 -12 구역중   | 현재구역 번호  |
> | 경보정보        | 403          | 2 | 0    | 0xXXXX        | 1번 상태        | 아래값 참조 |
> |                 |           |   | 0 | 0x0000   | 정상      | NORMAL                   | 
> |                 |           |   | 1 | 0x0001   | 고농도 EC | HIGH_CONCENTRATION_EC    | 
> |                 |           |   | 2 | 0x0002   | 저농도 EC | LOW_CONCENTRATION_EC     | 
> |                 |           |   | 3 | 0x0003   | 저농도 PH | HIGH_CONCENTRATION_PH    | 
> |                 |           |   | 4 | 0x0004   | 고농도 PH | LOW_CONCENTRATION_PH     | 
> |                 |           |   | 5 | 0x0005   | 저유량경보 | LOW_FLOW_ALARM          | 
> |                 |           |   | 6 | 0x0006   | 고온경보  | HIGH_TEMPERATURE_ALARM   | 
> |                 |           |   | 7 | 0x0007   | 저온경보  | LOW_TEMPERATURE_ALARM    | 
> |                 |           |   | 8 | 0x0008   | 이외경보  | ABNORMAL                 | 
> | 명령 ID(opid)   | 404          | 2 | 0    | 0xXXXX        | OPID        |  |
> | 남은관수시간     | 405-406   | 4 | 0    | 0xXXXX 0000        | 4byte 남은관수시간        |  |




> |<span style="color:orange">대상</span>|<span style="color:orange"> 번호 </span>|<span style="color:orange"> Length </span>|<span style="color:orange">Value</span> | <span style="color:orange">HEX</span> | <span style="color:orange">내용</span> | <span style="color:orange">설명</span> |
> |:---:|---:|:---:|:---|:---|:---|:---|
> | **양액기 제어 정보** |
> | 제어명령        | 501          | 2 | XX | 0xXXXX     | 아래값 참조  |
> |                 |           |   | 401 | 0x0191   | 작동시작 |  기 설정된대로 1회 관수 | 
> |                 |           |   | 0   | 0x0000   | 작동멈춤 |  양액기 정지 |
> |                 |           |   | 402 | 0x0192   | 구역관수 |  구역관수 |
> |                 |           |   | 403 | 0x0193   | 파라미터관수 |  ec,ph,공급시간,구역으로 관수 |
> | 명령 ID         | 502          | 2 | 2.3  | 0xXXXX   | OPID  |
> | 제어권          | 503          | 2 | X  | 0xXXXX   | 203 번값  |
> | **<<파라메타관수 명령을 날리는부분>>** |
> | 제어명령        | 504          | 2 | X  | 0xXXXX   | 위 501 번값  |
> | OPID            | 505          | 2 | X  | 0xXXXX   | OPID  |
> | 관수시작구역     | 506          | 2 | X  | 0xXXXX   | 시작구역  |
> | 관수종료구역     | 507          | 2 | X  | 0xXXXX   | 종료구역  |
> | 관수시간(초)     | 508-509     | 4 | X  | 0xXXXX XXXX   | uint32  |
> | EC 설정값     | 510-511     | 4 | X  | 0xXXXX XXXX   | float  |
> | PH 설정값     | 512-513     | 4 | X  | 0xXXXX XXXX   | float  |





- [ ] : false
- [x] : true



## <span style="color:black; background-color:yellow">1. 양액기에 디폴트 정보를 요청. 최초 시작시 </span>
```javascript
      // 1번부터 8개의 레지스터 요청 
(REQ) ⫸ 31 03 0001 0008 CRC ↲

     // 복합노드          : 3   (3267에서 양액기는 복합노드로 정의)
     // 양액기레벨        : 4   (레벨3양액기)
     // 프로토콜 버전     : 20  (고정)
     // 채널수            : 21  (확장가능하지만 디폴트는 21개로 일단 고정)
     // 시리얼 넘버       : 10000  (확장가능하지만 디폴트는 21개로 일단 고정) << 코디에서 임으로 정의 
(RCV) ⫷ 31 03 00 00 00 00 0003 0004 0014 0015 27100000 CRC ↲
      - 제품의 시리얼 넘버를 고정해 버리면 
```




## <span style="color:black; background-color:yellow">2. 양액기노드 부착 디비이스(센서, 양액기) 정보 조회 </span>
```javascript
      // 101 번부터 21개의 데이타를 요청 (디폴트 맵) 
(REQ) ⫸ 31 03 0065 0015 CRC ↲


   //   31 03
   //   15        (바이트수)  
   //   000C   (EC 센서가 있다, 코드값 12번)
   //   0000   (EC 센서가 없으므로)
   //   0000   (EC 센서가 없으므로)
   //   0010   (PH 센서가 있다, 코드값 16번)
   //   0000   (PH 센서가 없으므로)
   //   0000   (PH 센서가 없으므로)
   //   0007   (일사센서 있다, 코드값 7 ) 
   //   0005   (전체 유량센서 있다, 코드값 5 ) 
   //   // 만약 4구역까지만 있으면 4구역까지 0005 값이고 5구역부터는 0000 을 넣어주면 된다. 
   //   0005   (01구역 누적 유량센서 코드값 5 ) 
   //   0005   (02구역 누적 유량센서 코드값 5 ) 
   //   0005   (03구역 누적 유량센서 코드값 5 ) 
   //   0005   (04구역 누적 유량센서 코드값 5 ) 
   //   0005   (05구역 누적 유량센서 코드값 5 ) 
   //   0005   (06구역 누적 유량센서 코드값 5 ) 
   //   0005   (07구역 누적 유량센서 코드값 5 ) 
   //   0005   (08구역 누적 유량센서 코드값 5 ) 
   //   0005   (09구역 누적 유량센서 코드값 5 ) 
   //   0005   (10구역 누적 유량센서 코드값 5 ) 
   //   0005   (11구역 누적 유량센서 코드값 5 ) 
   //   0005   (12구역 누적 유량센서 코드값 5 ) 
   //   00CC   (양액기)  3레벨 양액기는(204)
   //   0xXX 0xXX   ( CRC ) 
(RCV) ⫷ 31 03 15 000C 0000 0000 0010 0000 0000 0007 0005 0005 0005 0005 0005 0005 0005 0005 0005 0005 0005 0005 0005 00CC CRC ↲
      - 
```




## <span style="color:black; background-color:yellow">3. 양액기 노드 상태 정보 조회 </span>
```javascript
      // 양액개 노드 상태 정보 201, 202, 203의 정보를 가져온다. 
      // 201 에서 시작해서 3개를 가져온다. 
(REQ) ⫸ 31 03 00C9 0003 CRC ↲

     // 상태         : 401(MIXING, PREPARING), 402(SUPPLYING), 403(STOPPING)
     // 명령 ID      : opid, 현재 실행중인 명령이 없다면 0
     // 제어권       : LOCAL(1), REMOTE(2), MANUAL(3)
     // if 정지상태이며 실행중이지 않고 제어권이 Remote 이면 
(RCV) ⫷ 31 03 03 0193 0000 0003 CRC ↲
      -  
```





## <span style="color:black; background-color:yellow">4. 양액기 노드 제어권 변경 </span>
```javascript
      // 양액개 노드 상태 정보 201, 202, 203의 정보를 가져온다. 
      // 201 에서 시작해서 3개를 가져온다. 
      // 제어명령       : 제어권에 관한 것이므로 코드는 2가 맞다
      // 명량ID         : 어디에 저장할 것인지?
      // 제어권         : LOCAL(1), REMOTE(2), MANUAL(3)
(REQ) ⫸ 31 10 0000(?) 0003(?) 03(?) 0002 0000(?) 0003 CRC ↲


(RCV) ⫷ 31 10 0000(?) 0003 CRC ↲
      -  
```

















## <span style="color:black; background-color:lime">4. 센서 상태 정보 조회 </span>
```javascript
      // 한번에 디폴터 맵을 다 가져올 경우 
      // 204 번 부터 263 까지 연속해서 가져온다. 총 60개  
(REQ) ⫸ 31 03 00CC 003C CRC ↲


(RCV) ⫷ 31 10 3C(?)  CRC ↲
      - "바이트 수" <<< 이게 헷갈리네... ???
      // - 전송받은 레지스트 값을 풀어서 센서값과 센서상태등으로 
```

## <span style="color:black; background-color:lime">5. 양액기 상태 정보 조회 </span>
```javascript
      "시작주소" <<< 의미가 있나?
(REQ) ⫸ 31 03 0000( 시작주소?) 0003 CRC ↲

      // 레벨3양액기 (상태/관수구역/경보정보/명령ID/남은관수시간 == 5)
         - 레지스트 주소 401 에서 상태값을 가져온다. 
      // 상태        : 401(MIXING, PREPARING), 402(SUPPLYING), 403(STOPPING)
         - 레지스트 주소 402 에서 관수구역값을 가져온다. 
      // 관수구역    : 1 ~ 12
         - 레지스트 주소 403 에서 경보정보를 가져온다. 
      // 경보정보    : 정상(0), 고농도EC(1) ... ... 기타경보(8)
         - 레지스트 주소 404 에서 명령ID를 가져온다. 
      // 명령 ID    : ???
         - 레지스트 주소 405-406 에서 남은관수시간(초)을 가져온다. 
      // 남은시간    : 4 byte



      // if 양액을 5번구역에 공급중이며 남은 공급시간이 555초 라면  
(RCV) ⫷ 31 03 05(?) 0192(SUPPLYING) 0005(5번구역 공급중)  0000(정상) 022B0000(남은시간 555초)   CRC ↲
      -  
```
> <span style="color:black; background-color:white">B7. 경보정보 </span>   
> |<span style="color:orange">대상</span>|<span style="color:orange">상태정보</span>|<span style="color:orange">코드값</span>|<span style="color:orange">의미</span>
> |:---:|:---|:---:|:---|
> |양액기 |NORMAL                   |0| 정상|
> |      |HIGH_CONCENTRATION_EC     |1| 고농도 EC|
> |      |LOW_CONCENTRATION_EC      |2| 저농도 EC|
> |      |HIGH_CONCENTRATION_PH     |3| 고농도 PH|
> |      |LOW_CONCENTRATION_PH      |4| 저농도 PH|
> |      |LOW_FLOW_ALARM            |5| 저유량 경보|
> |      |HIGH_TEMPERATURE_ALARM    |6| 고온경보|
> |      |LOW_TEMPERATURE_ALARM     |7| 저온경보|
> |      |ABNORMAL                  |8| 기타경보|



## <span style="color:black; background-color:lime">양액기 제어</span>
```javascript
"양액기 1회관수 시작"
(REQ) ⫸ 31 10 0000 0000 00 0191(401) xxxx(opid 명령ID) CRC ↲
(RCV) ⫷ 31 10 0000 0000 CRC ↲


"양액기 1회관수 종료"
(REQ) ⫸ 31 10 0000 0000 00 0000(0) xxxx(opid 명령ID) CRC ↲
(RCV) ⫷ 31 10 0000 0000 CRC ↲


"양액기 구역관수 시작"
   // 1구역부터 5구역까지 60초씩 관수 
(REQ) ⫸ 31 10 0000 0000 00 0192(402) xxxx(opid 명령ID) 0001 0005 003C0000  CRC ↲
(RCV) ⫷ 31 10 0000 0000 CRC ↲


"양액기 파라미터 관수 시작"
   // 1구역부터 5구역까지 60초씩 관수  EC 2.5, PH 6.5
(REQ) ⫸ 31 10 0000 0000 00 0192(402) xxxx(opid 명령ID) 0001 0005 003C0000 40200000 40D00000 CRC ↲
(RCV) ⫷ 31 10 0000 0000 CRC ↲




      -  
```























>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  
>.  



# <span style="color:black; background-color:yellow"> 1. 양액기 정보 조회 </span>  
> ## 요청 패킷   
> - 슬레이브주소(1B)  / 기능코드(1B)  / 시작주소(2B)  / 레지스트 수(2B) / CRC(2B)
>``` javascript
>    // 0x31, 0x03, 0x00 0x00, 0x0A 0x00, 0xFF 0xFF
>    // 슬레이브 주소 49(DEC) 번인 장비에 레지스터 1번 에서 시작해서 8개의 값을 요청
>    ▶ 0x31 0x03 0x00 0x01 0x00 0x08 0x3A 0x8D
>```


> ## 응답 패킷   
> - 슬레이브주소(1B)  / 기능코드(1B)  / 바이트수(1B)  / 레지스트 값(2*N) / CRC(2B)
>``` javascript
>    자릿수:     1       2       3       4           5
>    바이트:     1B      1B      1B      NB          2B(CRC)
>    내  용:     1F      03      00      00 ~ 0A     00 FF
>  
>    
>```  
> - 레지스트리 값  
> 기관코드1 / 회사코드1 / 제품타입1 / 제품코드1 / 프로토콜버전1 / 채널번호1 / 시리얼번호2
>``` javascript
>   기관코드    : 2byte     : 00 00 (디폴터맵 지원) 회사코드를 발급하고 관리하는 기관의 코드
>   회사코드    : 2byte     : 00 00 (디폴터맵 지원) 각 회사의 코드
>   제품타입    : 2byte     : 00 03 (3번 복합노드) 0x01(센서노드), 0x02(구동기노드)
>   제품코드    : 2byte     : 00 04 (레벨 3제어기)  1(레벨0), 2(레벨1), 3(레벨2), 4(레벨3)
>   프로토콜버전 : 2byte    : 00 14 (본 표준에서는 확정 20)
>   채널수      : 2byte     : 00 15 해당노드에 부착가능한 디바이스의 수 디폴트 21EA ?
>   시리얼 번호 : 2byte     : 0x27 0x10 0x00 0x00 코디제품의 시리얼은 10000 번 부터 시작 4byte
>
>     // 코리아디지탈의 정보를 넘겨준다. 
>     //            기관코드   company  pdt_type  pdt_code  protocol   channel 21개  serial if(10000 )      CRC16
>     ▶ 0x31 0x03 0x00 0x00 0x00 0x00 0x00 0x03 0x00 0x04 0x00 0x14    0x00 0x15    0x27 0x10 0x00 0x00  0x0F 0xF7
>```  
>  
> 양액기 정보조회 끝 ~~~
> 






# <span style="color:black; background-color:yellow"> 2. 양액기노드 부착 디비이스(센서, 양액기) 정보 조회 </span>  
> ## 요청 패킷   
> - 슬레이브주소(1B)  / 기능코드(1B)  / 시작주소(2B)  / 레지스트 수(2B) / CRC(2B)
>``` javascript
>     // 101번 ~ 200번
>     // 시작주소    : 101번 ~ 200번
>     // 레지스트수  : 위에정의된 "채널수"를 대입
>     // 101 번 부터 21개의 레지스터를 요청한다. 
>     ▶ 0x31 0x03 0x00 0x65 0x00 0x15 0x85 0x88
>```  
> 
> 

> ## 응답 패킷   
> - 슬레이브주소1 / 기능코드1 / 바이트수1 / 레지스트 값 N / CRC  
>  
>
>``` javascript
>     // 
>     // 만약 ec, ph 센서1개, 일사센서 1개, 전체누적유량, 1구역 누적, 2구역 누적 으로 가정하면 
>     // 요청이 왔을때 101번부터 순차적으로 있다/없다, 있으면 뭐가있다를 디폴트로 21개 내어준다. 
>     ▶ 
>     0x31 
>     0x03 
>     0x15        (바이트수)  
>     0x00 0x0C   (1번째 ec센서) 
>     0x00 0x00   (2번째는 없음) << 없으므로 0x00
>     0x00 0x00   (3번째도 없음) << 없으므로 0x00 
>     0x00 0x16   (1번째 ph센서) 
>     0x00 0x00   (2번째는 없음) << 없으므로 0x00
>     0x00 0x00   (3번째는 없음) << 없으므로 0x00 
>     0x00 0x07   (일사센서) 
>     0x00 0x05   (전체누적유량센서) 
>     0x00 0x05   (01구역 누적) 
>     0x00 0x05   (02구역 누적) 
>     0x00 0x05   (03구역 누적) 
>     0x00 0x05   (04구역 누적) 
>     0x00 0x05   (05구역 누적) 
>     0x00 0x05   (06구역 누적) 
>     0x00 0x05   (07구역 누적) 
>     0x00 0x05   (08구역 누적) 
>     0x00 0x05   (09구역 누적) 
>     0x00 0x05   (10구역 누적) 
>     0x00 0x05   (11구역 누적) 
>     0x00 0x05   (12구역 누적) 
>     0x00 0xCC   (양액기)  3레벨 양액기는(204)
>     0xXX 0xXX   ( CRC ) 

>```  
> 끝 




# <span style="color:black; background-color:yellow"> 3. 양액기 노드 상태 정보 조회 </span>  
> ## 요청 패킷   
> - 슬레이브주소(1B)  / 기능코드(1B)  / 시작주소(2B)  / 레지스트 수(2B) / CRC(2B)
>``` javascript
>    // 
>    // 슬레이브 주소 49(DEC) 번인 장비에 레지스터 1번 에서 시작해서 8개의 값을 요청
>    // 201 노드상태       2byte
>    // 202 명령 ID        2byte
>    // 203 제어권상태     2byte
>    ▶ 0x31 0x03 0x00 0xC9 0x00 0x03 0x0C 0x02
>```


> ## 응답 패킷   
> - 슬레이브주소(1B)  / 기능코드(1B)  / 바이트수(1B)  / 상태(2B) / 명령ID(2B) / 제어권(2B) / CRC(2B)
>``` javascript   
>     // 
>     // 주소 / 기능코드 / 바이트수 / 상태 / 명령ID / 제어권 / CRC
>     // 현재 양액기가 돌고 있고 제어권은 원격인 경우 
>    ▶ 0x31 0x03 0x06 0x01 0x92(운전중402) 0x00 0x00(opid) 0x00 0x01(제어권 local) 0xXX 0xXX(CRC)
>```   
>
> 


> <span style="color:black; background-color:white">(표) 양액기 노드 상태 정보 </span>
> |<span style="color:orange">레지스터주소</span>   |<span style="color:orange">의미</span>| <span style="color:orange">타입</span>|
> |:---:|:---:|:---:|
> |**201**|노드 상태        |uint16|
> |202|명량 ID (opid)   |uint16|
> |203|제어권상태       |uint16|
   
 
> <span style="color:black; background-color:white">상태 코드 </span>   
> |<span style="color:orange">대상</span>|<span style="color:orange">상태정보</span>|<span style="color:orange">코드값</span>|<span style="color:orange">의미</span>
> |:---:|:---|:---:|:---|
> |공통  |READY               |0| 정상,준비중,정지|
> |      |ERROR               |1| 오류|
> |      |BUSY                |2| 처리불능|
> |      |VOLTAGE_ERROR       |3| 동작 전압 이상|
> |      |CURRENT_ERROR       |4| 동작 전류 이상|
> |      |TEMPERATURE_ERROR   |5| 동작 온도 이상|
> |      |FUSE_ERROR          |6| 퓨즈이상|
> |      |RESERVED            |7-99| 공통예약|
> |센서  |NEED_REPLACE        |101| 센서 및 소모품 교체 요망|
> |      |NEED_CALIBRATION    |102| 센서 교정 요망|
> |      |NEED_CHECK          |103| 센서 점검 필요|
> |양액기  |PREPARING(또는 MIXING)        |401| 준비중|
> |      |SUPPLYING           |402| 제공중|
> |      |STOPPING            |403| 정지중|
> |기타  |VENDOR_SPECIFIC_ERROR        |900-999| 제조사 정의 에러코드|


> <span style="color:black; background-color:white">제어권</span>   
> |<span style="color:orange">대상</span>|<span style="color:orange">제어권정보</span>|<span style="color:orange">코드값</span>|<span style="color:orange">의미</span>
> |:---:|:---|:---:|:---|
> |노드  |LOCAL               |1| 로컬제어 제어권이 노드에 있음|
> |      |REMOTE              |2| 원격제어 제어권이 노드에 있지 않는 경우|
> |      |MANUAL              |3| 수동제어|



>``` javascript
>     // 현재 제어상태를 넘겨준다. 
>     // 코리아디지탈의 정보를 넘겨준다. 
>     //            기관코드   company  pdt_type  pdt_code  protocol   channel 21개  serial if(10000 )      CRC16
>     ▶ 0x31 0x03 0x00 0x00 0x00 0x00 0x00 0x03 0x00 0x04 0x00 0x14    0x00 0x15    0x27 0x10 0x00 0x00  0x0F 0xF7
>```  
>  
> 양액기 정보조회 끝 ~~~
> 





| 제목 |       내용 |   설명   |
| :--- | ---------: | :------: |
| 201  | 오른쪽정렬 | 중앙정렬 |
| 202  | 오른쪽정렬 | 중앙정렬 |
| 203  | 오른쪽정렬 | 중앙정렬 |





> <span style="color:black; background-color:yellow"> 만약 EC/PH 1EA, 일사 1EA 가 유량계와 함께 설치되어져 있다면 </span>  
> <span style="color:black; background-color:lime"> 만약 EC/PH 1EA, 일사 1EA 가 유량계와 함께 설치되어져 있다면 </span>  
> ## 0x31 0x03 0x00 0x15
> <span style="color:yellow font-size:3em;"> 만약 EC/PH 1EA, 일사 1EA 가 유량계와 함께 설치되어져 있다면 </span>  








``` javascript
const SerialPort = require('serialport');
const ModbusRTU = require('modbus-serial');

```
> 디폴트 레지스트리 맵 구조
- 대한민국
- 우리나라
- 



1. b
2. c
<hr/>
다음 문장 


4. 

## 다음 제목 
**굵은 글씨**  
*이텔릭*  
_이탤릭_  
~~취소선~~  
<u>밑줄</u>  
ex)  
This is the **bold** text and this is the *italic* text and <u>let's</u> do ~~strikethrough~~



> <img src="./3288-01.jpg" width="60%" />   




| 제목 |       내용 |   설명   |
| :--- | ---------: | :------: |
| 201  | 오른쪽정렬 | 중앙정렬 |
| 202  | 오른쪽정렬 | 중앙정렬 |
| 203  | 오른쪽정렬 | 중앙정렬 |


