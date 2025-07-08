function setupShop() {
	updateAntShop()

	let buyAntBtn = document.getElementById("breaker0-buy");
	buyAntBtn.onclick = function() {
		buyAnt();
	}

	let buyBombBtn = document.getElementById("breaker1-buy");
	buyBombBtn.onclick = function() {
		spawnBomb(2);
	}
}