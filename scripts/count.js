let pixels = 0;

function incrementPixels(amount, deltaTime) {
	if (!deltaTime) {
		deltaTime = 1000;
	}

	amount *= 0.001;

	pixels += amount * deltaTime;
	updatePixelCount()
};

function updatePixelCount() {
	pixelCount = document.getElementById("pixel-count");
	pixelCount.innerHTML = Math.round(pixels);
}