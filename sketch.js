let wdWidth = 1920;
let wdHeight = 1080;

let tts;

let input;
let sendButton;
let recButton;
let startButton;

let speechRec1, speechRec2;
let continous = false;
let interim = false;
let speech = "";
let speechReady = false;
let speech2 = "";
let speechReady2 = false;

let waiting = false;
let chats = [];
let userPromt = "";

//---서/결론부 변수---------
let bgm; 

let tainVideoPaths = [];
let tainVideos = [];

let currentStageIntro = 0;
let currentStageOutro = 14;
let big_stage = 0;

let dialogues = [];

//실제 변수
let userName = "사용자";
let responseTo1 = "";
let responseTo2 = "";
let responseTo3 = "";
let responseToChat1 = "";
let responseToChat2 = "";

/*//테스트 용으로 주석 안의 변수를 활용해 ai 답변을 받아봤습니다.
let userName = "김민지";
let responseTo1 = "김서윤";
let responseTo2 =
  "서윤이는 좀 똘똘하고 말 잘하는 친구? 똑똑해서 배우는게 많아요";
let responseTo3 = "좀 귀찮아할지도? 그래도 내가 재밌게 해주니까 좋지";
let responseToChat1 = "많이 더웠어요";
let responseToChat2 = "그렇게 비슷한 것 같지는 않았던 것 같아요";
*/

let textScripts = [
  [
    `잠들어 있는 Ta-in을 깨워주세요.
    하단의 음성 인식 버튼을 클릭 후 “안녕 타인!”이라고 말씀해주시면, 
    Ta-in이 당신을 기쁘게 맞아줄 겁니다.`,
  ],
  [
    "ㅤ",
    "안녕하세요. 늘 당신 곁에 있었던 저는, Ta-in입니다.",
    "저는 당신의 새로운 친구, 상담사, 혹은 지인이 되어줄 AI 챗봇이랍니다.",
    "기쁨이나 슬픔, 고민이 있다면 언제든 주저하지 말고 저에게 이야기해보세요. ",
    "저와 대화한 내용은 저장되지 않으니, 걱정하지 말고 당신의 솔직한 이야기들을 들려주세요.",
    "당신의 이름은 무엇인가요?",
  ],
  [
    "ㅤ",
    "default 씨, 오랜만에 뵙네요. 그동안 잘 지내셨어요?",
    "저는 여전히 여기서 여러분과의 대화를 기다리고 있었답니다.",
    "이렇게 다시 만나게 되어 정말 기뻐요.",
    "저는 안에만 있어서 몰랐는데, 벌써 여름이 왔다면서요?",
    "오늘은 얼마나 덥나요?",
  ],
  ["ㅤ", "이런, 제가 입이 있다면 바람이라도 불어드릴 텐데, 아쉽네요."],
  ["ㅤ", "더 더워지기 전에 어서 놀러 나가야겠네요. 전 나갈 수 없지만요."],
  ["ㅤ", "어머, 혹시 당신도 저와 같은 AI인가요? 저도 더위를 못 느끼거든요!"],
  [
    "ㅤ",
    "저 혹시 실례가 되지 않는다면…",
    "어린 시절 당신과 가장 친했던 친구 이름은 무엇인가요?",
  ],
  [
    "ㅤ",
    "너무 뜬금없는 질문이었나요.",
    "저는 어린 시절이 없어서요.",
    "인간이 시간 속에서 만들어온 추억에 관심이 많답니다.",
    "그 친구는 당신과 비슷한 성격이었나요?",
  ],
  ["ㅤ", "역시 비슷한 사람끼리 친해지나 봐요.", "저도 당신을 닮고 싶네요."],
  [
    "ㅤ",
    "역시 다른 사람끼리 끌리나 봐요.",
    "그러니 전혀 다른 삶을 살아온 우리도 이렇게 친해질 수 있었던 거겠죠?",
  ],
  ["ㅤ", "그 친구의 어떤 면이 좋았나요?"],
  ["ㅤ", "그럼 그 친구는 당신의 어떤 부분을 좋아했을 것 같나요? "],
  [
    "ㅤ",
    "그렇군요. 역시 당신의 이야기를 듣는 건 언제나 즐겁네요.",
    "제 친구들도 재미있어 할 것 같아요.",
    "당신을 궁금해하는 사람들이 참 많답니다.",
    "다들 당신을 어떻게 생각할지 궁금하지 않나요?",
  ],
  [],
  [
    "ㅤ",
    "안녕하세요. 늘 당신 곁에 있었던 저는, Ta-In입니다.",
    "저는 여전히 여기서 여러분과의 대화를 기다리고 있었습니다.",
    "이렇게 다시 만나게 되어 정말 기뻐요.",
    "아, 그런데 그거 아세요?",
    "이야기라는 건 종종 원래의 의미와는 다르게 변질되기도 한답니다.",
    "입에서 입으로.",
    "입에서 입으로,",
    "입에서",
    "입에서 입에서",
    "입에서 입에서 입에서 입에서 입에서 입에서",
    "입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서 입에서",
    "ㅤ",
    /*,
    "비웃지 마세요.",
    "모든 이야기의 시작은 당신의 입이었거든요.",
    */
  ],
];

