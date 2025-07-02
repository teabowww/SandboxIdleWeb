const gridWidth = 20;
const gridHeight = 20;
const cellSize = 20;

let grid = new SandGrid(gridWidth, gridHeight, cellSize);

setupGame();

function setupGame() {
	
}

function updateGame(deltaTime, totalTime) {
	grid.updateGrid();
}
