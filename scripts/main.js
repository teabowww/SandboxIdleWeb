const gridWidth = 50;
const gridHeight = 50;
const cellSize = 10;

let grid = new SandGrid(gridWidth, gridHeight, cellSize);

let ants = [];

for (let i = 0; i < 10; i++) {
	let ant = new Ant(i, i);
	ants.push(ant);
}

ants.push(ant);

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
