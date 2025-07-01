class SandGrid {
	constructor(width, height, cellSize) {
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;
		this.grid = Array.from({ length: width }, () => Array(height).fill(1));
		this.gridDisplay = document.getElementById("grid-display");

		this.setupGridDisplay();
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

	setCellColor(x, y, color) {
		let cell = document.querySelector(`#grid-display .grid-cell[data-x="${x}"][data-y="${y}"]`);

		if (cell) {
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
			this.setCellColor(gridX, gridY, document.body.style.backgroundColor);
		}
	}
}