const questions = [
    {
        question: "What does the acronym AI stand for?",
        answers: [
            {
                text: "Advanced Inference", correct: false
            },
            {
                text: "Artificial Intelligence", correct: true
            },
            {
                text: " Automated Integration", correct: false
            },
            {
                text: "Algorithmic Interpretation", correct: false
            }
        ]
    },
    {
        question: "Which programming language is commonly used for implementing AI algorithms and models?",
        answers: [
            {
                text: "Java", correct: false
            },
            {
                text: " C++", correct: false
            },
            {
                text: "Python", correct: true
            },
            {
                text: " Ruby", correct: false
            }
        ]
    },
    {
        question: "What is the term for the branch of AI that focuses on enabling computers to understand, interpret, and generate human language?",
        answers: [
            {
                text: "Machine Learning", correct: false
            },
            {
                text: "Natural Language Processing (NLP)", correct: true
            },
            {
                text: "Computer Vision", correct: false
            },
            {
                text: "Expert Systems", correct: false
            }
        ]
    },
    {
        question: "What is the name of the AI system developed by IBM, famous for defeating human champions in the game show Jeopardy!?",
        answers: [
            {
                text: "Watson", correct: true
            },
            {
                text: "HAL 9000", correct: false
            },
            {
                text: "Deep Blue", correct: false
            },
            {
                text: "AlphaGo", correct: false
            }
        ]
    },
    {
        question: "Which type of neural network architecture is commonly used for image recognition tasks?",
        answers: [
            {
                text: "Recurrent Neural Networks (RNNs)", correct: false
            },
            {
                text: "Convolutional Neural Networks (CNNs)", correct: true
            },
            {
                text: " Long Short-Term Memory Networks (LSTMs)" , correct: false
            },
            {
                text: "Generative Adversarial Networks (GANs)", correct: false
            }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increment score if the answer is correct
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
