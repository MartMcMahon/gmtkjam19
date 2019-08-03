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
function get_cell_at_coords(x, y) {
	return {
		x: x, y: y,
		tile: board.tiles[y][x],
		entity: board.teams[y][x]
	}
}
function get_cells_for_coords(coords) {
	var cells = [];
	for (var i=0; i < coords.length; i++) {
		cells.push(get_cell_at_coords(coords[0], coords[1]));
	}
	return cells;
}
function get_adjacent_cell_coords(x, y) {
	var coords = [];
	for (var xi=-1; xi<=1; i++) {
		for (var yi=-1; yi<=1; i++) {
			// skip the cell we're searching around
			if (xi == 0 && yi == 0) continue;
			
			// skip outside the map
			if (x + xi < 0 || x + xi > board_size[0]
				|| y + yi < 0 || y + yi > board_size[1]) {
				continue
			}
			
			coords.append([x + xi, y + yi]);
		}
	}
	return coords;
}
function get_adjacent_cells(x, y) {
	return get_cells_for_coords(get_adjacent_cell_coords(x, y))
}