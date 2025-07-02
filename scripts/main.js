const gridWidth = 50;
const gridHeight = 50;
const cellSize = 10;

let grid = new SandGrid(gridWidth, gridHeight, cellSize);

setupGame();

function setupGame() {
	
}

function updateGame(deltaTime, totalTime) {
	grid.updateGrid();
}