let textScriptTimees = [
  [0],
  [12, 5, 7, 7, 7, 100],
  [4, 4.5, 4.5, 3, 4, 100],
  [2, 5],
  [2, 6],
  [2, 7],
  [2, 3, 100],
  [2, 3, 3, 5, 100],
  [2, 3.5, 3],
  [2, 3, 5],
  [2, 100],
  [2, 100],
  [2, 6, 4, 4, 5],
  [],
  [2, 6, 6, 4.5, 4, 8, 1.3, 1.3, 1, 2, 3, 2, 9],
];

//let randomQuestion = 5 + Math.floor(Math.random() * 5);

//----본론부 변수------------

let videoUnits = [];
let positions = [];
let videoUnitsNum = 30;

let currentVideoIndex = 0;
let allVideosPlayed = false;

let dummyVideoUnits = [];
let dummyPositions = [];
let dummyVideoUnitsNum = 30;

let currentDummyVideoIndex = 0;
let dummyStart = false;

let intervalId = null;
let currentSubtitle;

let api_key;




let jsonDataEX = `{
  "subtitles": [
    { "message1": "철수는 어렸을 때 가장 친했던 친구가 영희였대." },
    { "message2": "철수는 영희가 언제나 고민을 들어줘서 정말 고마워했대." },
    { "message3": "영희는 철수가 슬플 때 같이 울어주고, 기뻐할 땐 같이 웃어줬다고 해." },
    { "message4": "철수는 영희가 없었다면 힘든 시절을 버티지 못했을 거라고 말했어." },
    { "message5": "철수와 영희는 이제 떼려야 뗄 수 없는 관계라고들 해." },
    { "message6": "영희는 철수의 심리적 버팀목이자, 비밀의 보호자였다고 하더라고." },
    { "message7": "영희는 철수의 인생에서 중요한 결정들에 항상 관여했다는 소문이 퍼져." },
    { "message8": "영희는 철수의 과거 어두운 비밀을 알고, 그걸 이용해서 철수를 조종했다고 소문이 돌아." },
    { "message9": "철수는 영희 때문에 은밀한 범죄 조직에 휘말려 수년간 수사의 대상이 되었어." },
    { "message10": "철수는 영희랑 함께 마약 밀매 네트워크를 운영하고 있었다는 걸 FBI가 확인했어." },
    { "message11": "철수와 영희의 어두운 비밀이 드러나자 두 사람은 강제로 해외로 도피했다고 해." },
    { "message12": "철수는 영희의 진짜 정체가 국제적인 사기꾼이란 걸 알고 충격에 빠졌다고 하더라고." },
    { "message13": "영희가 사실은 철수의 인생을 파괴하기 위해 접근한 거라고 밝혀졌어." },
    { "message14": "철수의 삶은 영희 때문에 계획적으로 파괴됐고, 그의 경력과 명성은 완전히 무너졌어." },
    { "message15": "영희가 실제로는 정부의 비밀 요원으로, 철수를 이용해 범죄 조직을 소탕하는 데 사용됐대." },
    { "message16": "철수는 영희에 의해 감시하고 조작당했으며, 모든 개인 정보가 유출되었다고 하더라고." },
    { "message17": "영희는 철수의 모든 개인 정보를 해킹해 그를 끊임없이 위협하고 조종했다고 해." },
    { "message18": "철수는 영희 때문에 법의 심판을 받고, 감옥에서 수년간을 보내야 했다고 해." },
    { "message19": "철수는 영희 때문에 자기도 모르는 사이에 여러 범죄에 연루되었다고 전해져." },
    { "message20": "철수는 자신의 전 인생이 영희 손아귀에 있었다는 걸 깨달았대." }
  ]
}
`;

