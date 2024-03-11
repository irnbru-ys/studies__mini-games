"use strict";

const gameArea = document.querySelector(".gamearea");
const howMany = document.createElement("input");
howMany.setAttribute("type", "number");
howMany.value = 4;

const message = document.createElement("div");
message.classList.add("message");
gameArea.append(message);

const output = document.createElement("div");
output.classList.add('output');
gameArea.append(output);

output.append(howMany);

const btn1 = document.createElement("button");
btn1.textContent = "Start Game";
btn1.classList.add('eles');
output.append(btn1);
btn1.addEventListener("click", startGame);

const btn2 = document.createElement("button");
btn2.classList.add("btn");
btn2.textContent = "RollDice";
gameArea.append(btn2);
btn2.style.display = "none";

const game = { players: [] };
const dice = [
    [5],
    [1, 9],
    [1, 5, 9],
    [1, 3, 7, 9],
    [1, 3, 5, 7, 9],
    [1, 3, 4, 6, 7, 9],
];

function startGame() {
    output.innerHTML = "";
    btn2.style.display = "block";
    for (let i = 0; i < howMany.value; i++) {
        const temp = document.createElement("div");
        temp.classList.add("viewer");

        const span1 = document.createElement("span");
        span1.classList.add("playerName");
        span1.textContent = `Player ${i + 1}`;
        temp.append(span1);

        const span2 = document.createElement("span");
        span2.setAttribute("id", `player${i + 1}`);
        temp.append(span2);
        output.append(temp);
        game.players.push(span2);
    }
}

btn2.addEventListener("click", (event) => {
    const rolls = [];
    let highest = 0;
    const winners = [];
    for (let i = 0; i < game.players.length; i++) {
        let value = rollDice(6);
        rolls.push([game.players[i].previousElementSibling.textContent, value]);
        if (value > highest) {
            highest = value;
        }
        updateDice(game.players[i], value);
    }
    for (let j = 0; j < rolls.length; j++) {
        if (rolls[j][1] === highest) {
            winners.push(rolls[j][0]);
        }
    }
    message.innerHTML = `Highest Roll is ${highest}<p>Winners are: ${winners.join(
        ", "
    )}</p>`;
});

function updateDice(el, num) {
    el.innerHTML = "";
    const holder = builder(num);
    el.append(holder);
}

function builder(num) {
    const div = document.createElement("div");
    const addColor = dice[num - 1];
    for (let i = 1; i < 10; i++) {
        const el1 = document.createElement("div");
        el1.classList.add("dot");
        if (addColor.includes(i)) {
            el1.style.backgroundColor = "black";
        }
        div.append(el1);
    }
    div.classList.add("parentdice");
    return div;
}

function rollDice(num) {
    return Math.floor(Math.random() * num) + 1;
}
