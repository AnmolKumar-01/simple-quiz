const questions = [
    // question 1
    {
        question: "Which is largest animal in the World?",
        answer:[
            
            {text:"Shark" , correct: false},
            {text:"Blue whale" , correct: true},
            {text:"Elephant" , correct: false},
            {text:"Giraffe" , correct: false}
            
        ]
    },
    // question 2
    {
        question: "Which is smallest country in the World?",
        answer:[
            
            {text:"Vatican City" , correct: true},
            {text:"Bhutan" , correct: false},
            {text:"Nepal" , correct: false},
            {text:"Shri Lanka" , correct: false}
            
        ]
    },
    // question 3
    {
        question: "Which is largest desert in the World?",
        answer:[
            
            {text:"kalahari" , correct: false},
            {text:"Gobi" , correct: false},
            {text:"Sahara" , correct: false},
            {text:"Antartica" , correct: true}
            
        ]
    },
    // question 4
    {
        question: "Which is smallest continent in the World?",
        answer:[
            
            {text:"Asia" , correct: false},
            {text:"Australia" , correct: true},
            {text:"Arctic" , correct: false},
            {text:"Africa" , correct: false}
            
        ]
    }

];

const questionText = document.getElementById('question');
const answerList = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

// this will start the new quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// this will dynamically add the question and answer texts
function showQuestion(){

    // before showing next question we have to reset the previous question state
    resetState();

    let currQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionText.innerHTML = questionNo + ". " + currQuestion.question;


    // adding answers options in answers list
    currQuestion.answer.forEach(element => {
        const button = document.createElement("button");
        button.innerHTML = element.text;
        button.classList.add("btn");
        answerList.appendChild(button);

        // if this answer(element) is corrct
        if(element.correct){
            button.dataset.correct = element.correct;
        }

        // this function will change the colors of the right and
        // wrong answers and show the next button
        button.addEventListener('click', AmICorrect);

    });

}

function resetState(){

    // 1. hide the nextButton
    nextButton.style.display = "none";

    // 2. Empty the answerList
    // while there is at least one child in answerList
    while(answerList.firstChild){
        // remove that present one child
        answerList.removeChild(answerList.firstChild);
    }
}

function AmICorrect(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }

    //if we the wrong answer show the correct answer only
    Array.from(answerList.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        // now no other button can be clicked
        button.disabled = true;
    })
    nextButton.style.display = "block";

}

function showScore(){

    // empty the question List
    resetState();
    questionText.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again !";
    nextButton.style.display = 'block';

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex == questions.length){
        showScore();
    }
    else{
        showQuestion();
    }
}

nextButton.addEventListener('click' , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        // new Quiz will be started
        startQuiz();
    }
})

startQuiz();