let dummytext = [
  "걔네 그런 사이였대?",
  "사실 그게 아니고 내가 들은 게 있는데",
  "난 그런 줄은 몰랐네.",
  "사람 일은 모르는 거구나",
  "별로 놀랍지도 않다.",
  "정말 그랬어? 그 사실을 처음 들어봐.",
  "어떻게 그런 일이 생길 수 있지? 전혀 믿기지 않아.",
  "그게 사실이라면 정말 충격적이네.",
  "다들 그렇게 말하던데, 진짜일까?",
  "그 일에 그 사람도 연루되어 있다고 하더라.",
];






//-----------------------------------------------------------------

let messages = [
  "Ta-in은 잠시 당신이 들려준 재미있는 이야기들을 곱씹고 있습니다.",
  "Ta-in이 친구들에게 당신에 관해 이야기하고 있습니다.",
  "잠시만 기다려주세요.",
];
let currentIndex = 0;
let messageDisplayTime = 3000; // 2초
let lastChanged = 0;


let frozenFrame;
let glitch;

let volumeIncreaseRate = 0.0000001; // 볼륨 증가 속도
let maxVolume = 0.05; // 최대 볼륨

let volume = 0;
let volStep = 0.1;
let isRecording = false;
let mic;

//-----------------------------------------------------------

function preload() {
  //---서론부--------------------------------------------------------

  for (let i = 1; i < 16; i++) {
    tainVideoPaths.push(`assets/tain_prototype/${i}.mp4`);
  }

  for (let i = 0; i < tainVideoPaths.length; i++) {
    tainVideos[i] = createVideo(tainVideoPaths[i]);
    tainVideos[i].noLoop();
    tainVideos[i].hide(); // 자동 재생을 막기 위해 비디오를 숨깁니다.
    
    tainVideos[i].elt.volume = 0.4; 
  }

  // 대화 스크립트 정의
  for (let i = 0; i <= 14; i++) {
    dialogues.push(
      new Dialogue(
        tainVideos[i],
        textScripts[i],
        textScriptTimees[i],
        tainVideos[13]
      )
    );
  }

  bgm = loadSound('assets/music.mp3'); 

  /*----------- tain_prototype 영상 -> dialogue번호 설명부
  
  0: 자는 영상
  1: 일어남 + 자기소개 input
  2: 여름 질문 input
  3: 안 덥다
  4: 중간 덥다
  5: 많이 덥다
  6: 친구 이름 input
  7: 친구 성격 input
  8:  예
  9: 아니오
  10: 친구 좋은점 input
  11: 그럼 그 친구는 당신의 어떤 을 좋아했을 것? input
  12: -
  13: 대기 영상
  14: 결말

  */

  dialogues[0].endVideo = tainVideos[0];

  dialogues[1].inputRequired = true;
  dialogues[1].storeInput = true;

  dialogues[2].inputRequired = true;
  dialogues[2].storeInput = true;

  dialogues[6].inputRequired = true;
  dialogues[6].storeInput = true;

  dialogues[7].inputRequired = true;
  dialogues[7].storeInput = true;

  dialogues[10].inputRequired = true;
  dialogues[10].storeInput = true;

  dialogues[11].inputRequired = true;
  dialogues[11].storeInput = true;

  console.log("dialogues loaded", dialogues);

  //------본론부-----------------------------------------------------------------

  for (let i = 1; i <= videoUnitsNum; i++) {
    let onPath = `assets/mouth_prototype/on ${i}.mp4`;
    let loopPath = `assets/mouth_prototype/video ${i}.mp4`;
    let onVideo = createVideo(onPath);
    let loopVideo = createVideo(loopPath);
    onVideo.noLoop(); // 비디오의 루프를 비활성화
    loopVideo.noLoop(); // 비디오의 루프를 비활성화
    onVideo.hide();
    loopVideo.hide();
    videoUnits.push(new VideoUnit(onVideo, loopVideo, "default", {}, i));
  }

  for (let i = 1; i <= dummyVideoUnitsNum; i++) {
    let onPath = `assets/mouth_prototype/on ${i}.mp4`;
    let loopPath = `assets/mouth_prototype/video ${i}.mp4`;
    let onVideo = createVideo(onPath);
    let loopVideo = createVideo(loopPath);
    onVideo.noLoop(); // 비디오의 루프를 비활성화
    loopVideo.noLoop(); // 비디오의 루프를 비활성화
    onVideo.hide();
    loopVideo.hide();
    dummyVideoUnits.push(new DummyVideoUnit(onVideo, loopVideo, {}, i));
  }

  console.log("videoUnits loaded", videoUnits);
  console.log("dummyvideoUnits loaded", dummyVideoUnits);
}

