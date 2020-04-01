const container = document.querySelector('#container');
const roulette = document.querySelector('.roulette');
const startButton = document.querySelector('#start-button');
let emotionRotations = [ 90, 180, 270, 360 ];
let emotion = '';

const generateRotation = () => {
	const number = Math.floor(Math.random() * 10 + 1);
	const index = Math.floor(Math.random() * emotionRotations.length); 
	const result = number * 360 + emotionRotations[index];
	emotionRotations.splice(index, 1);
	emotionRotations.length === 0 && (emotionRotations = [ 90, 180, 270, 360 ]);
	return result;
};

startButton.addEventListener('click', () => {
	startButton.setAttribute('disabled', true);
	startButton.style.cursor = 'disabled';
	startButton.style.opacity = 0.3;
	const rotationDegree = generateRotation();
	if (rotationDegree % 360 === 0) {
		emotion = 'ENOJO';
	} else if ((rotationDegree - 270) % 360 === 0) {
		emotion = 'TRISTEZA';
	} else if ((rotationDegree - 180) % 360 === 0) {
		emotion = 'ALEGRIA';
	} else {
		emotion = 'MIEDO';
	}
	
	roulette.style.transform = `rotate(${rotationDegree}deg)`;
	const module = document.querySelector('#module');

	
	module.innerHTML = `
	<h1 class="module-title">INGRESA EL NOMBRE DE ESTA EMOCION:</h1>
	<img class="emotion-picture" src="./images/${emotion}.png" alt="${emotion}" />
	<input id="emotion-input" type="text" name="emotion" />
	<p id="example" style="opacity: 0;">CUENTANOS ALGO QUE TE HAGA SENTIR DE ESA MANERA, POR EJEMPLO:<br />
	<span id="emotion-example"></span></p>
	<button id="restart-button"  style="opacity: 0;cursor: pointer;margin: 0;">TIRAR DE NUEVO</button>
	`;
	
	const example = document.querySelector('#example');
	const emotionExample = document.querySelector('#emotion-example');

	switch (emotion) {
		case 'TRISTEZA':
			emotionExample.innerText = '"Máximo está triste porque extraña a sus amigos."'.toUpperCase();
			break;
		case 'MIEDO':
			emotionExample.innerText = '"Mónica siente miedo de no ir a la escuela por varias semanas."'.toUpperCase();
			break;
		case 'ALEGRIA':
			emotionExample.innerText = '"Pedro está contento porque está jugando más con su familia."'.toUpperCase();
			break;
		default:
			emotionExample.innerText = '"Juana está enojada porque no puede salir a andar en bicicleta."'.toUpperCase();
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
			startButton.style.cursor = 'pointer';
		}, 5000);
	});

	setTimeout(() => {
		module.style.opacity = 1;
		const emotionInput = document.querySelector('#emotion-input');
		emotionInput.setAttribute('placeholder', 'Emoción');
		emotionInput.setAttribute('autofocus', true);
		emotionInput.addEventListener('keyup', ({ target }) => {
			emotionInput.value = target.value.toUpperCase();
			console.log(emotionInput.value);
			if (target.value !== emotion) return;
			example.style.opacity = 1;
			setTimeout(() => {
				restartButton.style.opacity = 1;
			});
		});
	}, 5000);
});