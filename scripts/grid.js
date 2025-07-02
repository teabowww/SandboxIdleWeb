class SandGrid {
	constructor(width, height, cellSize) {
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;
		this.grid = Array.from({ length: width }, () => Array(height).fill(1));
		this.gridDisplay = document.getElementById("grid-display");

		this.setupGridDisplay();
	}

	updateGrid() {
		for (let y = 0; y < this.height - 1; y++) {
			for (let x = 0; x < this.width; x++) {
				let cellValue = this.grid[y][x]
				let moveCellValue = this.grid[y + 1][x];

				if (cellValue <= 0) { continue; }

				const canMoveDown = this.grid[y + 1][x] <= 0;
				const canMoveRight = this.grid[y][x + 1] <= 0 && this.grid[y + 1][x + 1] <= 0;
				const canMoveLeft = this.grid[y][x - 1] <= 0 && this.grid[y + 1][x - 1] <= 0;

				if (canMoveDown) {
					this.moveCell(x, y, x, y + 1);
				}

				else if (canMoveRight && canMoveLeft) {
					getRandomInt(1) == 1 ?
						this.moveCell(x, y, x + 1, y) :
						this.moveCell(x, y, x - 1, y)
				}

				else if (canMoveRight) {
					this.moveCell(x, y, x + 1, y);
				}

				else if (canMoveLeft) {
					this.moveCell(x, y, x - 1, y);
				}
			}
		}
	}

	moveCell(x, y, toX, toY) {
		let cellValue = this.grid[y][x];
		let moveCellValue = this.grid[toY][toX];

		this.grid[toY][toX] = cellValue;
		this.grid[y][x] = moveCellValue;

		this.updateCellColor(x, y);
		this.updateCellColor(toX, toY);
	}

	setupGridDisplay() {
		this.gridDisplay.onclick = (event) => this.onClick(event);

		this.gridDisplay.innerHTML = "";

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {

				let cell = document.createElement("div");

				cell.classList.add("grid-cell");

				cell.dataset.x = x;
				cell.dataset.y = y;

				let cellValue = this.grid[y][x];
				let cellColor = cellValue > 0 ? "yellow" : document.body.style.backgroundColor;
				
				cell.style.backgroundColor = cellColor;

				this.gridDisplay.appendChild(cell);
			}
		}
	}

	updateCellColor(x, y) {
		let cell = document.querySelector(`#grid-display .grid-cell[data-x="${x}"][data-y="${y}"]`);

		if (cell) {
			let color = this.grid[y][x] > 0 ? "yellow" : document.body.style.backgroundColor;
			cell.style.backgroundColor = color;
		}
	}

	onClick(event) {
		const rect = this.gridDisplay.getBoundingClientRect();
			
		const relativeX = event.clientX - rect.left;
		const relativeY = event.clientY - rect.top;

		const gridX = Math.floor(relativeX / this.cellSize);
		const gridY = Math.floor(relativeY / this.cellSize);

		if (this.grid[gridY][gridX] > 0) {
			this.grid[gridY][gridX] -= 1;
		}

		if (this.grid[gridY][gridX] <= 0) {
			incrementPixels(1);
			this.updateCellColor(gridX, gridY);
		}
	}
}