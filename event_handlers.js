function decimate(by_team) {
	var occupied = find_occupied_cells(by_team);
	occupied = shuffle(occupied);
	for (var i=Math.ceil(occupied.length / 10); i--;) {
		var coords = occupied[i];
		var x = coords[0];
		var y = coords[1];

		board.teams[y][x] = null;
	}
	render_board();
}
function spawn(by_team) {

}