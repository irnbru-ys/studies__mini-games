"use strict";

const gridArea = document.querySelector(".gridarea");

const score = elementCreate(gridArea, "div", "score", "Score: ");
const btn = elementCreate(gridArea, "button", "btn", "Spin");
const message = elementCreate(gridArea, "div", "message", "Press Spin");
const output = elementCreate(gridArea, "div", "output", "");

const grid = { x: 7, y: 6, coins: 15, rates: [], spin: true };
const total = grid.x * grid.y;

createBoard();
updateScore();

output.addEventListener("click", (event) => {
    let target = event.target;
    if (
        event.target.classList.contains("box") &&
        target.check === 0 &&
        grid.spin === true
    ) {
        btn.disabled = false;
        if (grid.coins < 1 && grid.spin === false) {
            message.innerHTML = "You don`t have money";
            setTimeout(() => (message.innerHTML = "Reset Game"), 1000);
            btn.textContent = "Reset?";
        }
        if (grid.coins < 1) {
            message.innerHTML = "You don`t have money";
            return;
        }

        target.check = 1;
        elementCreate(target, "div", "bet", "$");
        grid.coins--;
        grid.rates.push(Number(target.childNodes[0].textContent));
    }
    if (
        event.target.classList.contains("bet") &&
        target.parentElement.check === 1
    ) {
        target.parentElement.check = 0;
        grid.coins++;
        grid.rates = grid.rates.filter(
            (item) =>
                !(
                    item ===
                    Number(target.parentElement.childNodes[0].textContent)
                )
        );
        target.parentElement.children[0].remove();
    }
    updateScore();
});

btn.addEventListener("click", spinner);

function spinner() {
    if (grid.rates.length === 0 && grid.spin === true && grid.coins > 0) {
        message.textContent = "Select number";
        btn.disabled = true;
        return;
    }

    if (btn.textContent === "Reset?") {
        grid.coins = 15;
        grid.spin = true;
        message.innerHTML = "Press Spin";
        btn.textContent = "Spin";
        updateScore();
        return;
    }
    if (grid.coins < 1 && grid.spin === false) {
        message.innerHTML = "You don`t have money";
        setTimeout(() => (message.innerHTML = "Reset Game"), 1500);
        btn.textContent = "Reset?";
        return;
    }
    if (grid.spin) {
        grid.spin = false;
        const randomValue = Math.floor(Math.random() * total + 1);
        if (grid.rates.includes(randomValue)) {
            grid.coins =
                grid.coins +
                grid.rates.length * Math.floor(Math.random() * 1 + 1);
            score.textContent = `${grid.coins}`;
            message.innerHTML = `Winner on ${randomValue}. You won ${grid.coins}`;
        } else {
            message.innerHTML = `You're out of luck, the number ${randomValue} came up`;
        }
        grid.rates = [];
        updateScore();

        [...output.querySelectorAll(".box")].forEach((item) => {
			if (randomValue === item.number) {
				item.style.backgroundColor = "purple";
				setTimeout(() => {
					item.style.backgroundColor = "";
				}, 5000);
			}
            if (randomValue === item.number && item.lastElementChild) {
                setTimeout(() => elementCreate(item, "div", "bet", "$"), 0);
				item.style.backgroundColor = "green";
            }
            if (item.children[0]) {
                item.check = 0;
                item.children[0].remove();
            }

            setTimeout(() => {
                if (grid.coins > 0) {
                    grid.spin = true;
                    if (item.children[0]) {
                        item.check = 0;
                        item.children[0].remove();
                    }
                }
            }, 5000);
        });
    }
}

function createBoard() {
    for (let i = 0; i < total; i++) {
        const temp = elementCreate(output, "div", "box", `${i + 1}`);
        temp.number = i + 1;
        if (i % 2 === 0) {
            temp.classList.add("red");
        } else {
            temp.classList.add("black");
        }
        temp.check = 0;
    }
    output.style.setProperty(`grid-template-columns`, `repeat(${grid.x}, 1fr)`);
}

function updateScore() {
    score.innerHTML = `Coins: ${grid.coins}`;
}

function elementCreate(parent, elementType, elementClass, html) {
    const element = document.createElement(elementType);
    element.innerHTML = html;
    element.classList.add(elementClass);
    return parent.appendChild(element);
}
