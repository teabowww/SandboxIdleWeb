const gridWidth = 50;
const gridHeight = 50;
const cellSize = 10;

let grid = new SandGrid(gridWidth, gridHeight, cellSize);

let ants = [];
let ant = new Ant(0, 0);

ants.push(ant);

setupGame();

function setupGame() {
	
}

function updateGame(deltaTime, totalTime) {
	grid.updateGrid();

	updateAnts();
}

function updateAnts() {
	for (const ant of ants) {
		ant.move();
	}
}
