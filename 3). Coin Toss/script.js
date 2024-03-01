'use strict';

const main = document.querySelector('.main')
const game = {
	score: 0,
	streak: 0,
}

const btn = document.createElement('button');
const output = document.createElement('div');
const scoring = document.createElement('div');
const message = document.createElement('div');
const coin = document.createElement('div');
const sideA = document.createElement('div');
const sideB = document.createElement('div');
const btn1 = document.createElement('button');

message.classList.add('message');
btn.textContent = 'Start Game';
btn1.textContent = 'Heads';
btn1.style.display = 'none';
coin.classList.add('coin');
coin.style.display = 'none';
sideA.innerHTML = '<img src="./image/png-clipart-smiley-smiley.png" alt="">';
sideB.innerHTML = '<img src="./image/png-clipart-face-facial-expression-smiley-emoticon-wrong-people-sadness.png" alt="">';
message.textContent = `Press Button to Start Game`;

output.append(coin);
coin.append(sideA);
coin.append(sideB);
main.append(message);
main.append(scoring);
main.append(output);
main.append(btn);
main.append(btn1);
btn.classList.add('btn');
btn1.classList.add('btn');
scoring.classList.add('score');


btn.addEventListener('click', playGame);
btn1.addEventListener('click', playGame);

function playGame(event) {
	const element = event.target;
	if (element.textContent === 'Start Game') {
		game.score = 0;
		game.streak = 0;
		message.textContent = `Select either Heads or Tails`;
		btn.textContent = 'Heads';
		btn1.textContent = 'Tails';
		btn1.style.display = 'block';
		btn.style.backgroundColor = 'red';
		btn1.style.backgroundColor = 'blue';
		
		console.log('Start Game')

		addScore()
	} else if (element.textContent === 'Heads') {
		coin.style.display = 'block';
		coinFlipper('Heads');
	} else if (element.textContent === 'Tails') {
		coin.style.display = 'block';
		coinFlipper('Tails');
	}
}

function coinFlipper(value) {
	const ranValue = Math.floor(Math.random() * 2);
	let result = '';
	if (ranValue === 1) {
		sideA.style.display = 'block';
		sideB.style.display = 'none';
		result = 'Heads'
	} else {
		sideB.style.display = 'block';
		sideA.style.display = 'none';
		result = 'Tails'
	}
	if (result === value) {
		game.score++;
		game.streak++;
		message.textContent = `You Picked ${value} Correct it was ${result}`;
	} else {
		game.streak = 0;
		game.score--;
		message.textContent = `You Picked ${value} Wrong!!! was ${result}`;
	}
	addScore()
	return result;
}

function addScore() {
	scoring.innerHTML = `Score: ${game.score} Streak: (${game.streak})`
}

