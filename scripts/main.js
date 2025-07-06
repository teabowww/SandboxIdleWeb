const gridWidth = 50;
const gridHeight = 50;
const cellSize = 10;

let grid = new SandGrid(gridWidth, gridHeight, cellSize);

let ants = [];

for (let i = 0; i < 5; i++) {
	let coord = i * 5
	let ant = new Ant(coord, coord);
	ants.push(ant);
}

setupGame();

function setupGame() {
	
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
