let chat1scale = 1;
let chat2scale = 2;
let userName = "";
let friendName = "";
let haveFriend = false;

function OpenaiFetchChat1() {
  setWaiting(true);

  console.log("Calling GPT3(OpenaiFetchChat1)");
  let url = "https://api.openai.com/v1/chat/completions";

  let bearer = "Bearer " + api_key;

  let userPromt = `
-Audience: 안녕, 나는 간단한 대화형 봇을 구현하는 과제를 하고 있는 대학생이야.

-Role & Task: 너는 이제부터 ‘문장을 판독하는 객관적인 기계’ 역할을 맡게 될 거야. 구체적으로, 내가 아래에 너에게 전달할 입력 내용은 대화형 봇의 user가 ‘오늘은 얼마나 덥나요?’라는 질문에 대해 답변한 내용인데, 해당 답변을 보고 1) 많이 더움 2) 보통 더움 3) 별로 안 더움 이 3가지 scale 중 어디에 해당하는 지 판단해주면 돼. 

-Policy (= ground rule):
Task를 수행할 때 다음의 조건을 지켜줘.
- 덥다’라는 느낌을 0부터 100까지 점수화한다고 했을 때, scale 판단 시 아래를 참고할 것.
    -‘덥다’의 수준이 0점 이상~30점 미만일 경우: ‘별로 안 더움’
    -‘덥다’의 수준이 31점 이상~70점 미만일 경우: ‘보통 더움’
    -‘덥다’의 수준이 71점 이상~100점 이하일 경우: ‘많이 더움’
- "별로 안 더움" 3, "보통 더움"= 2, "많이 더움"= 1으로 작성한다. scale은 3,2,1, 중 하나의 숫자로 기입해.
- 판단 결과를 출력할 때, 자질구레한 말들은 생략하고 판단 결과만을 출력해주기.

-Input: 
‘오늘은 얼마나 덥나요?’에 대한 user의 답변은 아래와 같다.
"${responseTodialogue4}";

- Task: 
해당 사용자의 답변을 판독하여 ‘덥다’의 정도를 위의 3가지 scale 중 어디에 해당하는 지 판단하여 숫자로 나타내라.
답변은 다른 말을 덧붙이지 않고 다음과 같은 JSON 형식으로만 뽑는다.

{ "scale": (int) }
  `;

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.1,

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

      //scale을 뽑아 보는 법
      try {
        let responseContent = data.choices[0].message.content;
        let scaleObject = JSON.parse(responseContent);
        chat1scale = int(scaleObject.scale);
        console.log("Extracted scale:", chat1scale);
        GPTChatanswer();
      } catch (e) {
        console.error("Error extracting scale:", e);
      }
      setWaiting(false);
    })
    .catch((error) => {
      console.log("Something bad happened " + error);
    });
}

function OpenaiFetchChat2() {
  setWaiting(true);

  console.log("Calling GPT3");
  let url = "https://api.openai.com/v1/chat/completions";

  let bearer = "Bearer " + api_key;

  let userPromt = `
    -Audience: 안녕, 나는 간단한 대화형 봇을 구현하는 과제를 하고 있는 대학생이야.

-Role & Task: 너는 이제부터 ‘문장을 판독하는 객관적인 기계’ 역할을 맡게 될 거야. 구체적으로, 내가 아래에 너에게 전달할 입력 내용은 대화형 봇의 user가 ‘당신의 친구는 당신과 비슷한 성격이었나요?’라는 질문에 대해 답변한 내용인데, 해당 답변을 보고 1) 긍정 2) 부정 이 2가지 중 어느 것에 해당되는 지를 판단해주면 돼.

-Policy (= ground rule):
Task를 수행할 때 다음의 조건을 지켜줘.
- user의 답변을 바탕으로 ‘성격이 비슷함’의 정도를 퍼센트(%)로 나타낸다고 하였을 때, 
-’성격의 비슷함’의 정도가 0%~40%로 판단될 경우: “부정”으로 출력
 -’성격의 비슷함’의 정도가 41%~100%로 판단될 경우: “긍정”으로 출력
- "부정"= 2, "긍정"= 1 으로 작성. scale은 숫자로 기입해.
- 판단 결과를 출력할 때, 자질구레한 말들은 생략하고 판단 결과만을 출력해주기.


-Format: 

‘당신의 친구는 당신과 비슷한 성격인가요?’에 대한 user의 답변은 "${responseTodialogue14}"와 같다.
해당 답변을 판독하여 ‘긍정’인지 ‘부정’인지 판단하여 숫자로 나타내라.  
답변은 다음과 같이 JSON 형식으로 뽑는다. 
{ "scale": (int) }

-Example:

다음은 입력과 출력에 대한 예시본이야. 

[입력 예시]
{“answer”: “친구랑 나랑 정말 죽마고우 같아.”}

[출력 예시]
{“scale”: 1}
  `;

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.1,
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

      try {
        let responseContent = data.choices[0].message.content;
        let scaleObject = JSON.parse(responseContent);
        chat2scale = int(scaleObject.scale);
        console.log("Extracted scale:", chat2scale);

        GPTChatanswer();
      } catch (e) {
        console.error("Error extracting scale:", e);
      }

      setWaiting(false);
    })
    .catch((error) => {
      console.log("Something bad happened " + error);
    });
}

