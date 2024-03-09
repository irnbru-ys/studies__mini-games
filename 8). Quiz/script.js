"use strict";

const question = document.querySelector(".question");
const controls = document.querySelector(".controls");
const output = document.querySelector(".output");

controls.classList.add("btn");
question.style.display = "none";

const game = { data: [], stak: 0, score: 0, question: 0, cur: 0 };
const url = "quiz.json";

controls.addEventListener("click", nextQuestion);

document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

function startGame() {
    question.style.display = "none";
    controls.style.display = "inline-block";
    controls.textContent = "Start Game Click Here";
    game.stak = 0;
    game.score = 0;
    game.cur = 0;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            game.data = data;
            game.question = data.length;
            output.innerHTML = `Total Questions: ${game.question}`;
        });
}

function scoreBoard() {
    output.innerHTML = `Question: ${game.cur} of ${game.question}`;
    output.innerHTML += `<br>Score: ${game.score}`;
}

function randomArray(arr) {
    arr.sort(() => {
        return 0.5 - Math.random();
    });
}

function gameOver() {
    question.innerHTML = `<h1>Game Over</h1>`;
    question.innerHTML += `You Scored Correct ${game.score} out of ${game.question}`;
}

function nextQuestion() {
    if (game.stak !== 0 && controls.textContent === "Next Question") {
        question.nextElementSibling.remove();
    }

    if (controls.textContent === "Reset Game") {
        startGame();
        setTimeout(() => (controls.textContent = "Start Game Click Here"));
    }
    game.stak++;
    if (game.data.length > 0) {
        game.cur++;
        controls.style.display = "none";

        question.style.display = "block";
        const temp = game.data.pop();
        question.textContent = temp.question;
        const div = document.createElement("div");
        div.classList.add("answer");
        div.addEventListener(
            "click",
            (event) => {
                const div2 = document.createElement("div");
                div2.classList.add("bul");
                if (event.target.textContent === temp.ans) {
                    event.target.value = 1;
                    game.score++;
                    div2.innerHTML += `<br>Correct`;
                    div2.style.color = "green";
                    div.insertAdjacentElement("beforeend", div2);
                    scoreBoard();
                } else {
                    div2.innerHTML += `<br>Wrongt`;
                    div2.style.color = "red";
                    div.insertAdjacentElement("beforeend", div2);
                }
                const spanInfo = document.querySelectorAll(".item");
                spanInfo.forEach((item) => {
                    if (item.value === 1) {
                        item.style.backgroundColor = "orange";
                    } else {
                        item.classList.remove("item");
                        item.classList.add("disabled");
                    }
                });
            },
            { once: true }
        );

        temp.opts.push(temp.ans);
        const options = temp.opts;
        randomArray(options);
        options.forEach((elem) => {
            let span = document.createElement("span");
            span.classList.add("item");
            span.textContent = elem;
            div.append(span);
            controls.style.display = "block";
            controls.textContent = "Next Question";
        });
        question.insertAdjacentElement("afterend", div);
    } else {
        question.style.textAlign = "center";
        controls.textContent = "Reset Game";
        gameOver();
    }
    scoreBoard();
}
