"use strict";

const container = document.querySelector(".game");

const scoreBoard = elementMaker(container, "div", "scoreboard", "SCORE");
const gameBoard = elementMaker(container, "div", "gameboard", "GAMEBOARD");
const message = elementMaker(container, "div", "message", "MESSAGE");
const btn = elementMaker(container, "button", "btn", "Click to Start");

const items = [
    "&#9728;",
    "&#9729;",
    "&starf;",
    "&phone;",
    "&#9774;",
    "&hearts;",
    "&#9992;",
    "&#10052;",
];
const game = {
    score: 0,
    animation: {},
    total: 10,
    counter: 0,
    ready: 0,
    bad: 0,
};

let id1 = btn.addEventListener("click", startGame);
gameBoard.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("bubble")) {
        game.score += 10;
        game.counter++;
        scoreUpdater();
        event.target.remove();
        // check end game
        if (game.ready - game.counter === 0) {
            message.innerHTML = "Game Over";
            cancelAnimationFrame(game.animation);
            gameBoard.innerHTML = "GAMEBOARD";
            message.innerHTML = "MESSAGE";
            btn.style.display = "block";
        }
    }
    if (event.target.classList.contains("baddy")) {
        game.score--;
        gameBoard.style.backgroundColor = "red";
        let id2 = event.target.addEventListener("mouseout", () => {
            gameBoard.style.backgroundColor = "";
        });

        clearTimeout(id2);
    }
});

function startGame() {
    btn.style.display = "none";
    game.score = 0;
    game.total = 50;
    game.ready = 0;
    game.counter = 0;
    game.bad = 10;
    gameBoard.innerHTML = "";
    message.innerHTML = "Click the Bubbles";
    scoreUpdater();
    game.animation = requestAnimationFrame(mover);
    clearTimeout(id1);
}

function scoreUpdater() {
    message.innerHTML = `Bubbles Left: ${game.ready - game.counter}`;
    scoreBoard.innerHTML = `Your Score: ${game.score}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateBubbles() {
    scoreUpdater();
    items.sort(() => Math.random() - 0.5);
    const letter = items[0];
    const bubble = elementMaker(gameBoard, "div", "bubble", letter);
    const containerSize = gameBoard.getBoundingClientRect();
    bubble.speed = random(1, 5);
    bubble.style.transform = `scale(${random(0.5, 3)})`;
    bubble.style.backgroundColor = `#${Math.floor(
        Math.random() * 16777216
    ).toString(16)}`;
    bubble.style.left = random(0, containerSize.width - 30) + "px";
    bubble.style.top = random(0, 500) + 1000 + "px";
}

function generateBadBubbles() {
    const bubble = elementMaker(gameBoard, "div", "baddy", "&#9760");
    const containerSize = gameBoard.getBoundingClientRect();
    bubble.speed = random(1, 5);
    bubble.style.backgroundColor = "red";
    bubble.style.transform = `scale(${random(0.5, 3)})`;
    bubble.style.left = random(0, containerSize.width - 30) + "px";
    bubble.style.top = random(0, 500) + 1000 + "px";
}

function mover() {
    if (game.bad > 0) {
        generateBadBubbles();
        game.bad--;
    }
    if (game.total > game.ready) {
        game.ready++;
        generateBubbles();
    }
    const allBaddy = document.querySelectorAll(".baddy");
    allBaddy.forEach((bad) => {
        const position = [bad.offsetLeft, bad.offsetTop];
        const speed = bad.speed;
        position[1] -= speed;
        if (position[1] <= 0) {
            bad.remove();
			generateBadBubbles();
            game.score--;
            scoreUpdater();
        }
        bad.style.top = position[1] + "px";
        bad.style.left = position[0] + "px";
    });

    const allBubbles = document.querySelectorAll(".bubble");
    allBubbles.forEach((bubble) => {
        const position = [bubble.offsetLeft, bubble.offsetTop];
        const speed = bubble.speed;
        position[1] -= speed;
        if (position[1] <= 0) {
            bubble.remove();
			generateBubbles();
            scoreUpdater();
        }
        bubble.style.top = position[1] + "px";
        bubble.style.left = position[0] + "px";
    });

    game.animation = requestAnimationFrame(mover);
}

function elementMaker(parentElement, elementType, elementClass, html) {
    const element = document.createElement(elementType);
    element.classList.add(elementClass);
    element.innerHTML = html;
    parentElement.append(element);
    return element;
}
