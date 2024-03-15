"use strict";

const gameArea = document.querySelector(".game");

const message = elementMaker(gameArea, "div", "message", "MESSAGE");
const scoreBoard = elementMaker(gameArea, "div", "scoreboard", "SCOREBOARD");
const gamePlay = elementMaker(gameArea, "div", "gameplay", "");
const box = elementMaker(gamePlay, "div", "box", "");
const box1 = elementMaker(gamePlay, "div", "box1", "");
const btn = elementMaker(gameArea, "div", "btn", "Click to Start Game");
let info = elementMaker(
    gameArea,
    "div",
    "info",
    "To exit the game, click ESCAPE"
);

box1.style.backgroundColor = "red";
box1.position = { x: 0, y: 0, dx: 0, dy: 0, dir: 10, speed: 5 };

const keyz = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
};

const game = { animation: null, x: 0, y: 0, speed: 5, enemies: 30, score: 0 };
const enemies = [];

game.x = gamePlay.getBoundingClientRect().width / 2 - 25;
game.y = gamePlay.getBoundingClientRect().height / 2 - 25;

window.addEventListener("keydown", (event) => {
    if (event.code in keyz) {
        keyz[event.code] = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.code in keyz) {
        keyz[event.code] = false;
    }
    if (event.code === "Escape") {
        cancelAnimationFrame(game.animation);
        box.style.display = "";
        box1.style.display = "";
        btn.style.display = "block";
        scoreBoard.innerHTML = "SCOREBOARD";
        scoreBoard.style.backgroundColor = "";
        message.innerHTML = "MESSAGE";
        info.style.display = "";
        gamePlay.querySelectorAll(".enemie").forEach((enemie) => {
            enemie.style.display = "none";
        });
    }
});

btn.addEventListener("click", (event) => {
    game.animation = window.requestAnimationFrame(mover);
    box.style.display = "block";
    box1.style.display = "block";
    btn.style.display = "none";
    gamePlay.style.cssText =
        "border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;";
    info.style.display = "block";
});

function mover() {
    box1.position.dir--;
    if (box1.position.dir < 0) {
        box1.position.speed = randomizer(0, 6);
        box1.position.dx =
            box1.position.x < game.x
                ? box1.position.speed
                : box1.position.speed * -1;
        box1.position.dy =
            box1.position.y < game.y
                ? box1.position.speed
                : box1.position.speed * -1;
        box1.position.dir = randomizer(10, 20);
    }
    box1.position.x += box1.position.dx;
    box1.position.y += box1.position.dy;
    box1.style.left = box1.position.x + "px";
    box1.style.top = box1.position.y + "px";

    if (checkCollision(box, box1)) {
        message.innerHTML = "Hit!!!";
        scoreBoard.style.backgroundColor = "red";
        game.score -= 1;
        scoreBoard.innerHTML = `Score: ${game.score}`;
    }

    if (enemies.length < game.enemies) {
        if (randomizer(0, 5) === 0) {
            const obj = {
                x: randomizer(0, gamePlay.getBoundingClientRect().width - 30),
                y: randomizer(0, gamePlay.getBoundingClientRect().height - 30),
                element: elementMaker(gamePlay, "div", "enemie", ""),
                dx: 0,
                dy: 5,
                dir: 10,
            };
            obj.element.style.backgroundColor = "blue";
            enemies.push(obj);
        }
    }
    if (
        keyz.ArrowDown &&
        game.y < gamePlay.getBoundingClientRect().height - 50
    ) {
        game.y += game.speed;
    } else if (keyz.ArrowUp && game.y > 0) {
        game.y -= game.speed;
    }
    if (keyz.ArrowLeft && game.x >= 0) {
        game.x -= game.speed;
    } else if (
        keyz.ArrowRight &&
        game.x < gamePlay.getBoundingClientRect().width - 50
    ) {
        game.x += game.speed;
    }
    box.style.left = game.x + "px";
    box.style.top = game.y + "px";

    enemies.forEach((enemie) => {
        enemie.element.style.display = "block";
        enemie.dir--;
        if (enemie.dir < 0) {
            enemie.dir = randomizer(10, 50);
            enemie.dy = randomizer(0, 5) - 2;
            enemie.dx = randomizer(0, 5) - 2;
        }
        if (enemie.y < 50) {
            enemie.dy = 1;
        }
        if (enemie.x < 50) {
            enemie.dx = 1;
        }
        if (enemie.x > gameArea.getBoundingClientRect().width - 30) {
            enemie.dx = -1;
        }
        if (enemie.x > gameArea.getBoundingClientRect().height - 30) {
            enemie.dy = -1;
        }
        enemie.y += enemie.dy;
        enemie.x += enemie.dx;
        enemie.element.style.left = enemie.x + "px";
        enemie.element.style.top = enemie.y + "px";

        if (checkCollision(box, enemie.element)) {
            message.innerHTML = "MESSAGE";
            scoreBoard.style.backgroundColor = "black";
            enemie.x = randomizer(0, gamePlay.getBoundingClientRect().width - 30);
            enemie.y = randomizer(0, gamePlay.getBoundingClientRect().width - 30);
            game.score += 2;
            scoreBoard.innerHTML = `Score: ${game.score}`;
        }
    });

    game.animation = window.requestAnimationFrame(mover);
}

function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function checkCollision(elem1, elem2) {
    const el1 = elem1.getBoundingClientRect();
    const el2 = elem2.getBoundingClientRect();
    let hit = !(
        el1.right < el2.left ||
        el1.left > el2.right ||
        el1.bottom < el2.top ||
        el1.top > el2.bottom
    );

    return hit;
}

function elementMaker(parent, elementType, elementClass, html) {
    const element = document.createElement(elementType);
    element.classList.add(elementClass);
    element.innerHTML = html;
    parent.append(element);
    return element;
}
