import { questions } from "./question.js"; 

const para = document.querySelector(".question");
const optionsPara = document.querySelectorAll("#options p");
const timerDiv = document.querySelector(".timer");
const counterDiv = document.querySelector("#counter");
const value = [];
const userAnswers = [];
const randomOrder = [];
const temp = [];
let didUserAnswer = false;

let i = 0;
let timer = 5; 

// GENERATE A RANDOM ORDER ON PAGE LOAD
for (let i = 0; i < questions.length; i++) {
  randomOrder.push(getARandomValue());
  const count = document.createElement("div");
  count.classList.add("count");
  count.innerHTML = i+1;
  counterDiv.append(count);
}
// PRINT FIRST QUESTION INSTANTLY (WITHOUT DELAY)
printQ();
timerDiv.innerHTML = timer;

// START THE LOOP TO PRINT NEXT QUESTIONS
const girraj = setInterval(() => {
  if (timer === 1) {
    if (didUserAnswer === false) {
      userAnswers.push("NA");
      // Change count color to red
      // girraj.style.color = "red";
    }
    display()
    printQ();
    timer=5;
    timerDiv.innerHTML = timer;
  } else {
    timer--;
    timerDiv.innerHTML = timer;
  }
}, 1000);

optionsPara.forEach((p,index)=>{
p.addEventListener("click",()=>{
  p.classList.add("selectedOption")

  userAnswers.push(p.innerHTML)
  didUserAnswer=true; 
  disableOptions();
  console.log(userAnswers)
})
});
// // WHEN USER CLICKS ON ANY OPTION,
// // APPLY CLASS ON THAT OPTION
// optionsPara.forEach((p, index) => {
//   p.addEventListener("click", () => {
//     p.classList.add("selectedOption");
//     userAnswers.push(p.innerHTML);
//     didUserAnswer = true;
//     disableOptions();
//     console.log(userAnswers);

//     // count.style.color = "green";
//   });
// });

// WHEN USER CLICKS ON ANY OPTION,

function display(){
  Array.from(counterDiv.children).forEach((option,index)=>{
    if(index<i){  
      option.classList.add("attempted");
      if(index===i-1)option.classList.add("current");
      else
      option.classList.remove("current")
    }
  })
}

function getARandomValue() {
  const randomValue = Math.floor(Math.random() * questions.length);
  if (temp.includes(randomValue)) return getARandomValue();
  else {
    temp.push(randomValue);
    return randomValue;
  }
}

function printQ() {
  // ENABLE THE OPTIONS
  enableOptions();

  // REMOVE THE SELECTED CLASS
  removeSelectedClass();

  // TOGGLE VARIABLE TO FALSE
  didUserAnswer = false;

  if (i === questions.length) {
    clearInterval(girraj);

    // COMPARE USER ANSWERS WITH ACTUAL ANSWERS AS PER RANDOM ORDER
    const score = compareUserAnswers();

    // DISPLAY SCORE ON SCREEN
    showScore(score);
  } else {
    para.innerHTML = questions[randomOrder[i]].q;
    optionsPara.forEach((p, index) => {
      p.innerHTML = questions[randomOrder[i]].opt[index];
    });
    i++;
  }
}

function disableOptions() {
  optionsPara.forEach((p) => {
    p.style.pointerEvents = "none";

  });
}

function enableOptions() {
  optionsPara.forEach((p) => {
    p.style.pointerEvents = "all";
  });
}

function removeSelectedClass() {
  optionsPara.forEach((p) => {
    if (p.classList.contains("selectedOption"))
      p.classList.remove("selectedOption");
  });
}

function compareUserAnswers() {
  let score = 0;
  userAnswers.forEach((userA, index) => {
    if (questions[randomOrder[index]].hasImage === false) {
      userA = Number(userA);
    }
    if (userA !== "NA" && userA === questions[randomOrder[index]].correct) {
      score++;
    }
  });
  return score;
}

function showScore(score) {
  document.querySelector("#quiz").innerHTML = "";
  const scorePara = document.createElement("p");
  scorePara.classList.add("scorePara");
  scorePara.innerHTML = "Your score is: " + score;
  document.querySelector("#quiz").append(scorePara);
}




