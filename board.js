var board;

function find_islands() {
	var islands = [];
	var cell, top, bottom, left, right;
	for (var y=0; y<board_size[1];y++) {
		for (var x=0; x<board_size[0];x++) {
			cell = get_cell_at_coords(x, y);
			
			top = cell.at_offset(0, -1);
			bottom = cell.at_offset(0, 1);
			left = cell.at_offset(-1, 0);
			right = cell.at_offset(1, 0);

			if (	   (!top    || top.tile    !== cell.tile)
					&& (!bottom || bottom.tile !== cell.tile)
					&& (!left   || left.tile   !== cell.tile)
					&& (!right  || right.tile  !== cell.tile)
					) {
				islands.push(cell)
			}
		}
	}
	return islands;
}

function init_board() {
	board = {
		round: 1,
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
	var cell;
	while (find_islands().length) {
		cell = shuffle(find_islands())[0];
		if      (cell.tile === tiles[0]) board.tiles[cell.y][cell.x] = tiles[1];
		else if (cell.tile === tiles[1]) board.tiles[cell.y][cell.x] = tiles[0];
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
function get_cell_at_coords(x, y) {
	return {
		x: x, y: y,
		tile: board.tiles[y][x],
		entity: board.teams[y][x],
		at_offset: function(dx, dy) {
			var new_coords = get_coords_with_offset(x, y, dx, dy);
			if (new_coords === null) {
				return null;
			}
			return get_cell_at_coords.apply(null, new_coords)
		},
		adjacent: function(opts) {
			return get_adjacent_cells(x, y, opts.team, opts.tile);
		}
	}
}
function get_cells_for_coords(coords) {
	var cells = [];
	for (var i=0; i < coords.length; i++) {
		cells.push(get_cell_at_coords(coords[i][0], coords[i][1]));
	}
	return cells;
}
function get_coords_with_offset(x, y, dx, dy) {
	var newx = x + dx;
	var newy = y + dy;
	if (newx < 0 || newx >= board_size[0] || newy < 0 || newy >= board_size[1]) {
		return null;
	}
	return [newx, newy];
}
function get_adjacent_cell(x, y, dx, dy) {
	return get_cell_at_coords.apply(null, get_coords_with_offset(x, y, dx, dy))
}
function get_adjacent_cells_coords(x, y) {
	var coords = [];
	var point;
	for (var xi=-1; xi<=1; xi++) {
		for (var yi=-1; yi<=1; yi++) {
			// skip the cell we're searching around
			if (xi == 0 && yi == 0) continue;
			
			point = get_coords_with_offset(x, y, xi, yi);
			
			// skip outside the map
			if (point === null) {
				continue
			}
			
			coords.push(point);
		}
	}
	return coords;
}
function get_adjacent_cells(x, y, of_team, of_tile) {
	var cells = get_cells_for_coords(get_adjacent_cells_coords(x, y));
	if (of_team !== undefined) {
		cells = cells.filter(function(cell) {
			return cell.entity === of_team;
		})
	}
	if (of_tile !== undefined) {
		cells = cells.filter(function(cell) {
			return cell.tile === of_tile;
		})
	}
	return cells;
}
function get_board_stats(board) {
	var tiles = {};
	var teams = {};
}
