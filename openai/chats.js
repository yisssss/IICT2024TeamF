let chat1scale = 1;
let chat2scale = 2;
let userName = "";
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
 -그 외에 user의 답변이 “잘 기억 나지 않는다”, “잘 모르겠다” 등과 같이 ‘성격의 비슷함’의 정도를 나타내지 않는 경우: “판단 불가”로 출력
- "부정"= 2, "긍정"= 1, "판단 불가"=3 으로 작성. scale은 숫자로 기입해.
- 판단 결과를 출력할 때, 자질구레한 말들은 생략하고 판단 결과만을 출력해주기.

-Example:

다음은 입력과 출력에 대한 예시본이야. 

[입력 예시 1]
{
“answer”: “친구랑 나랑 정말 죽마고우 같아.”
}

[출력 예시 1]
{
“scale”: 1
}

[입력 예시 2]
{
“answer”: “음 시간이 오래 돼서 기억이 잘 안 나는 것 같아.”
}

[출력 예시 2]
{
“scale”: 3
}


-Format: 
‘당신의 친구는 당신과 비슷한 성격인가요?’에 대한 user의 답변은 "${responseTodialogue14}"와 같다.
해당 답변을 판독하여 ‘긍정’인지 ‘부정’인지 판단하여 숫자로 나타내라.  
답변은 다음과 같이 JSON 형식으로 뽑는다. 

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
  -Audience: 안녕, 나는 간단한 대화형 봇을 구현하는 과제를 하고 있는 대학생이야.

-Role & Task: 너는 이제부터 ‘문장을 판독하는 기계’ 역할을 맡게 될 거야. 구체적으로, 내가 아래에 너에게 전달할 입력 내용은 대화형 봇을 이용하는 user가 ‘당신의 이름은 무엇인가요?’라는 질문에 대해 답변한 내용인데, user가 답변한 이름(ex. 나는 홍길동이야)을  정확한 이름의 형태(ex. 결과값: 홍길동)로 변환해주면 돼. 너의 역할이 필요한 이유 혹은 목적은 ‘당신의 이름은 무엇인가요?’에 대해 나올 수 있는 다양한 답변에서 “순수하게” 이름만을 걸러내기 위함이야. 

-policy (=ground rule):

Task를 수행할 때 아래의 사항을 유의해줘. 

- 결과값은 ‘한글 이름’으로 도출한다. 가령, user의 답변이 “Kimminjae”라면 결과값은 “김민재”로 도출한다.
- 입력되는 user의 이름은 크게 i) 성(last name)까지 포함되어 세글자인 형태 (ex. 김민재), ii) 성(last name)이 생략되어 두글자인 형태 (ex. 민재) 이렇게 2가지 형태가 가능하다.  어떠한 경우든 순수하게 이름만을 걸러낸다.
- GPT의 답변은 “알겠습니다”와 같은 자질구레한 말들은 모두 생략하고 (두글자 혹은 세글자인) ‘이름’만 출력하도록 한다 (아래의 [출력 내용]의 JSON format 참고)

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
-Audience: 안녕, 나는 간단한 대화형 봇을 구현하는 과제를 하고 있는 대학생이야.

-Role & Task: 너는 이제부터 ‘문장을 판독하는 기계’ 역할을 맡게 될 거야. 구체적으로, 내가 아래에 너에게 전달할 입력 내용은 대화형 봇의 user가 ‘어린 시절 당신과 가장 친했던 친구의 이름은 무엇인가요?’라는 질문에 대해 답변한 내용인데, 해당 답변을 보고 user가 ‘친구가 없다’ 혹은 ‘잘 기억나지 않는다’의 답변을 한 경우만을 구별해주면 돼. 너의 역할이 필요한 이유는 자연스러운 대화형 봇을 구현하기 위해선 user 답변의 variation에 대해 대응하는 것이 중요하기 때문이야.

-Policy (=ground rule):

Task를 수행할 때 다음의 조건을 지켜줘.

- user가 ‘어린 시절 당신과 가장 친했던 친구의 이름은 무엇인가요?’라는 질문에 대해, 
1) ‘친구 이름’을 답변했다고 판단되는 경우: ‘true’를 결과값으로 출력
2) ‘친구가 없다’ 혹은 ‘잘 기억나지 않는다’와 동일한 혹은 비슷한 답변을 했다고 판단되는 경우: ‘false’를 결과값으로 출력
- 판단 결과를 출력할 때, 자질구레한 말들은 생략하고 판단 결과만을 출력해주기.

-Example:

다음은 입력과 출력에 대한 예시본이야. 판단 결과를 출력할 때, 자질구레한 말들은 생략하고 “true”, “false” 혹은 “N/A”의 결과만을 출력해주기.

[입력 예시 1]

{

“answer”: “친구가 별로 없어서 잘 모르겠어.”

}

[출력 예시 1]

{
  "haveFriend": false
}

[입력 예시 2]

{
“answer”: “가장 친했던 건 영희였던 것 같아.”
}

[출력 예시 2]

{
  "haveFriend": true
}


-Input: 

‘어린 시절 당신과 가장 친했던 친구의 이름은 무엇인가요?에 대한 user의 답변은 "${responseTodialogue8}"이야. 해당 답변을 판독하여 Example의 형식을 참고하고 Policy를 지켜 Task를 수행하라.
-------
- Your Answer: 답변은 다음과 같이 다른 말 덧붙이지 않고 JSON 형식으로만 뽑는다.

{
  "haveFriend": (true or false)
}



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
        haveFriend = scaleObject.haveFriend;
        console.log("Extracted scale:", haveFriend);

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
