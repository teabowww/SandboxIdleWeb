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

	getCell(x, y) {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) { return 0; }

		return this.grid[y][x];
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

		// Set display grid column and row lengths
		this.gridDisplay.style.gridTemplateColumns = `repeat(${this.width}, ${this.cellSize}px)`;
		this.gridDisplay.style.gridTemplateRows = `repeat(${this.width}, ${this.cellSize}px)`;

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {

				//console.log(getRandomInt(1));

				let cell = document.createElement("div");

				cell.classList.add("grid-cell");

				cell.style.width = `${this.cellSize}px`;
				cell.style.height = `${this.cellSize}px`;

				cell.dataset.x = x;
				cell.dataset.y = y;

				let cellColor = this.getCellValueColor(x, y);
				
				cell.style.backgroundColor = cellColor;

				this.gridDisplay.appendChild(cell);
			}
		}
	}

	damageCell(x, y, damage) {
		if (this.grid[y][x] > 0) {

			this.grid[y][x] -= damage;

			this.updateCellColor(x, y);

			if (this.grid[y][x] <= 0) {
				incrementPixels(1);
			}
		}
	}

	updateCellColor(x, y, color = null) {
		let cell = document.querySelector(`#grid-display .grid-cell[data-x="${x}"][data-y="${y}"]`);

		if (!color) {
			color = this.getCellValueColor(x, y);
		}

		if (cell) {
			cell.style.backgroundColor = color;
		}
	}

	getCellValueColor(x, y) {
		let cellValue = this.grid[y][x];

		let color = document.body.style.backgroundColor;

		if (cellValue && cellValue > 0) {
			const colorValue = 255 - (cellValue - 1) * 5;
			color = `rgb(${colorValue}, ${colorValue}, 0)`;
		}

		return color;
	}

	mouseToGrid(mouseX, mouseY) {
		// Convert relatvie mouse position on grid to grid coordinates
		const rect = this.gridDisplay.getBoundingClientRect();
			
		const relativeX = event.clientX - rect.left;
		const relativeY = event.clientY - rect.top;

		const gridX = Math.floor(relativeX / this.cellSize);
		const gridY = Math.floor(relativeY / this.cellSize);

		return { x: gridX, y: gridY };
	}

	onClick(event) {
		const gridPos = this.mouseToGrid(event.x, event.y);

		this.damageCell(gridPos.x, gridPos.y, 1);
	}
}