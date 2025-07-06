let ants = [];

let antAmount = 0;
let antCost = 10;
let antCostMult = 1.4;

function buyAnt() {
	if (pixels >= antCost) {
		pixels -= antCost;
		updatePixelCount();
		
		antAmount += 1;
		antCost = Math.floor(antCost * antCostMult);

		updateAntShop();

		spawnAnt();
	}
}

function updateAntShop() {
	let antCostDisplay = document.getElementById("breaker0-cost");
	let antAmountDisplay = document.getElementById("breaker0-amount");

	antCostDisplay.innerText = antCost;
	antAmountDisplay.innerText = antAmount;
}

function spawnAnt() {
	let x = getRandomInt(grid.width);
	let y = getRandomInt(grid.height);

	let ant = new Ant(x, y);

	ants.push(ant);
}

class Ant {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "red";
		this.timer = 0
		this.delay = 1000;
	}	

	update(deltaTime) {
		this.timer += deltaTime;

		if (this.timer >= this.delay) {
			this.timer -= this.delay;
			this.timer = 0;

			let directions = this.getDirections();
			let direction = directions[getRandomInt(directions.length)];

			this.move(direction.x, direction.y);
		}

		if (!grid.getCell(this.x, this.y + 1)) {
			this.move(0, 1);
		}

	}

	move(dx, dy) {
		let newX = this.x + dx;
		let newY = this.y + dy;

		if (newX < 0 || newX >= grid.width || newY < 0 || newY >= grid.height) { return; }

		let oldX = this.x;
		let oldY = this.y;

		this.x = newX;
		this.y = newY;

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