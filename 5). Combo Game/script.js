"use strict";

const output = document.querySelector(".output");
const message = document.createElement("div");
const gameArea = document.createElement("div");
const btn = document.createElement("button");
const game = { guesses: 0, num: 4 };

message.classList.add("message");
output.append(message);

output.append(gameArea);

btn.textContent = "Start Game";
btn.classList.add("btn");
output.append(btn);

outputMessage("Click button to start game");

btn.addEventListener("click", (event) => {
    if (
        btn.textContent === "Start Game" ||
        btn.textContent === "Start New Game"
    ) {
        game.guesses = 0;
        makeBoard();
        btn.textContent = "Check Answer";
        outputMessage("Cuess the combo adjust the dials");
    } else if (btn.textContent === "Check Answer") {
        checkAnswer();
        game.guesses++;
    }
});

function checkAnswer() {
    const combos = document.querySelectorAll(".dial");
    let winners = 0;
    combos.forEach((element) => {
        element.style.color = "white";
        if (Number(element.correct) === Number(element.value)) {
            winners++;
            element.style.backgroundColor = "green";
        } else if (Number(element.correct) < Number(element.value)) {
            element.style.backgroundColor = "red";
        } else if (Number(element.correct) > Number(element.value)) {
            element.style.backgroundColor = "blue";
        }
    });
    if (winners === combos.length) {
        outputMessage("Game Over");
        gameOver();
    } else {
        outputMessage(
            `You got ${winners} of ${combos.length},  guesses:(${game.guesses})`
        );
    }
}

function gameOver() {
    outputMessage(`Game Over it took ${game.guesses} guesses`);
    btn.textContent = "Start New Game";
}

function makeBoard() {
    gameArea.innerHTML = "";
    for (let i = 0; i < game.num; i++) {
        const element = document.createElement("input");
        element.setAttribute("type", "number");
        element.max = 9;
        element.min = 0;
        element.correct = Math.floor(Math.random() * 10);
        element.classList.add("dial");
        element.value = Math.floor(Math.random() * 10);
        gameArea.append(element);
    }
}

function outputMessage(html) {
    message.innerHTML = html;
}
