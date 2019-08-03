function randint(min, max) {
	return Math.floor(min + (Math.random() * (max-min)))
}
function choose(list) {
	return list[randint(0, list.length)];
}
function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