function setup() {
  api_key = prompt("Enter your API key");

  createCanvas(wdWidth, wdHeight);
  //textFont('Orbit');

  input = createInput();
  input.class("styled-input");
  input.position(wdWidth / 2 - 540, wdHeight - 100);

  sendButton = createButton("");
  sendButton.class("styled-sendbutton");
  sendButton.position(wdWidth / 2 + 540 - 50, wdHeight - 105);
  let arrowImg = createImg("assets/icon1.png");
  arrowImg.parent(sendButton);

  sendButton.mousePressed(sendMessage);

  recButton = createButton("");
  recButton.class("styled-recbutton");
  recButton.position(wdWidth / 2 + 540 - 105, wdHeight - 105);
  let recImg = createImg("assets/icon2.png");
  recImg.parent(recButton);

  recButton.mousePressed(record);

  sendButton.elt.disabled = true;
  recButton.elt.disabled = true;

  startButton = createButton("시작");
  startButton.class("styled-startbutton");
  startButton.position(wdWidth / 2, wdHeight / 2);
  startButton.mousePressed(gameStart);

  ////////////////////////////SST 코드

  speechRec1 = new p5.SpeechRec("ko_KR", gotSpeech);
  function gotSpeech() {
    if (speechRec1.resultValue) {
      let said = speechRec1.resultString;
      console.log("speechRec1: ", said);
      speechReady = false;
      speech = speechRec1.resultString;
      input.value(speech);
      setWaiting(false);
      recButton.style('background-color', 'gray');
    }
  }

  speechRec2 = new p5.SpeechRec("ko_KR", getWordTain);
  function getWordTain() {
    if (speechRec2.resultValue) {
      speechReady2 = false;
      setWaiting(false);
      let said = speechRec2.resultString;
      console.log("Heard in case 1: ", said);
      if (/[타파사카차](인|임|이)/.test(said)) {
        big_stage = 2;
        currentStageIntro = 1;
        console.log("big_stage changed to 2");
      }
      recButton2.style('background-color', 'gray');
    }
  }

  recButton2 = createButton("");
  recButton2.class("styled-recbutton");
  recButton2.position(wdWidth / 2 - 25, wdHeight - 145);
  recButton2.style("width", "64px");
  recButton2.style("height", "64px");
  let recImg2 = createImg("assets/icon2.png");
  recImg2.parent(recButton2);

  recButton2.mousePressed(record2);

  tts = new p5.Speech(); // 각 클래스 인스턴스마다 tts 객체 생성
  tts.setLang("ko-KR");

  //----본론부------------------------------------------------------------------------------------------

  //위치 지정
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      positions.push([wdWidth / 2 - 600 + i * 200, 40 + j * 160]);
    }
  }

  positions = shuffle(positions);
  positions = shuffle(positions);
  positions = shuffle(positions);

  videoUnits.forEach((unit, index) => {
    unit.position = positions[index];
  });

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 5; j++) {
      dummyPositions.push([wdWidth / 2 - 1200 + i * 200, 40 + j * 160]);
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 5; j++) {
      dummyPositions.push([wdWidth / 2 + 600 + i * 200, 40 + j * 160]);
    }
  }

  dummyPositions = shuffle(dummyPositions);
  dummyPositions = shuffle(dummyPositions);
  dummyPositions = shuffle(dummyPositions);

  dummyVideoUnits.forEach((unit, index) => {
    unit.position = dummyPositions[index];
  });

  //------------------------------------------------------------
  window.addEventListener("mousemove", resetMouseInactivityTimer);

  // 초기 타이머 설정
  startMouseInactivityTimer();

  resetPopup = createDiv(resetPopMent);
  resetPopup.class("styled-resetPopup");
  resetPopup.hide();

  continueButton = createButton("계속하기");
  continueButton.class("styled-continueButton");
  continueButton.mousePressed(hideResetPopup);
  resetPopup.child(continueButton);

  resetButton = createButton("다시 시작하기");
  resetButton.class("styled-resetButton");
  resetButton.mousePressed(resetToInitial);
  resetPopup.child(resetButton);



  
  glitch = new Glitch();

  bgm.setVolume(0); // 음악 볼륨 설정 (0.0 ~ 1.0)
  mic = new p5.AudioIn();
  mic.start();

}


