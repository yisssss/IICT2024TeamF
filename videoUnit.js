class VideoUnit {
  constructor(onvideo, loopvideo, subtitle, position, index) {
    this.onvideo = onvideo;
    this.loopvideo = loopvideo;
    this.subtitle = subtitle;
    this.position = position;
    this.spoken = false;
    this.textDisplayed = false;
    this.index = index;

    this.a = 1; // 이 값은 1부터 3까지의 범위를 갖도록 조정
    this.b = 1.5; // 이 값은 적절한 속도 증가를 위해 조정
    this.speed = 1 + this.a * Math.log(1 + this.b * this.index);

    this.time = (3000 / 2) ^ this.index;

    if (this.time < 250) {
      this.time = 250;
    }

    this.randomPitch = random(0, 2);
    /*
    this.tts = new p5.Speech(); // 각 클래스 인스턴스마다 tts 객체 생성
    this.tts.setLang("ko-KR");
*/
    this.onvideo.onended(() => {
      this.playLoopVideo();
    });

    this.textposY = 0;

    this.frozenFrame ="";
  }

  display() {
    //console.log(`videoUnits[${this.index}] display 작동`);
    if (this.onvideo && this.onvideo.elt && this.onvideo.elt.readyState >= 2) {
      image(
        this.onvideo,
        this.position[0] + 10,
        this.position[1] + 10,
        200 - 20,
        160 - 20
      );
    }

    if (
      this.loopvideo &&
      this.loopvideo.elt &&
      this.loopvideo.elt.readyState >= 2
    ) {
      image(
        this.loopvideo,
        this.position[0] + 10,
        this.position[1] + 10,
        200 - 20,
        160 - 20
      );
    }
  }

  textDisplay() {
    fill(0);
    rect(width / 2 - 800, height - 110 + this.textposY, 1600, 30);

    fill(240);

    if (this.textposY <= -40) {
      fill(160);
    } else if (this.textposY <= -120) {
      //this.subtitle = "";
    }

    textSize(28);
    textAlign(CENTER, TOP);
    textFont("Orbit");
    text(
      this.subtitle,
      width / 2 - 800,
      height - 110 + this.textposY,
      1600,
      60
    );
    fill(0);
    rect(width / 2 - 800, height - 110 - 120 - 30, 1600, 30 - 30);
  }

  playOnVideo() {
    //console.log(`videoUnit[${this.index}] playOnVideo 작동`);
    if (this.onvideo.elt.paused) {
      this.onvideo.play();
    }

    this.textDisplayed = true;
    clearTimeout(textDisplayTimeout);
 

    /*
    setTimeout(() => {
      this.textDisplayed = false;
    }, 7000);
    */
  }

  playLoopVideo() {
    //console.log(`videoUnits[${this.index}] playLoopVideo 작동`);
    this.onvideo.pause(); // onvideo를 일시 정지
    //console.log("onvideo 멈추기");
    if (this.loopvideo.elt.paused) {
      //console.log("loopvideo 재생하기");
      //this.loopvideo.play();
      this.loopvideo.loop();
    }
  }

  stop() {
    console.log(this.index, "멈춤");
    this.onvideo.pause();
    this.loopvideo.pause();
  }

}
