var board;

function init_board() {
	board = {
		tiles: [],
		teams: []
	}
	for (var y=0; y<board_size[1];y++) {
		var row = [];
		for (var x=0; x<board_size[0];x++) {
			row.push(choose(tiles))
		}
		board.tiles.push(row);
	}
	for (var y=0; y<board_size[1];y++) {
		var row = [];
		for (var x=0; x<board_size[0];x++) {
			if (Math.random() > 0.7) {
				row.push(choose(teams))
			}
			else {
				row.push(null);
			}

		}
		board.teams.push(row);
	}
}

function render_cell(x, y, tile, team) {
	var tile_elem = document.getElementById('tile-' + x + '-' + y);
	var team_elem = document.getElementById('entity-' + x + '-' + y);

	tile_elem.style.backgroundPosition = tile.backgroundPosition;
	tile_elem.style.backgroundSize = "1920px";

	team_elem.style.background = team ? team.color : 'transparent';
}
function render_board() {
	for (var y=0; y<board_size[1];y++) {
		for (var x=0; x<board_size[0];x++) {
			render_cell(x, y,
				board.tiles[y][x],
				board.teams[y][x]
			);
		}
	}
}

function find_occupied_cells(by_team) {
	var coords = [];
	for (var y=0; y<board_size[1];y++) {
		for (var x=0; x<board_size[0];x++) {
			var entity = board.teams[y][x];
			if (entity && (entity == by_team || by_team === undefined)) {
				coords.push([x, y]);
			}
		}
	}
	return coords;
}
function get_entity_count(of_team) {
	return find_occupied_cells(of_team).length;
}