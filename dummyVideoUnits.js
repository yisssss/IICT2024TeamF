

class DummyVideoUnit {
    constructor(onvideo, loopvideo, position, index) {
      this.onvideo = onvideo;
      this.loopvideo = loopvideo;
      this.position = position;
      this.index = index;

      this.onvideo.onended(() => {
        this.playLoopVideo();
      });
    }
  
    display() {
      console.log(`dummyvideoUnits[${this.index}] display 작동`);
      if (this.onvideo && this.onvideo.elt && this.onvideo.elt.readyState >= 2) {
        image(
          this.onvideo,
          this.position[0] + 10,
          this.position[1] + 10,
          200 - 20,
          160 - 20
        );
      }
  
    }
  
    playOnVideo() {
      if (this.onvideo.elt.paused) {
        this.onvideo.play();
      }
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
      this.onvideo.pause();
      fill(0);
      rect(0,0, wdWidth, wdHeight);
    }
      
  }
  