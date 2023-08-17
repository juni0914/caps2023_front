# Feat : 체육관 서비스 Ver 0.0.1

### 경상국립대학교 체육시설 예약과 커뮤니티 통합 웹 사이트 제작
<br>

### 팀프로젝트 공유 레포지토리 : https://github.com/GNU-SPORTS
<br>

## 🌟 목차 🌟
- 기술스택
- 프론트엔드 개발 세부 내용
- 실행화면
<br>

## 📚 Tech Stack 📚
<br>
<div align=center>
	<h4>✨ Front-End ✨</h4>
</div>
<div align="center">
	<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
	<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
	<img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"/>
	<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
	<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
	<br>
</div>
<br>
<br>

<div align=center>
	<h4>🚀 Distribute 🚀</h4>
</div>
<div align=center>
	<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
</div>
<br>

<div align=center>
	<h4>🛠 Environment 🛠</h4>
</div>
<div align=center>
	<img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"/>
	<img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"/>
	<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
</div>
<br>
<br>

## 🌈 Front-End Development Content 🌈
<br>
<h3>🌷 클라이언트 서버 배포 🌷</h3>
<h4>- AWS EC2 인스턴스 서비스를 이용하여 클라이언트 서버를 배포하였습니다.</h4>
👉 추가로 pm2를 이용하여 인스턴스가 꺼지지 않는 한 배포가 중단되지 않도록 서버를 구동하였습니다.
<br>
<br>
<br>
<h3>⚡ API 통신 ⚡</h3>
👉 스프링부트 백엔드와 유연한 통신을 위해 REST API를 적용하였습니다.
<br>
<br>
<br>
<h2>- 함수형 컴포넌트를 사용하여 </h2>
<h4> 1) 컴포넌트 간에 상태나 로직을 쉽게 공유하고 예약과 커뮤니티 기능을 구현할 때 같은 코드가
중복되지 않도록 재사용성을 확보하였습니다.<br><br>
2) 코드를 간결하고 직관적이고 가독성이 좋게끔 작성하였고, 불필요한 생명주기 메서드나 복잡한 클래스 구조를 사용하지 않았습니다.<br><br>
3) 효과적인 상태 관리와 라이프사이클 처리를 하였습니다.<br><br>
4) 렌더링 성능을 최적화하기 위해 최적화된 Hooks를 활용하여 불필요한 side effect를 방지하였습니다.<br><br></h4>


<h2>- React Hooks를 사용하여</h2>
<h3>1) useEffect</h3> 
<h4>- 렌더링 시 발생하는 side effect를 방지하였습니다.  <br><br>
- 데이터 가져오기, API 호출 등의 비동기 작업을 useEffect 내에서 처리하였습니다. <br><br>
- 또한, 메모리 누수를 방지하고 리소스를 효과적으로 관리하였습니다.</h4><br>
<h3>2) useState</h3>
<h4>- 간단하고 직관적인 상태 관리를 하였습니다. <br><br>
- 또한, 리액트의 렌더링 메커니즘을 활용하여 필요한 상태만 업데이트하여 불필요한 렌더링을 최소화하였습니다.</h4>
<br><br>

<h2>- React Router를 사용하여</h2>
<h4>
▪ Routes와 Route 컴포넌트를 사용하여 리액트 애플리케이션의 라우팅을 관리하였습니다.<br><br>
▪  애플리케이션의 페이지 간 전환을 관리하고, 각 경로에 맞는 컴포넌트를 렌더링하였습니다.<br><br>
▪ JSX 파일을 사용하여  가독성과 유지보수성을 높이고, 모듈화된 개발과 문법을 간소화하였습니다.<br><br>
▪ 사용자 상호작용에 따라 다양한 상태에 맞게 화면을 구성하고, 동적인 UI를 구현하기 위해 조건부 렌더링을 적극 활용하였습니다.<br><br>
</h4>

