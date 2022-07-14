const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("counter");
const scoreText = document.getElementById("score");
const restart = document.getElementById("restart");

let questionCounter;
let score;
const MAX_QUESTIONS = 10;

let acceptingAnswers;

function loadFromFile() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "js.json", false);

    xhr.send();

    xhr.onload = function () {
        if (this.status == 200) {
            //console.log(this.response)
        } else {
            console.log("Oops something went wrong");
        }
    };

    return xhr.response;
}

let questions = JSON.parse(loadFromFile());

function start() {
    audio_object = new Audio("../sounds/click.mp3");
    window.playResult = audio_object.play();
    playResult.catch(e => {
        window.playResultError = e;
    })
}
// var audio = new Audio("../sounds/click.mp3");

startGame = () => {
    questionCounter = 0;
    score = 0;
    acceptingAnswers = true;
    scoreText.innerText = score;
    availableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);
    getNewQuestion();
};

const getRandomQuestions = (arr, n) => {
    let len = arr.length;
    if (n > len) {
        throw new RangeError("getRandomQuestions: more elements taken than available");
    }

    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return (selected = shuffled.slice(0, n));
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0) {
        displayResults();
        startGame();
        return;
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    currentQuestion = availableQuestions[0];
    question.innerText = currentQuestion.question;

    answers.forEach((answer) => {
        answer.innerText = currentQuestion[answer.dataset["answer"]];
    });

    //TODO add randomization

    answers.forEach((answer) => {
        answer.addEventListener("click", (e) => {
            if (!acceptingAnswers) {
                return;
            }
            acceptingAnswers = false;
            const clickedAnswer = e.target;

            const anwseredLetter = clickedAnswer.dataset["answer"];

            let classToApply = "incorrect";
            start();
            if (anwseredLetter === currentQuestion.answer) {
                console.log(currentQuestion.mark);
                score = currentQuestion.mark + score;
                scoreText.innerText = score;
                classToApply = "correct";
                score = score;
            }

            clickedAnswer.parentElement.classList.add(classToApply);

            setTimeout(() => {
                clickedAnswer.parentElement.classList.remove(classToApply);
                getNewQuestion();
                acceptingAnswers = true;
            }, 1000);
        });
    });
    availableQuestions.shift();
};

displayResults = () => {
    const modal = new mdb.Modal(endGameModal);
    const modalBody = document.getElementById("modal-body");
    const resultMessage = document.getElementById("ResultText");
    ResultText;
    modalBody.innerText = `আপনার স্কোর:${score}`;
    if (score === 0) {
      resultMessage.innerText = "তোমায় আমি চিনি না আবার বোধহয় চিনি।💔";
      document.getElementById("result_IMG").src = "https://c.tenor.com/zMnQ-5n_sH4AAAAC/tomay-ami-chinina-chinina.gif";
    }
    if (score >1 && 1 <= 30) {
        resultMessage.innerText = "আপাতত আমরা ক্লোজ নই। আমাদের সম্পর্ক ফর্মালিটির।💔";
        document.getElementById("result_IMG").src = "https://c.tenor.com/xSpWrGg0UwMAAAAC/taheri-gifgari.gif";
    }
    if (score > 30 && 30 <= 50) {
        resultMessage.innerText = "আপ্নারে চিনি চিনি মনে হইতাছে 😐";
        document.getElementById("result_IMG").src = "https://c.tenor.com/TTJC1M_crYYAAAAC/mahfuzur-rahman-shukh-pakhi-re.gif";
    }
    if (score > 50 && 50 <= 80) {
        resultMessage.innerHTML = "বুকে আসেন! আমরা যথেষ্ট ক্লোজ। <br> অবশ্যই চেষ্টা করলে আমাদের বন্ধুত্ব আরও স্ট্রং হবে কোনো একদিন। 😍";
        document.getElementById("result_IMG").src = "https://c.tenor.com/Azh_WjSSMsEAAAAC/mahfuzur-rahman-bangladesh.gif";
    }
    if (score > 80 && 80 <= 100) {
        resultMessage.innerText = "ওমা গো ট্রু লাভ 💯😍";
        document.getElementById("result_IMG").src = "https://c.tenor.com/9VEBCPVHlf0AAAAC/bengali-love.gif";
    }
    modal.show();
    acceptingAnswers = false;
};
function wlcFunc() {
  document.getElementById("wlc").style.display = "none";
  document.getElementById("qcard").style.display = "block";
  document.getElementById("scoreBoard").style.display = "block";
  start();
}

restart.addEventListener("click", startGame);
startGame();
