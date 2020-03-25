const container = document.querySelector('#container');
const roulette = document.querySelector('.roulette');
const startButton = document.querySelector('#start-button');
let emotion = '';

const generateRotation = () => {
	const number = Math.floor(Math.random() * 10 + 45);
	return number * 90;
};

startButton.addEventListener('click', () => {
	startButton.setAttribute('disabled', true);
	startButton.style.opacity = 0.3;
	const rotationDegree = generateRotation();
	if (rotationDegree % 360 === 0) {
		emotion = 'enojo';
	} else if ((rotationDegree - 270) % 360 === 0) {
		emotion = 'tristeza';
	} else if ((rotationDegree - 180) % 360 === 0) {
		emotion = 'alegría';
	} else {
		emotion = 'miedo';
	}
	
	roulette.style.transform = `rotate(${rotationDegree}deg)`;
	const module = document.querySelector('#module');

	
	module.innerHTML = `
	<h1 class="module-title">Ingresa el nombre de esta emoción:</h1>
	<img class="emotion-picture" src="./images/${emotion}.png" alt="${emotion}" />
	<input id="emotion-input" type="text" name="emotion" />
	<p id="example" style="opacity: 0;">Cuéntanos algo que te haga sentir de esa manera, por ejemplo:<br />
	<span id="emotion-example"></span></p>
	<button id="restart-button"  style="opacity: 0;">Tirar de nuevo</button>
	`;
	
	const example = document.querySelector('#example');
	const emotionExample = document.querySelector('#emotion-example');

	switch (emotion) {
		case 'tristeza':
			emotionExample.innerText = '"Máximo está triste porque extraña a sus amigos."';
			break;
		case 'miedo':
			emotionExample.innerText = '"Mónica siente miedo de no ir a la escuela por muchos meses."';
			break;
		case 'alegría':
			emotionExample.innerText = '"Pedro está contento porque está jugando más con su familia."';
			break;
		default:
			emotionExample.innerText = '"Juana está enojada porque no puede salir a andar en bicicleta."';
			break;
	}

	const restartButton = document.querySelector('#restart-button');
	restartButton.addEventListener('click', () => {
		module.style.opacity = 0;
		roulette.style.transform = 'none';
		setTimeout(() => {
			module.innerText = '';
			startButton.removeAttribute('disabled');
			startButton.style.opacity = 1;
		}, 5000);
	});

	setTimeout(() => {
		module.style.opacity = 1;
		const emotionInput = document.querySelector('#emotion-input');
		emotionInput.setAttribute('placeholder', 'Emoción');
		emotionInput.setAttribute('autofocus', true);
		emotionInput.addEventListener('keyup', ({ target }) => {
			if (target.value !== emotion) return;
			example.style.opacity = 1;
			setTimeout(() => {
				restartButton.style.opacity = 1;
			});
		});
	}, 5000);
});