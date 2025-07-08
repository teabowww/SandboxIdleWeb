	function spawnBomb(radius) {
		let x = getRandomInt(grid.width - 2 * radius) + radius;
		let y = getRandomInt(grid.height - 2 * radius) + radius;

		for (let dy = -radius; dy <= radius; dy++) {
			for (let dx = -radius; dx <= radius; dx++) {
				if (Math.abs(dx) + Math.abs(dy) <= radius) {
					grid.damageCell(x + dx, y + dy, 1);
				}
			}
		}
	}