function OpenaiFetchChatName1() {
  setWaiting(true);

  console.log("Calling GPT3");
  let url = "https://api.openai.com/v1/chat/completions";

  let bearer = "Bearer " + api_key;

  let userPromt = `
‘당신의 이름은 무엇인가요?’에 대한 user의 답변은 "${responseTodialogue2}"와 같다.
여기서 이름을 알려줘. 다른 말은 다 제외하고 이름만 다음과 같은 json형식으로 뽑는다.

  {"name": ""}
  `;

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.1,
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

      try {
        let responseContent = data.choices[0].message.content;
        let nameObject = JSON.parse(responseContent);
        userName = nameObject.name;

        console.log("Extracted scale:", nameObject);

        dialogues[3].text[1] = `${userName} 씨, 오랜만에 뵙네요. 그동안 잘 지내셨어요?`;
        resetPopMent = `${userName} 씨, 지금 계신가요?<br>Ta-In이 기다리고 있어요!<br>`;

        GPTChatanswer();
      } catch (e) {
        console.error("Error extracting scale:", e);
      }

      setWaiting(false);
    })
    .catch((error) => {
      console.log("Something bad happened " + error);
    });
}

function OpenaiFetchChatName2() {
  setWaiting(true);

  console.log("Calling GPT3");
  let url = "https://api.openai.com/v1/chat/completions";

  let bearer = "Bearer " + api_key;

  let userPromt = `

  -Audience: 안녕, 나는 사용자의 말을 분석하고자 하는 연구자이다.

-Role & Task: 그 과정에서 너는 제시된 질문에 대한 사용자의 말을 받아서, 내가 제시한 기준에 맞게 객관적으로 분석하는 기계의 역할을 수행한다. ‘어린 시절 당신과 가장 친했던 친구 이름은 무엇인가요?’에 대한 사용자의 답변을 받아 처리한다.

-Policy (=ground rule):
Task를 수행할 때 다음의 조건을 꼭 지켜줘.
1.	사용자의 태도에 따라 너의 출력 결과는 두가지 버전으로 나뉜다.
    a. 친구의 이름을 말했을 경우: {"name": ""}
    b. 친구가 없다고 했을 경우: "0"
2. 제시된 형식 외에 다른 문장이나 괄호문 등을 절대 덧붙이지 말 것. 

-----------
-Format: 

‘어린 시절 당신과 가장 친했던 친구 이름은 무엇인가요?’에 대한 user의 답변은 "${responseTodialogue8}"와 같다.
상단의 Poilicy에 제시한 답변의 형식대로 대답하라.

-----------
-Example:

다음은 입력과 출력에 대한 예시본 두가지 이다.

[입력 예시1]
user의 답변은 "그 친구 이름은 김길동이야."이다.

[출력 예시1]
{“name”: "김길동"}

---
[입력 예시2]
user의 답변은 "난 어릴 때 친구 없었어."이다.

[출력 예시2]
"0"

  `;

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.1,
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

      try {
        let responseContent = data.choices[0].message.content;
        console.log("Extracted scale:", responseContent);

        //
        if (responseContent == 0) {
          haveFriend = false;
        } else {
          haveFriend = true;
          let nameObject = JSON.parse(responseContent);
          friendName = nameObject.name;
        }

        GPTChatanswer();
      } catch (e) {
        console.error("Error extracting scale:", e);
      }

      setWaiting(false);
    })
    .catch((error) => {
      console.log("Something bad happened " + error);
    });
}

function GPTChatanswer() {
  console.log("gptchatanswer 실행");
  dialogues[currentStageIntro].waitingForInput = false;
  nextDialogue();
}
