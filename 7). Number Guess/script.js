"use strict";

const output = document.querySelector('.output');
const main = maker('div', output, 'main', 'Press Button to Start');
const guess = maker('input', output, 'guess', '');
const btn = maker('button', output, 'btn', 'Start Game');
const game = { num: 0, inplay: false, max: 10, score: 0 };

guess.setAttribute('type', 'number');
guess.style.display = 'none';

btn.addEventListener('click', () => {
	if (!game.inplay) {
		game.num = generateNumber(game.max);
		game.inplay = true;
		btn.textContent = 'Guess Value'
		message(`Guess the number from 0 - ${game.max}`, 'black')
		guess.style.display = 'block';
		guess.value = '';
		guess.max = game.max;
		guess.min = 0;
	} else {
		game.score++
		let value = Number(guess.value); 
		if (value === game.num) {
			message(`Your Guess ${game.num} is Correct!<br>, Total Guess: (${game.score})`, 'green');
			endGame();
		} else if (value > game.num) {
			message(`${value} was too high, guess (${game.score})`, 'red');
			guess.value = '';
		} else if (value < game.num) {
			message(`${value} was too low, guess (${game.score})`, 'blue');
			guess.value = '';
		}
	}
});

function endGame() {
	btn.textContent = 'Restart Game';
	game.inplay = false;
	guess.style.backgroundColor = 'none';
	game.max = generateNumber(100);
	game.score = 0;
}

function message(html, bgColor) {
	main.innerHTML = html;
	main.style.backgroundColor = bgColor;
}

function generateNumber(max) {
	return Math.floor(Math.random() * max + 1);
}


function maker(elementType, elementParent, elementClass, html) {
	const element = document.createElement(elementType);
	element.textContent = html;
	element.classList.add(elementClass);
	elementParent.append(element);
	return element;
}