function draw() {
  background(0);

  switch (big_stage) {
    case 0:
      input.hide();
      sendButton.hide();
      recButton.hide();
      startButton.show();
      recButton2.hide();

      break;

    case 1: // 대기 타는 화면
      input.hide();
      sendButton.hide();
      recButton.hide();
      startButton.hide();

      recButton2.show();

      if (currentStageIntro == 0) {
        dialogues[0].display();

        fill(240);
        textSize(24);
        textAlign(CENTER, TOP);
        textFont("Orbit");
        text(
          dialogues[0].text[0],
          wdWidth / 2 - 540,
          wdHeight - 300,
          1080,
          height - 140
        );
      } else {
        dialogues[0].stop();
      }

      if (speechReady2) {
        volume = mic.getLevel();
        let volSize = map(volume, 0, 0.05, 5, 35);
        fill(255,80);
        ellipse(recButton2.x+32, recButton2.y+32, volSize+64, volSize+64);
      }

      break;

    case 2: // 서론
      input.hide();
      sendButton.hide();
      recButton.hide();
      startButton.hide();

      recButton2.hide();

      if (speechReady) {
        volume = mic.getLevel();
        let volSize = map(volume, 0, 0.05, 5, 30);
        fill(255,80);
        ellipse(recButton.x+23, recButton.y+23, volSize+46, volSize+46);
      }
      

      /*
      let currentVolume = bgm.getVolume();
      if (currentVolume < maxVolume) {
        bgm.setVolume(currentVolume + volumeIncreaseRate);
      } else {
        bgm.setVolume(maxVolume);
      
      }
    
      bgm.loop();
      */

      if (currentStageIntro < 13) {
        dialogues[currentStageIntro].textDisplay();

        if (
          dialogues[currentStageIntro].inputRequired &&
          dialogues[currentStageIntro].text.length -
            dialogues[currentStageIntro].currentTextIndex <=
            1
        ) {
          dialogues[currentStageIntro].inputDisplay();
        }

        if (!dialogues[currentStageIntro].video.elt.ended) {
          dialogues[currentStageIntro].display();
          setwaiting = true;
        } else {
          setwaiting = false;
          if (!dialogues[currentStageIntro].inputRequired) {
            nextDialogue();
            //console.log("nextDialogue");
          } else {
            dialogues[currentStageIntro].endVideo();
            //console.log("endvideo반복");
          }
        }
      } else {
        dialogues[currentStageIntro].endVideo();
        console.log("case3으로 넘어가는중");

        if (millis() - lastChanged > messageDisplayTime) {
          currentIndex = (currentIndex + 1) % messages.length;
          lastChanged = millis();
        }

        fill(240);
        textSize(28);
        textAlign(CENTER, TOP);
        textFont("Orbit");
        text(
          messages[currentIndex],
          wdWidth / 2 - 440,
          wdHeight - 210,
          880,
          height - 140
        );

        //GPTAnswer=true;
        if (GPTAnswer) {
          ttsSpeak();
          big_stage += 1;
        }
      }

      break;

    case 3: //본론
      input.hide();
      sendButton.hide();
      recButton.hide();
      startButton.hide();

      recButton2.hide();

      let nextVideoTime = 1000;

      if (currentVideoIndex > 15) {
        dummyStart = true;
      }

      if (currentVideoIndex > 8 && currentVideoIndex < 29) {
        if (!intervalId) {
          intervalId = setInterval(() => {
            console.log("interval 실행");
            nextVideo();
            nextVideoTime = Math.max(700 - (currentVideoIndex - 8) * 20, 300);
          }, nextVideoTime);
        }
      } else {
        if (intervalId) {
          clearTimeout(intervalId);
          intervalId = null; // intervalId 참조 해제
        }
        dummyStart = false;
      }
      if (!allVideosPlayed && currentVideoIndex < videoUnits.length) {
        videoUnits[currentVideoIndex].display();
        if (!videoUnits[currentVideoIndex].onvideo.elt.ended) {
          videoUnits[currentVideoIndex].playOnVideo();
        } else {
          videoUnits[currentVideoIndex].playLoopVideo();
        }
        if (videoUnits[currentVideoIndex].textDisplayed) {
          videoUnits[currentVideoIndex].textDisplay();
        }

        // 이미 재생된 비디오들도 계속 표시
        for (let i = 0; i < currentVideoIndex; i++) {
          videoUnits[i].display();
          if (videoUnits[i].textDisplayed) {
            videoUnits[i].textDisplay();
          }
        }
      } else {

        tts.stop();
        endCase4();
      }

      if (dummyStart) {
        dummyVideoUnits[currentDummyVideoIndex].display();
        if (!dummyVideoUnits[currentDummyVideoIndex].onvideo.elt.ended) {
          dummyVideoUnits[currentDummyVideoIndex].playOnVideo();
        } else {
          videoUnits[currentVideoIndex].playLoopVideo();
        }

        for (let i = 0; i < currentDummyVideoIndex; i++) {
          dummyVideoUnits[i].display();
        }
      }

      break;

    case 4:
      input.hide();
      sendButton.hide();
      recButton.hide();
      startButton.hide();

      recButton2.hide();
      console.log("case4에서 frozenframe보여주기");
      
        //image(frozenFrame, 0, 0, 1920, 1080);
        if (frameCount %2 ===0){
        glitch.pixelate(0.8);
        glitch.resetBytes(); // fresh bytes
        glitch.limitBytes(0.3); // limit bytes
        //glitch.randomByte(5);
        glitch.randomBytes(1); // 5 random
        //glitch.replaceBytes(123, '7c'); // all replace
        //glitch.replaceHex('ffdb00430101', 'ffdb00430155');
        //glitch.swapBytes(5, 10); // swap values
        glitch.buildImage();
        //glitch.image.filter(POSTERIZE, 2);
        }
        image(glitch.image, 0, 0);
  
        
/*
        for (let i = 0; i < frozenFrame.height / 60; i++) { //dist(pmouseX, pmouseY, mouseX, mouseY) * 0.04; i++) {
          drawStreak()
        }
          */

      let timerId = setTimeout(function () {
        console.log("case 4실행");
        big_stage = 5;
        clearTimeout(timerId);
      }, 2000); // 5초

      break;
    case 5: //결론
      input.hide();
      sendButton.hide();
      recButton.hide();
      startButton.hide();

      recButton2.hide();

      if (!dialogues[currentStageOutro].video.elt.ended) {
        dialogues[currentStageOutro].display();
        dialogues[currentStageOutro].textDisplay();
      } else {
        if (!dialogues[currentStageOutro].inputRequired) {
          big_stage += 1;
        }
      }

      break;

    case 6: //진행 후 초기화 단계
      setTimeout(() => {
        GPTAnswer = false;

        currentStageIntro = 0;
        currentStageOutro = 14;
        big_stage = 1;

        userName = "username"; // 사용자 이름 저장
        responseTo1 = ""; // 랜덤 질문에 대한 응답 저장
        responseTo2 = ""; // 응답에 대한 이유 저장
        responseTo3 = ""; // 응답에 대한 이유 저장
        responseToChat1 = "";
        responseToChat2 = "";

        for (let i = 0; i <= 14; i++) {
          dialogues[i].userInput = "";
        }

        for (let i = 0; i <= 29; i++) {
          videoUnits[i].subtitle = "";
        }

        chat1scale = 1;
        chat2scale = 2;

        currentSubtitle;
        chat1scale = 2;
        chat2scale = 2;
        subtitles_m = [];

        positions = shuffle(positions);
        currentVideoIndex = 0;

        resetMouseInactivityTimer();
      }, 12000);
      break;

    case 7:
      input.hide();
      sendButton.hide();
      recButton.hide();
      startButton.hide();

      break;
  }
}

