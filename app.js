// fetch data from database:
let response = null;
const getData = async () => {
  response = await fetch(
    "https://api.airtable.com/v0/appTwc4hdNHTfYPej/questions?api_key=keyrLBP7eOuED5fyV"
  );

  const data = await response.json();

  return data;
};

getData()
  .then((data) => {
    data.records.sort(function (a, b) {
      return a.fields.number - b.fields.number;
    });
    data.records.forEach(function loopThroughDatabase(i, index) {
      const question = i.fields.question_text;
      const answer = i.fields.answer;

      if (index < 20) {
        const newDiv = createQuestionDiv(index, question, answer);

        firstDiv.appendChild(newDiv);
      } else {
        const LogicQuestionDiv = createLogicQuestion(index, question, answer);
        firstDiv.appendChild(LogicQuestionDiv);
      }
    });
    addClicksListeners();
  })
  .catch((err) => console.log(err));

// the container div pre-existing in Html:
const firstDiv = document.getElementById("container");

// the function for creating the numbered question div with nested functions called upon for appended elements:
function createQuestionDiv(i, question, answer) {
  questionDiv = document.createElement("div");
  questionDiv.setAttribute("id", "question" + i);
  questionDiv.setAttribute("class", "questions");
  const insertQuestion = document.createTextNode(question);
  const createParagraph = document.createElement("p");
  createParagraph.setAttribute("class", "question-p");
  createParagraph.setAttribute("id", "questPara" + i);
  const insertNumber = document.createTextNode(i + 1);
  number = document.createElement("div");
  number.setAttribute("class", "number");
  number.appendChild(insertNumber);
  questionDiv.appendChild(number);
  questionDiv.appendChild(createParagraph);
  createParagraph.appendChild(insertQuestion);
  questionDiv.appendChild(createButton(i));
  questionDiv.appendChild(createIconRight());
  questionDiv.appendChild(createIconWrong());
  //adding the p with answer:
  const createAnswerParagraph = document.createElement("p");
  createAnswerParagraph.setAttribute("class", "answer-p notappear");
  createAnswerParagraph.setAttribute("id", "answer" + i);
  insertAnswer = document.createTextNode(answer);
  createAnswerParagraph.appendChild(insertAnswer);
  questionDiv.appendChild(createAnswerParagraph);

  return questionDiv;
}
// the function for creating the logic question:

function createLogicQuestion(i, question, answer) {
  logicQuestion = document.createElement("div");
  logicQuestion.setAttribute("class", "logicQuestDiv");
  const createHeadline = document.createElement("h2");
  const insertHeadline = document.createTextNode("שאלת הגיון");
  logicQuestion.appendChild(createHeadline);
  createHeadline.appendChild(insertHeadline);
  const insertQuestion = document.createTextNode(question);
  const createParagraph = document.createElement("p");
  createParagraph.setAttribute("class", "question-p");
  logicQuestion.appendChild(createParagraph);
  createParagraph.appendChild(insertQuestion);
  logicQuestion.appendChild(createButton(i));
  //adding the p with answer:
  const createAnswerParagraph = document.createElement("p");
  createAnswerParagraph.setAttribute("class", "answer-p notappear");
  createAnswerParagraph.setAttribute("id", "answer" + i);
  insertAnswer = document.createTextNode(answer);
  createAnswerParagraph.appendChild(insertAnswer);
  logicQuestion.appendChild(createAnswerParagraph);

  return logicQuestion;
}

//the function for creating an answer button:
function createButton(index) {
  newBtn = document.createElement("button");
  newBtn.setAttribute("class", "answer");
  newBtn.appendChild(document.createTextNode("תשובה"));
  newBtn.setAttribute("id", "btn" + index);
  newBtn.addEventListener("click", function () {
    let answerParagraph = document.getElementById("answer" + index);
    answerParagraph.classList.toggle("notappear");
    if (answerParagraph.offsetHeight > 100) {
      answerParagraph.classList.add("shrinkFont");
    }

    this.style.display = "none";
  });

  return newBtn;
}

//the function for creating the 'right' icon (an image):
function createIconRight() {
  imgLike = document.createElement("img");
  imgLike.setAttribute(
    "src",
    "https://img.icons8.com/dotty/80/000000/facebook-like.png"
  );
  imgLike.setAttribute("class", "right");

  return imgLike;
}
//the function for creating the 'wrong' icon (an image):
function createIconWrong() {
  imgUnlike = document.createElement("img");
  imgUnlike.setAttribute(
    "src",
    "https://img.icons8.com/dotty/80/000000/thumbs-down.png"
  );
  imgUnlike.setAttribute("class", "wrong");

  return imgUnlike;
}

// Make background green after being clicked on for "right" class buttons:

function addClicksListeners() {
  const greenBackground = document.getElementsByClassName("right");
  Array.from(greenBackground).forEach(function (btnSuccess) {
    btnSuccess.addEventListener("click", function onClick() {
      btnSuccess.classList.toggle("correct");
    });
  });
  // Make background red after being clicked on for "wrong" class buttons:

  const redBackground = document.getElementsByClassName("wrong");

  Array.from(redBackground).forEach(function (btnFail) {
    btnFail.addEventListener("click", function onClick() {
      btnFail.classList.toggle("mistake");
    });
  });
  const counter = document.querySelector("#counter");

  Array.from(greenBackground).forEach(function (clicked) {
    clicked.addEventListener("click", function onClick() {
      const success = document.getElementsByClassName("correct");
      counter.textContent = success.length;
    });
  });
}

//grab name value from form on submit:
const form = document.forms[0];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let nameValue = form.querySelector('input[type="text"]').value;
  console.log(nameValue);
  let areatextValue = form.querySelector("#comment").value;
  console.log(areatextValue);

  fetch(
    "https://api.airtable.com/v0/appTwc4hdNHTfYPej/commentsFromTrivia?api_key=keyrLBP7eOuED5fyV",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: nameValue,
          Comment: areatextValue,
        },
      }),
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
});
