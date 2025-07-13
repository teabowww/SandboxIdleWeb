let lastTime = null;
let totalTime = 0;

window.setInterval(function() {
	const currentTime = performance.now();

	if (lastTime === null) {
		lastTime = currentTime;
	} 

	const deltaTime = currentTime - lastTime;

	totalTime += deltaTime;

	lastTime = currentTime;

	updateGame(deltaTime, totalTime);
}, 1000 / 30);
