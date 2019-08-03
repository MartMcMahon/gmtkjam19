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

	// tile_elem.style.backgroundPosition = tile.backgroundPosition;
	tile_elem.style.backgroundPosition = tile.backgroundPosition(s_index);
	tile_elem.style.backgroundSize = tile_map_width + "px";

  // team_elem.style.backgroundPosition = team && team.backgroundPosition;
  // team_elem.style.backgroundSize = tile_map_width + "px";
  team_elem.style.background = "transparent";
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
function find_unoccupied_cells(by_team) {
	var coords = [];
	var occupied = find_occupied_cells(by_team);
	for (var i=occupied.length; i--;) {
		occupied[i] = occupied[i].join(',');
	}

	for (var y=0; y<board_size[1];y++) {
		for (var x=0; x<board_size[0];x++) {
			var entity = board.teams[y][x];
			if (occupied.indexOf(entity.join(',')) == -1) {
				coords.push([x, y]);
			}
		}
	}
}
function get_entity_count(of_team) {
	return find_occupied_cells(of_team).length;
}
