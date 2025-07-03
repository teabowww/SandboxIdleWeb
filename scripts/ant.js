class Ant {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "red";
	}

	move() {
		let oldX = Math.floor(this.x);;
		let oldY = Math.floor(this.y);

		let directions = this.getDirections();
		let direction = directions[getRandomInt(directions.length - 1)];

		this.x += direction.x;
		this.y += direction.y;

		let gridX = Math.floor(this.x);
		let gridY = Math.floor(this.y);

		grid.damageCell(gridX, gridY, 1);

		// Upgrade grid display
		grid.updateCellColor(gridX, gridY, this.color);
		grid.updateCellColor(oldX, oldY);
	}

	getDirections() {
		const directions = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];

		const validDirections = directions.filter((dir) => {
			const newX = this.x + dir.x;	
			const newY = this.y + dir.y;

			const isWithinBoundsX = newX >= 0 && newX < grid.width;
			const isWithinBoundsY = newY >= 0 && newY < grid.height;

			if (!isWithinBoundsX || !isWithinBoundsY) { return false; }
			
			return true;
			
			//return grid.grid[newY][newX] > 0; 
		});

		return validDirections; 
	}
}