<br>
<h3> 🗺 서비스의 지도는 네이버 맵 API(react-naver-maps)를 활용하였습니다.</h3>
<br>
<h3> 🔑 사용자의 비밀번호는 JWT토큰(jsonwebtoken)을 사용하여 암호화하였습니다.</h3>
<br>
<h2>🎨  Style</h2>
<h4> 
- 스타일링은 react-bootstrap, JSX 내부 스타일링과 기본 CSS를 사용하였습니다.<br><br>
- 획일화된 디자인을 추구하였으며, 모바일 및 태블릿 환경에서의 사용성을 고려하기 위하여 반응형 웹 디자인을 적용하였습니다.
</h4>
<br>

## 🚀 트러블 슈팅
<summary>
    
<h3>🛠 트러블 슈팅 1</h3>
</summary>
<div markdown="3">
  
### Problem & Reason
- 서버에서 현재 시간과 비교하여 현재 시간보다 지난 시간은 예약이 되지않게 시간 버튼을 비활성화해야한다.
- 기존 방식을 채택하니 현재 시각이 16시 05분이면, 16시 이전 버튼이 비활성화가 되어야하는데, 오늘 이후의 날도 16시 이전 버튼이 비활성화 되는 부분 발생했다.
- 예약 시스템에서 예약 가능한 시간대를 동적으로 생성하고 상태를 관리하는 중요한 기능

### To Solve
- 이용 가능 시간 추출: reservationInfo.center 객체에서 openTime과 closeTime을 추출하여 이용 가능한 시간대 범위를 정의
- 예약된 시간 추출: reservationInfo.reservedTimes 배열에서 이미 예약된 시간대들을 추출
- 날짜 및 시간 정보 추출: 현재 시간과 선택된 날짜에 대한 연도, 월, 일, 시간, 분 정보를 추출
- 버튼 상태 설정: 각 버튼의 ID를 시간 형식으로 생성하고, 해당 시간이 이미 예약된 시간 목록에 있는지를 확인하여 isReserved 상태를 설정.  또한, 오늘 날짜의 버튼 중 현재 시간 이전 버튼은 비활성화

```
function generateReservationButtons() {
    // 이용 가능 시간 추출
    const { openTime, closeTime } = reservationInfo.center;
    const startTime = parseInt(openTime.split(":")[0]).toString().padStart(2, "0");
    const endTime = parseInt(closeTime.split(":")[0]);
  
    const reservedTimes = reservationInfo.reservedTimes || [];
    const buttons = [];
  
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
    const currentDate = now.getDate().toString().padStart(2, "0");
    const currentHour = now.getHours().toString().padStart(2, "0");
    const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const selectedDay = selectedDate.getDate().toString().padStart(2, "0");
  
    for (let i = startTime; i < endTime; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, "0");
        const minute = j.toString().padStart(2, "0");
        const buttonId = `${hour}:${minute}`;
        const isReserved = reservedTimes.includes(buttonId);
  
        // 오늘 날짜의 버튼 중 현재 시간 이전 버튼 비활성화
        let isDisabled = false;
  
        if (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay === currentDate) {
          isDisabled = parseInt(currentHour) > i || (parseInt(currentHour) === i && currentMinutes >= j);
        }
        buttons.push(
          <Button
            key={buttonId}
            variant={isSelected(buttonId) ? "success" : isDisabled || isReserved ? "light" : "outline-success"}
            className={`w-25 ${isSelected(buttonId) ? "selected" : ""}`}
            onClick={() => handleReservationTimeSelect(buttonId)}
            disabled={isDisabled || isReserved}
          >
            {buttonId}
          </Button>
        );
      }
    }
    return buttons;
  }

```
</div>
<br>
<summary>
    
<h3>🛠 트러블 슈팅 2</h3>
</summary>
<div markdown="3">
  
### Problem & Reason
- 특정 예약을 삭제한 후 예약 데이터와 관련된 상태를 업데이트해야한다.
- 예약은 바로 삭제가 되나, 삭제한 예약 데이터가 클라이언트 상에서 계속 존재하여 예약이 불가능한 상황이 발생했다.
- 예약 시스템에서 특정 예약을 삭제한 후 관련된 상태를 업데이트하여 예약 데이터를 관리하는 중요한 기능을 수행. 센터 ID와 예약 ID에 해당하는 예약 데이터를 삭제하고, 관련된 상태를 업데이트하여 애플리케이션의 일관성을 유지해야하는 기능