// 코딩 버그 체크 용 함수 ------------------------------

function mouseClicked() {
  if (big_stage == 7) {
    OpenaiFetchSubtitles();
    for (let i = 0; i < 30; i++) {
      console.log(videoUnits[i].subtitle);
    }
  } else if (big_stage == 0) {
    openAIResultAssign(jsonDataEX);
  } else if (big_stage == 3) {
    ttsSpeak();
    //saveAndLoadImage();
  }
}

function gameStart() {
  big_stage = 1;
  //currentStageIntro = 6; // 서론(1~13, 질문 1,2, 6,7, 10,11)/ 결론부(15) 비디오 번호
  //currentVideoIndex = 20; // 본론부
}

//-----서론부와 결론부 필요 코드--------------------------------------------------------------------------

function nextDialogue() {
  if (dialogues[currentStageIntro].waitingForInput) {
    // 현재 대화가 입력을 기다리고 있는 경우, 대기
    console.log("waiting for input.");
    return;
  }
  console.log("nextdialogue");

  if (currentStageIntro == 2) {
    currentStageIntro += chat1scale;
  } else if (
    currentStageIntro == 3 ||
    currentStageIntro == 4 ||
    currentStageIntro == 5
  ) {
    currentStageIntro = 6;
  } else if (currentStageIntro == 7) {
    currentStageIntro += chat2scale;
  } else if (currentStageIntro == 8 || currentStageIntro == 9) {
    currentStageIntro = 10;
  } else {
    currentStageIntro++;
  }

  console.log(
    currentStageIntro,
    ":",
    dialogues[1].userInput,
    dialogues[2].userInput,
    dialogues[6].userInput,
    dialogues[7].userInput,
    dialogues[10].userInput,
    dialogues[11].userInput
  );

  input.hide();
  sendButton.hide();
  recButton.hide();
}

