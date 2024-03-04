"use strict";

const output = document.querySelector('.output');
const game = { timer: 0, start: null };

const message = document.createElement('div');
message.textContent = 'Press to Start';
message.classList.add('message');
output.insertAdjacentElement('beforebegin', message);


const box = document.createElement('div');
box.classList.add('box');
box.textContent = 'Start Game';

output.append(box);

box.addEventListener('click', event => {
	box.textContent = '';
	box.style.display = 'none';
	game.timer = setTimeout(addBox, randomNum(3000));
	if (!game.start) {
		message.textContent = 'Watch for element and click it';
	} else {
		const cur = new Date().getTime();
		const dur = (cur - game.start) / 1000;
		message.textContent = `It took ${dur} seconds to click`;
	}
});

function addBox() {
	game.start = new Date().getTime();
	const container = output.getBoundingClientRect();
	const dim = [randomNum(50) + 20, randomNum(50) + 20];
	box.style.display = 'block';
	box.style.width = dim[0] +'px';
	box.style.height = dim[1] +'px';
	box.style.backgroundColor = `#${Math.random().toString(16).slice(-6)}`;
	box.style.left = randomNum(container.width - dim[0]) + 'px';
	box.style.top = randomNum(container.height - dim[1]) + 'px';
	box.style.borderRadius = randomNum(50) + '%';
}

function randomNum(max) {
	return Math.floor(Math.random() * max);
}