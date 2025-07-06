function setupShop() {
	updateAntShop()

	let buyAntBtn = document.getElementById("breaker0-buy");

	buyAntBtn.onclick = function() {
		buyAnt();
	}
}