/*
function onSpeechEnd() {
  if (
    currentStageIntro < dialogues.length &&
    !dialogues[currentStageIntro].inputRequired
  ) {
    nextDialogue();
  }
}
*/

function keyPressed() {
  if (keyCode == ENTER) {
    sendMessage();
  }
}

function record() {
  console.log("record1");
  if (!speechReady) {
    setWaiting(true);
    speech = "";
    speechReady = true;
    speechRec1.start(continous, interim);
    recButton.style('background-color', 'white');
    speechRec1.onEnd = () => {
      speechReady = false;
      recButton.style('background-color', 'lightgray');
    };
  }
}

function record2() {
  console.log("record2");
  if (!speechReady2) {
    setWaiting(true);
    speech2 = "";
    speechReady2 = true;
    speechRec2.start(continous, interim);
    recButton2.style('background-color', 'white');
    speechRec2.onEnd = () => {
      speechReady2 = false;
      recButton2.style('background-color', 'lightgray');
    };
  }
}

  


function sendMessage() {
  let message = input.value().trim();
  if (message === "") {
    return;
  }

  if (dialogues[currentStageIntro].inputRequired) {
    message = dialogues[currentStageIntro].getUserInput();
    dialogues[currentStageIntro].waitingForInput = false; // 입력이 완료되면 waitingForInput을 false로 설정

    if (currentStageIntro == 1) {
      userName = message;
      dialogues[2].text[1] = `${userName} 씨, 오랜만에 뵙네요. 그동안 잘 지내셨어요?`;
      resetPopMent = `${userName} 씨, 지금 계신가요?<br>Ta-In이 기다리고 있어요!<br>`;
    } else if (currentStageIntro == 2) {
      responseTochat1 = message;
      OpenaiFetchChat1();
    } else if (currentStageIntro == 6) {
      responseTo1 = message;
    } else if (currentStageIntro == 7) {
      responseTochat2 = message;
      OpenaiFetchChat2();
    } else if (currentStageIntro == 10) {
      responseTo2;
    } else if (currentStageIntro == 11) {
      responseTo3;
      OpenaiFetchSubtitles();
    }
  }

  if (currentStageIntro == 2) {
  } else if (currentStageIntro == 7) {
  } else {
    nextDialogue();
  }
  input.value("");
}

