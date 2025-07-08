class SandGrid {
	constructor(width, height, cellSize) {
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;
		this.grid = Array.from({ length: width }, () => Array(height).fill(1));
		this.gridCanvas = document.getElementById("grid-canvas");
		this.gridCanvasContext = this.gridCanvas.getContext("2d");
		this.setupGridCanvas();
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

	setupGridCanvas() {
		this.gridCanvas.width = this.width * this.cellSize;
		this.gridCanvas.height = this.height * this.cellSize;

		this.gridCanvas.onclick = (event) => this.onClick(event);

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {

				let cellValue = this.grid[y][x];

				if (cellValue > 0) {
					let cellColor = this.getCellValueColor(x, y);
					this.gridCanvasContext.fillStyle = cellColor;

					this.gridCanvasContext.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
				}

				
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
		if (!color) {
			color = this.getCellValueColor(x, y);
		}

		this.gridCanvasContext.fillStyle = color;
		this.gridCanvasContext.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
	}

	getCellValueColor(x, y) {
		let cellValue = this.grid[y][x];

		let color = "#141121";

		if (cellValue && cellValue > 0) {
			const colorValue = 255 - (cellValue - 1) * 5;
			color = `rgb(${colorValue}, ${colorValue}, 0)`;
		}

		return color;
	}

	mouseToGrid(mouseX, mouseY) {
		// Convert relatvie mouse position on grid to grid coordinates
		const rect = this.gridCanvas.getBoundingClientRect();
			
		const relativeX = event.clientX - rect.left;
		const relativeY = event.clientY - rect.top;

		// rem (default font size) to pixel coordinates
    	//const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    	const gridX = Math.floor(relativeX / (this.cellSize));
   		const gridY = Math.floor(relativeY / (this.cellSize));
		return { x: gridX, y: gridY };
	}

	onClick(event) {
		const gridPos = this.mouseToGrid(event.x, event.y);

		this.damageCell(gridPos.x, gridPos.y, 1);
	}
}