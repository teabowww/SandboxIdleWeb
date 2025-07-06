const gridWidth = 50;
const gridHeight = 50;
const cellSize = 10;

let grid = new SandGrid(gridWidth, gridHeight, cellSize);

setupGame();

function setupGame() {
	setupShop();
}

function updateGame(deltaTime, totalTime) {
	grid.updateGrid();

	updateAnts(deltaTime);
}

function updateAnts(deltaTime) {
	for (const ant of ants) {
		ant.update(deltaTime);
		ant.render();
	}
}
