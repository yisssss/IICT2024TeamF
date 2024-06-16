// --리셋 코드(아직 수정중으로 신경쓰지 않으셔도 됩니다)----------------------------
let mouseInactivityTimeout;
let lastMouseMovedTime;
let inactivityDuration = 100000; // 100초
let resetPopup;
let resetButton;
let cancelButton;
let resetPopMent = "사용자 님, 지금 계신가요?<br>Ta-In이 기다리고 있어요!<br>";

function resetMouseInactivityTimer() {
  // 마지막으로 마우스가 움직인 시간을 업데이트
  lastMouseMovedTime = millis();

  // 기존 타이머를 취소하고 새 타이머 설정
  clearTimeout(mouseInactivityTimeout);
  startMouseInactivityTimer();
}

function startMouseInactivityTimer() {
  // 20초 후에 checkMouseInactivity 함수를 실행
  mouseInactivityTimeout = setTimeout(() => {
    checkMouseInactivity();
    console.log("startMouseInactivityTimer 실행");
  }, inactivityDuration);
}

function checkMouseInactivity() {
  let currentTime = millis();
  if (
    currentTime - lastMouseMovedTime >= inactivityDuration &&
    big_stage == 2
  ) {
    // 20초 이상 마우스가 움직이지 않았을 때 실행할 코드
    showResetPopup();
    console.log("checkMouseInactivity 실행");
  }
}

function showResetPopup() {
  if (big_stage == 2) {
    resetPopup.show();
    console.log("showResetPopup 실행");
  }
}

function hideResetPopup() {
  resetPopup.hide(); // 팝업 숨기기
}

function resetToInitial() {
  // big_stage와 currentStageIntro를 초기화
  console.log("resetToInitial 실행");

  big_stage = 1;
  currentStageIntro = 1;

  currentStageIntro = 1;
  currentStageOutro = 8;
  big_stage = 1;

  userName = "username"; // 사용자 이름 저장
  responseTo1 = ""; // 랜덤 질문에 대한 응답 저장
  responseTo2 = ""; // 응답에 대한 이유 저장
  responseTo3 = ""; // 응답에 대한 이유 저장
  responseToChat1 = "";
  responseToChat2 = "";

  for (let i = 0; i <= dialogues.length; i++) {
    dialogues[i].userInput = "";
  }

  for (let i = 0; i <= videoUnits.length; i++) {
    videoUnits[i].subtitle = "";
  }

  chat1scale =1;
  chat2scale =2;

  positions = shufflePositions(positions);
  currentVideoIndex = 0;


  resetMouseInactivityTimer();
  resetPopup.hide(); // 팝업 숨기기
}