### To Solve
- filter 메서드를 사용하여 삭제되지 않은 예약을 제외한 업데이트된 예약 데이터를 생성. 이때, centerId와 reservationId가 같지 않은 경우에만 해당 예약 데이터를 유지
- setReserveData(예약데이터), setReserveId(예약ID), setReservecenterId(센터ID) state 를 사용하여 상태를 업데이트하고, 삭제되지 않은 업데이트된 예약 데이터를 적용
- setDeletedReservations(삭제된 예약데이터) state 를 사용하여 삭제된 예약 내역을 업데이트

```
const updateReservationData = (centerId, reservationId) => {
  // 기존 예약 내역에서 삭제된 예약을 제외하고 업데이트된 예약 내역을 생성합니다.
  const updatedReserveData = reserveData.filter((name, index) => reservecenterId[index] !== centerId || reserveId[index] !== reservationId);
  const updatedReserveIds = reserveId.filter((id, index) => reservecenterId[index] !== centerId || id !== reservationId);
  const updatedCenterIds = reservecenterId.filter((id, index) => id !== centerId || reserveId[index] !== reservationId);
  
  // 예약 내역 상태를 업데이트합니다.
  setReserveData(updatedReserveData);
  setReserveId(updatedReserveIds);
  setReservecenterId(updatedCenterIds);

  // 삭제된 예약 내역을 업데이트합니다.
  const updatedDeletedReservations = reserveData.filter((name, index) => reservecenterId[index] !== centerId || reserveId[index] !== reservationId);
  setDeletedReservations(updatedDeletedReservations);
};
```
</div>
<br>

<h3>🛠 트러블 슈팅 3</h3>
</summary>
<div markdown="3">
  
### Problem & Reason
- login을 처리하는 api로 로그인 데이터를 post한 후, response를 받고 로컬스토리지에 서버로부터 받은 jwt토큰을 set하여 토큰을 로컬스토리지에 저장하는 로그인 방식
- 하지만 로그인 동작을 수행하면 서버에는 로그인 요청이 시도가 되지만 실패하는 상황 발생하여 프론트단에서 문제가 있다고 인지
- 로그인을 시도할 때, 한 번에 완료되는 경우도 있고, 몇 번을 시도해도 완료되지 않고, 로그인이 실패하는 치명적인 오류가 발생
- 원인은 js 버튼 동작에 있었다. 로그인 버튼의 코드에는 새로고침을 하게 되는 동작이 포함되어 있는데, 로그인을 처리하는 과정을 끝마치고 새로고침을 하는 동작이 완료가 되어야한다.
- 코드 실행시간 및 순서에 따라 버튼함수의 새로고침 동작이 먼저 수행되어서 올바르게 response를 넘겨받고, 로컬스토리지에 JWT를 등록하는 과정이 정상적으로 진행되지 못한 것이다.

### To Solve
- <button> 요소의 타입: 로그인 버튼의 타입을 <button type="submit">으로 설정하면, 클릭 시 폼의 기본 동작인 페이지 새로고침을 수행한다.
- 이를 방지하기 위해서는 <button>의 타입을 "button"으로 설정해야 한다. 버튼의 새로고침 동작이 있을 경우 페이지가 새로고침되어서 현재 작업 중인 상태를 초기화하고 모든 네트워크 요청이 중단될 수 있다.
- 따라서, 버튼 클릭과 같은 사용자 동작에 의해 새로고침이 발생하지 않도록 preventDefault() 함수를 사용하면된다.

```
<button onClick={login} type="button">Login</button>  //로그인 버튼 JSX

const handleKeyPress = (event) => {      // 로그인버튼을 눌렀을 때 작옹하는 함수
    if (event.key === 'Enter') {
      event.preventDefault(); 
      login();
    }
  };
```
</div>

