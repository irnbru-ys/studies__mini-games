let deadBobr = document.getElementById('dead');
let deadBobrCount = 0;

let lostBobr = document.getElementById('lost')
let lostBobrCount = 0;

for (let i = 0; i < 9; i++) {
	document.getElementById(`${'hole' + (i+1)}`).onclick = function(e) {
		console.log(e.target.className)
		if (e.target.className === 'hole hole_has-mole') {
			++deadBobrCount
			deadBobr.textContent = deadBobrCount;
			setTimeout(() => {
				if (deadBobrCount === 10) {
					alert('Вы выиграли')
					deadBobrCount = 0;
					lostBobrCount = 0
					deadBobr.textContent = 0
					lostBobr.textContent = 0;
				}
			})
		} else {
			++lostBobrCount;
			lostBobr.textContent = lostBobrCount;
			setTimeout(() => {
				if (lostBobrCount === 5) {
					alert('Вы проиграли')
					deadBobrCount = 0;
					lostBobrCount = 0
					deadBobr.textContent = 0
					lostBobr.textContent = 0;
				}
			}, 0)
		}
	}
}