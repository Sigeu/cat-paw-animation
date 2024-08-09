function random(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function calculateStartPosition(maxWidth, maxHeight, targetX, targetY, angle) {
    const radius = Math.max(maxWidth, maxHeight);
    const radians = angle * Math.PI / 180;
    let startX = targetX - radius * Math.cos(radians);
    let startY = targetY - radius * Math.sin(radians);
    return {startX, startY};
}

let x, y;
const playground = document.getElementById('playground');
playground.addEventListener('click', function(event) {
	const w = window.innerWidth;
	const h = window.innerHeight;
	x = event.clientX || x;
	y = event.clientY || y;
	
	let minAngle = 0;
	let maxAngle = 360;
	if (x < w * 0.35) {
		if (y < h * 0.35) {
			minAngle = -30;
			maxAngle = 120;
		} else if (y > h * 0.65) {
			minAngle = -120;
			maxAngle = 30;
		} else {
			minAngle = -45;
			maxAngle = 45;
		}
	} else if (x > w * 0.65) {
		if (y < h * 0.35) {
			minAngle = 60;
			maxAngle = 210;
		} else if (y > h * 0.65) {
			minAngle = 150;
			maxAngle = 300;
		} else {
			minAngle = 135;
			maxAngle = 225;
		}
	} else {
		if (y < h * 0.35) {
			minAngle = 45;
			maxAngle = 135;
		} else if (y > h * 0.65) {
			minAngle = 225;
			maxAngle = 315;
		} else {
			[minAngle,maxAngle] = Math.round(Math.random()) ? [45, 135] : [225, 315];
		}
	}
	let angle = random(minAngle, maxAngle);
	
	const printX = x - 125 / 2;
	const printY = y - 125 / 2;
	const printNum = random(1, 4);
	const pawPrint = document.createElement('div');
	pawPrint.className = 'paw-prints';
	pawPrint.style.backgroundImage = `url(images/paw_print_${printNum}.png)`;
	pawPrint.style.opacity = 0;
	pawPrint.style.transform = `translate(${printX}px, ${printY}px) rotate(${angle+90}deg)`;
	playground.appendChild(pawPrint);
	
	const pawX = x - 325 / 2;
	const pawY = y - 125 / 2;
	const pawNum = random(1, 9);
	let { startX, startY } = calculateStartPosition(w, h, x, y, angle);
	startX -= 325 / 2;
	startY -= 125 / 2;
	const catPaw = document.createElement('div');
	catPaw.className = 'cat-paws';
	catPaw.style.backgroundImage = `url(images/cat_paw_${pawNum}.png)`;
	catPaw.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle+90}deg)`;
	playground.appendChild(catPaw);
	
	const soundNum = random(1, 8);
	const catSound = document.createElement('audio');
	catSound.style.display = 'none';
	catSound.src = `audio/cat_sound_${soundNum}.mp3`;
	catSound.setAttribute('autoplay', '');
	playground.appendChild(catSound);
	
	setTimeout(() => {
		catPaw.style.transition = 'transform 1s';
		catPaw.style.transform = `translateX(${pawX}px) translateY(${pawY}px) rotate(${angle+90}deg)`;
		setTimeout(() => {
			pawPrint.style.opacity = 1;
			catPaw.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle+90}deg)`;
			setTimeout(() => {
				pawPrint.style.transition = 'opacity 1s linear';
				pawPrint.style.opacity = 0.5;
				catPaw.style.transition = '';
				catPaw.remove();
				catSound.remove();
			}, 1000);
		}, 1000);
	}, 0);
});


const close = document.getElementById('close');
close.addEventListener('click', function(event) {
	const wave = document.getElementById('wave');
	wave.style.animation = '1s linear wave';
	
	const washSound = document.createElement('audio');
	washSound.style.display = 'none';
	washSound.src = 'audio/wash.mp3';
	washSound.setAttribute('autoplay', '');
	playground.appendChild(washSound);
	
	setTimeout(() => {
		
	}, 1000)
	
	setTimeout(() => {
		const container = document.getElementById('container');
		container.style.opacity = 0;
		
		close.style.display = "none";
		playground.style.display = "none";
		
		const prints = document.querySelectorAll('.paw-prints');
		for (let i = 0; i < prints.length; i++) {
			const print = prints[i];
			playground.removeChild(print);
		}
		const paws = document.querySelectorAll('.cat-paws');
		for (let i = 0; i < paws.length; i++) {
			const paw = paws[i];
			playground.removeChild(paw);
		}
		
		wave.style.animation = '';
		
		setTimeout(() => {
			washSound.remove();
			
			container.style.transition = 'opacity 0.1s linear';
			container.style.opacity = 1;
			setTimeout(() => {
				container.style.transition = '';
			}, 100);
		}, 200);
	}, 1000)
});

const play = document.getElementById('play');
play.addEventListener('click', function(event) {
	playground.style.display = "block";
	close.style.display = "flex";
	x = event.clientX
	y = event.clientY
	playground.click();
});