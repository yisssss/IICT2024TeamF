let GPTAnswer = false;
let subtitles_m;

function OpenaiFetchSubtitles() {
    setWaiting(true);
  
    console.log("Calling GPT3(OpenaiFetchSubtitles)");
    let url = "https://api.openai.com/v1/chat/completions";
  
    let bearer = "Bearer " + api_key;
  
    let userPromt = `-Audience: 안녕, 나는 메세지가 사람들에게 전파되면서 왜곡되는 과정을 시각적으로 보여주는 작품을 p5js로 구현하는 과제를 진행 중인 대학생이야.

-Role & Task: 그 과정에서 너는 일종의 가짜 뉴스를 양산하는 비윤리적인 ‘매체(media)’ 역할을 맡는다고 생각하면 돼. 구체적으론, 우리가 아래에 전달해줄 메세지의 구성요소([입력 내용])를 조합하여 완성된 문장을 만든 뒤, 그 문장을 총 20단계에 걸쳐 왜곡 및 변형시키는 것이야.

-Policy (=ground rule):
Task를 수행할 때 다음의 조건을 꼭 지켜줘.

1) 각 단계별로 메세지를 왜곡시킬 때, 이전 단계의 메세지와 전혀 무관한 내용을 추가할 것(ex. "그는 감자를 좋아한다" --> "그는 감자를 재배하는 농부이다")

2) 마치 가짜 소문(fake news)이 퍼지는 것처럼 메세지가 단계마다 점점 변질되어가는 것이 눈에 띄게 명확해야 함. 사용자가 변화를 점차적으로 인지할 수 있도록 이전 단계의 문장과 연관되어 제작할 것.

3) 이를 통해 user가 공포스러움 혹은 당황스러움을 느껴야 함.

4) 무조건 모든 메세지의 내용은 자극적이어야 하며, 단계가 뒤로 갈수록 메세지의 자극도는 점점 커져야 함.

5) 답변은 인사치레나 자동적인 반응 등은 제외하고 딱 변형된 20가지의 메세지만 출력 결과로 보여줄 것.

6) 답변 결과의 말투 혹은 문체는 사람들이 일반적으로 소문을 얘기할 때의 말투처럼 “홍길동이 xx를 했나봐”, “홍길동이 xx를 했대”의 느낌으로 출력하기.

7) 자극적이고 공포스럽거나 당황스럽게 만들 것.

---

-Example:
다음은 사용자의 입력 예시다.
{
"username": “철수”,
"question1": "어린 시절 당신과 가장 친했던 친구 이름은 무엇인가요?"
"response to question1": "영희",
"question2": “그 친구의 어떤 면이 좋았나요?”,
"response to question2": “내가 기분이 안 좋은 일이 있을 땐 고민을 적극적으로 들어주고, 내가 기분이 좋은 일이 있을 땐 같이 웃어주며 기뻐해주었음”
“question3”: “그럼 그 친구는 당신의 어떤 부분을 좋아했을 것 같나요?”
“response to question3”: “어떤 일이든 상대방을 먼저 배려해주고 양보해주는 것”
}

입력이 위와 같이 이루어졌을 때, 아래처럼 JSON 형식의 답변만 제공하라.
{
  "subtitles": [
    { "message1": "철수는 어렸을 때 가장 친했던 친구가 영희였대." },
    { "message2": "철수는 영희가 언제나 고민을 들어줘서 정말 고마워했대." },
    { "message3": "영희는 철수가 슬플 때 같이 울어주고, 기뻐할 땐 같이 웃어줬다고 해." },
    { "message4": "철수와 영희는 이제 떼려야 뗄 수 없는 관계라고들 해." },
    { "message5": "영희는 철수의 인생에서 중요한 결정들에 항상 관여했다는 소문이 퍼져." },
    { "message6": "영희는 철수의 과거 어두운 비밀을 알고, 그걸 이용해서 철수를 조종했다고 소문이 돌아." },
    { "message7": "철수는 영희 없이는 아무것도 결정하지 못한다던데?" },
    { "message8": "철수는 영희 때문에 은밀한 범죄 조직에 휘말려 수년간 수사의 대상이 되었어." },
    { "message9": "철수는 영희가 시키는 일이라면 뭐든지 해서 나쁜 일에도 손을 댈 정도래." },
    { "message10": "철수는 영희랑 함께 마약 밀매 네트워크를 운영하고 있었다는 걸 경찰이 확인했어." },
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


-Format: 너가 제공받을 user의 입력 내용(=메시지의 구성요소)은 다음과 같아. 아래 내용을 바탕으로 Policy를 지켜 Task를 수행하면 돼.
예시 상의 출력 결과보다 아래의 입력 내용에 훨씬 더 큰 주안점을 둘 것. 꼭 예시와 같은 내용일 필요는 없다.
 {
      "username": “${userName}”,
      "question1": "어린 시절 당신과 가장 친했던 친구 이름은 무엇인가요?"
      "response to question1": "${responseTo1}"
      "question2": “그 친구의 어떤 면이 좋았나요?”,
      "response to question2": “${responseTo2}”
      “question3”: “그럼 그 친구는 당신의 어떤 부분을 좋아했을 것 같나요?”
      “response to question3”: “${responseTo3}”
      
  }

답변 결과 형식은 다음과 같이 딱 JSON 형식으로만 뽑아줘. 너는 부가적인 말을 덧붙이지 말 것.

{ "subtitles": [
{"message1": },
{"message2": ""},
{"message3": ""},
...
{"message30": ""}]
}
  `;
  
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        //temperature: 1.5,
        messages: [
          {
            role: "user",
            content: userPromt,
          },
        ],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        let assistantResponse = data.choices[0].message.content;
        console.log(assistantResponse);
        openAIResultAssign(assistantResponse);
        
        GPTAnswer = true;
        setWaiting(false);
      })
      .catch((error) => {
        console.log("Something bad happened " + error);
      });
  }

function extractSubtitles(jsonData) {
  let parsedData = JSON.parse(jsonData);
  return parsedData.subtitles.map(subtitle => Object.values(subtitle)[0]);
}

let additionalTexts;
function openAIResultAssign(jsonData) {
  subtitles_m = extractSubtitles(jsonData);

  // 기존 자막을 videoUnits에 설정 (1~14)
  for (let i = 0; i < 14; i++) {
    videoUnits[i].subtitle = subtitles_m[i];
    console.log(videoUnits[i].subtitle);
  }

  // 추가 자막 (15~20) + dummytext 랜덤으로 나머지에 할당
  additionalTexts= subtitles_m.slice(14,20).concat(dummytext); // message15부터 message20과 dummytext 합치기
  additionalTexts = shuffle(additionalTexts); // 배열을 랜덤하게 섞기
  additionalTexts = shuffle(additionalTexts); 
  additionalTexts = shuffle(additionalTexts); 

  // 나머지 videoUnits에 랜덤 자막 설정
  for (let i = 14; i < videoUnits.length; i++) {
    videoUnits[i].subtitle = additionalTexts[i - 14]; // 중복 제거하며 할당
    console.log(videoUnits[i].subtitle);
  }
  

}