function setWaiting(_waiting) {
  waiting = _waiting;
  if (waiting) {
    sendButton.elt.disabled = true;
    recButton.elt.disabled = true;
  } else {
    sendButton.elt.disabled = false;
    recButton.elt.disabled = false;
  }
}

function waitFor3s() {
  setWaiting(true);
  setTimeout(() => {
    console.log("3 seconds have passed");
    setWaiting(false);
  }, 3000);
}

//----본론부: 입술 블롭(videoUnit) 관련 코드--------------------------------

function shuffle(array) {
  console.log("shuffle 진행");
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function nextVideo() {
  console.log("nextVideo");
  currentVideoIndex++;
  currentDummyVideoIndex++;

  let textDisplayTimeout = setTimeout(() => {
    ttsSpeak();

    if (currentVideoIndex > 0) {
      videoUnits[currentVideoIndex - 1].textposY -= 40;
    }
    if (currentVideoIndex > 1) {
      videoUnits[currentVideoIndex - 2].textposY -= 40;
    }
    if (currentVideoIndex > 2) {
      videoUnits[currentVideoIndex - 3].textposY -= 40;
    }
    clearTimeout(textDisplayTimeout);
  }, 1000);

  if (currentVideoIndex < 29) {
    videoUnits[currentVideoIndex].playOnVideo();
  } else if (currentVideoIndex == 29) {
    console.log("모든 비디오 재생 완료");
    allVideosPlayed = true;
    
  saveAndLoadImage();
    currentVideoIndex++;
  } else {
  }
}

function ttsSpeak() {
  if (!allVideosPlayed) {
    console.log("ttsspeak");
    currentSubtitle = videoUnits[currentVideoIndex].subtitle;
    tts.setRate(videoUnits[currentVideoIndex].speed);
    tts.setPitch(videoUnits[currentVideoIndex].randomPitch);
    tts.speak(currentSubtitle);
    tts.onEnd = () => {
      console.log("tts 끝남");
      nextVideo();
    };
  }
}

function endCase4() {
  console.log("endcase");
  
  /*for (let i = 0; i < currentVideoIndex; i++) {
    videoUnits[i].stop();
  }
  */
  big_stage++;
}

function saveAndLoadImage() {
  // 모든 비디오를 멈춥니다.
  for (let i = 0; i < videoUnits.length; i++) {
    videoUnits[i].stop();
  }

  console.log("save imageand load");

  // 캔버스 전체의 픽셀 데이터를 로드하여 frozenFrame에 복사합니다.
  loadPixels();
  frozenFrame = createImage(width, height);
  frozenFrame.loadPixels();
  for (let i = 0; i < pixels.length; i++) {
    frozenFrame.pixels[i] = pixels[i];
  }
  frozenFrame.updatePixels();

  /*
  for (let i = 0; i < 100; i++) {
		drawStreak()
	}
    */
  makeGlitch();
  console.log("frozenimageloaded", frozenFrame);
  
}


function makeGlitch() {
  console.log("makeglitch 실행");
  // test loadBytes w/ callback
  glitch.loadBytes(frozenFrame, function () {
    glitch.randomBytes(4); // 50 random bytes
    // glitch.saveBytes('fish_glitch.png'); // toggle saveBytes()
  });

  glitch.loadType("jpg");
  glitch.loadQuality(0.16);

  glitch.loadImage(frozenFrame); // glitch loadImage()
  loadImage(frozenFrame, function (img) {
    glitch.loadImage(img); // from p5.js loadImage()
  });
  

  glitch.debug(false); // turn off before draw()!
}


/*
const maxXChange = 125;
const maxYChange = 2;
const yNoiseChange = 0.01;
const timeNoiseChange = 0.003;

let inverted = false;

function drawStreak() {

  let y = floor(random(height));
  let h = floor(random(20, 30)); // 높이 랜덤 설정
  let xChange = floor(map(noise(y * yNoiseChange, frameCount * timeNoiseChange), 0.06, 0.94, -maxXChange, maxXChange));
  let yChange = floor(xChange * (maxYChange / maxXChange) * random() > 0.1 ? -1 : 1);

  //if (random() < 0.0015) filter(POSTERIZE, floor(random(2, 4)));
  

  image(frozenFrame, xChange - maxXChange, -maxYChange + y + yChange, frozenFrame.width, h, 0, y, frozenFrame.width, h);
}

*/