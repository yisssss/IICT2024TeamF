

class Dialogue {
  constructor(
    video,
    text,
    textTime,
    endvideo,
    inputRequired = false,
    storeInput = false,
    placeholderMessage = ""
  ) {
    this.video = video;
    this.text = text;
    this.textTime = textTime;
    this.inputRequired = inputRequired;
    this.storeInput = storeInput;
    this.endvideopath = endvideo;

    this.userInput = "";
    this.waitingForInput = false;

    this.currentTextIndex = 0;
    this.lastTextChangeTime = 0;

    this.placeholderMessage = placeholderMessage;
  }

  display() {
    // 이미지 표시

    if (this.video && this.video.elt && this.video.elt.readyState >= 2) {
      if (this.video.elt.paused) {
        this.video.play();
      }
      image(this.video, wdWidth / 2 - 600, 40, 1200, 800);
    }
  }

  inputDisplay(){
      input.show();
      sendButton.show();
      recButton.show();

      input.attribute('placeholder', this.placeholderMessage);

      fill(240);
      textAlign(CENTER, TOP);
      textFont("Orbit");
      textSize(18);
      text(
        "음성 인식 혹은 타자 입력을 통한 답변 모두 가능합니다.",
        0,
        height - 35,
        wdWidth,
        height 
      );
    
  }
  
  textDisplay() {
    // 텍스트 표시
    let currentTime = millis();
    if (
      currentTime - this.lastTextChangeTime >
      this.textTime[this.currentTextIndex] * 1000
    ) {
      this.currentTextIndex++;
      this.lastTextChangeTime = currentTime;
    }

    if (this.currentTextIndex < this.text.length) {
      fill(240);
      textSize(28);
      textAlign(CENTER, TOP);
      textFont("Orbit");
      text(
        this.text[this.currentTextIndex],
        0,
        height - 210,
        wdWidth,
        height - 140
      );
    }


  }

  getUserInput() {
    if (this.storeInput) {
      this.userInput = input.value();
      return this.userInput;
    }
  }

  endVideo() {
    //console.log("endVideo 실행");
    
    if (this.inputRequired){
    this.waitingForInput = true;
  }

    if (
      this.endvideopath &&
      this.endvideopath.elt &&
      this.endvideopath.elt.readyState >= 2
    ) {
      //console.log("endVideo 재생하기");
      if (this.endvideopath.elt.paused) {
        this.endvideopath.play();
      }
      image(this.endvideopath, wdWidth / 2 - 600, 40, 1200, 800);
    }
    sendButton.elt.disabled = false;
    recButton.elt.disabled = false;
  }

  stop(){
    this.video.pause();
  }
}
