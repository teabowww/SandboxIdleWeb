const gridWidth = 80;
const gridHeight = 80;
const cellSize = 10;

let grid = new SandGrid(gridWidth, gridHeight, cellSize);

setupGame();

function setupGame() {
	
}

function updateGame(deltaTime, totalTime) {
	grid.updateGrid();
}
