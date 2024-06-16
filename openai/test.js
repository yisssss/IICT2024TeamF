let testResponse;
let responseTochatTest;



  function OpenaiFetchTestChat() {
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

‘당신의 친구는 당신과 비슷한 성격인가요?’에 대한 user의 답변은 "${responseTochatTest}"와 같다.
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
        model: "gpt-3.5-turbo", ///////////////////////모델과 temperature 여기서 설정할 수 있습니다.
        temperature: 0.1, ///////////////////////모델과 temperature 여기서 설정할 수 있습니다.
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
          testResponse = data.choices[0].message.content;
          console.log("ai가 준 답변:", testResponse);
        } catch (e) {
          console.error("Error extracting scale:", e);
        }
  
        setWaiting(false);
      })
      .catch((error) => {
        console.log("Something bad happened " + error);
      });
  }
