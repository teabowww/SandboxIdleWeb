class Ant {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "red";
		this.timer = 0
		this.delay = 1;
	}

	update(deltaTime) {
		this.timer += deltaTime;

		if (this.timer >= this.delay) {
			this.timer -= this.delay;
			this.timer = 0;

			let directions = this.getDirections();
			let direction = directions[getRandomInt(directions.length - 1)];

			this.move(direction.x, direction.y);
		}
	}

	move(dx, dy) {
		let oldX = this.x;
		let oldY = this.y;

		this.x += dx;
		this.y += dy;

		grid.damageCell(this.x, this.y, 1);

		// Upgrade grid display
		grid.updateCellColor(oldX, oldY);
	}

	render() {	
		grid.updateCellColor(this.x, this.y, this.color);
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
		});

		return validDirections; 
	}
}