## 🖥 구현 화면

### - 로그인,회원가입
| 로그인 | 회원가입 |
| ------------ | ------------- |
| ![로그인](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/e4de5608-39ef-4d17-83bc-8e396d52e3f1)| ![회원가입](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/c8ea0faa-e9cf-4962-a62f-93cb2a43a0c4) |
<br>

### - 메인화면
| 메인화면 | 지도 마커클릭 |
| ------------ |  ------------- |
| ![메인화면](https://github.com/juni0914/caps2023_front/assets/100837725/b02ebbb5-fc54-4a5e-b459-e3ed8f1504c0)| ![마커클릭화면](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/19d4a985-b5e8-4a72-b846-f8d1d8ebe9ca)| 
<br>

### - 예약창, 예약정보, 내 정보, 만료된 예약 정보
| 예약창 | 예약정보 | 내 정보 |  만료된 예약 정보 |
| ------------ | ------------- | ------------ | ------------- |
| ![예약창](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/370b9b8b-7d3b-4019-90e5-f30015d3501a)| ![예약 상세정보](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/b0ac9a1e-b1e1-484b-9ca6-4ff181845748) | ![내정보](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/fdb95965-22bc-4474-8a65-7f8c9926c4e7) | ![만료된예약](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/358a31d1-d5a7-44bb-9fcd-1a98f4d8c16f) |
<br>

### - 닉네임 변경,포인트 충전
| 닉네임 변경 | 포인트 충전 |
| ------------ | ------------- |
| ![닉네임변경](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/a8eef108-2052-49bd-a7b7-ffdb010d66f9) | ![포인트충전](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/d25a6931-f255-484e-aefc-cb48eaa37cab) |
<br>

### - 커뮤니티 메인, 내가 작성한 게시글, 내가 댓글단 글
| 커뮤니티 메인 |  내가 작성한 게시글 | 내가 댓글단 글 |
| ------------ | ------------ | ------------- |
| ![커뮤니티메인](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/26da1d87-d355-4fef-bbe2-73426ae7c46a)|  ![내가 작성한 게시글](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/144a2f19-b24e-4768-a675-f6f38b634a70) | ![내가 댓글단 글](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/73e29a8d-3a4f-4568-8a47-92bb6b933354) |
<br>

### - 게시글 작성, 게시글 수정, 클릭한 게시글 조회
|  게시글 작성 | 게시글 수정 | 클릭한 게시글 조회 |
| ------------ | ------------- | ------------- |
| ![게시글 작성](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/0d1ccf74-6259-4afb-b728-1b66008e6956) | ![게시글 수정](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/349818f8-2e84-4a51-95f3-a8c836b80bc2) | ![게시글 조회](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/b573dd04-a244-4c77-a386-4dbebc51f415) |
<br>

### - 댓글 보기, 댓글 수정, 검색결과뷰어
|  댓글 보기 | 댓글 수정 | 검색결과뷰어 |
| ------------ | ------------- | ------------- |
| ![댓글보기](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/b4a78094-4bba-407a-b0c6-cb02e64b418b) | ![댓글수정](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/4738f56e-9b24-4cfb-b987-58da7f346284) | ![검색결과창](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/5da37b92-af30-4bd5-9c4e-d03e7cf79ab3) |
<br>

### - 오래된순, 최신순 조회 화면
| 오래된순 조회 | 최신순 조회 |
| ------------ | ------------ |
| ![오래된순조회](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/fd1001c7-059d-4a25-ba27-687a9e7059c5)| ![최신순으로조회](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/93ff57d3-e955-456d-81e8-d49bdb8326e2) |
<br>

### 📱 모바일 환경(반응형 디자인) 
| 메인화면 | 커뮤니티 화면 |
| ------------ | ------------ |
| ![모바일1](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/b208b294-f96b-41c0-86dc-98f320b1f1b8)| ![모바일2](https://github.com/GNU-SPORTS/SPORTS-CLIENT-WEB/assets/100837725/1582cebf-b468-4a8e-8d89-27f9e4f07fc5) |



