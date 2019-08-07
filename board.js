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
		round: 0,
		tiles: [],
		teams: []
	}

	// create a board with no teams
	for (var y=0; y<board_size[1];y++) {
		var row = [];
		for (var x=0; x<board_size[0];x++) {
			row.push(null)
		}
		board.teams.push(row);
  }

  // generate random land/water tiles
	for (var y=0; y<board_size[1];y++) {
		var row = [];
		for (var x=0; x<board_size[0];x++) {
			row.push(choose(tiles))
		}
		board.tiles.push(row);
  }

  // nuke islands
  var cell;
	while (find_islands().length) {
		cell = shuffle(find_islands())[0];
		if      (cell.tile === tiles[0]) board.tiles[cell.y][cell.x] = tiles[1];
		else if (cell.tile === tiles[1]) board.tiles[cell.y][cell.x] = tiles[0];
	}

  // spawn teams
  board.teams = [];
	var grass_seed_list = [tree, tree, tree, tree, tree, tree, bug, bug, snake];
  var water_seed_list = [seaweed, seaweed, seaweed, seaweed, seaweed, seaweed, fish, fish, bird];
	for (var y=0; y<board_size[1];y++) {
		var row = [];
		for (var x=0; x<board_size[0];x++) {
			if (Math.random() < 0.40) {
        if (board.tiles[y][x].name === "grass") {
          row.push(choose(grass_seed_list)())
        } else if (board.tiles[y][x].name === "water") {
          row.push(choose(water_seed_list)())
        }
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

  if (tile === water) {
    for (var c = 0; c < 9; c++) {
      tile_elem.children[c].style.backgroundPosition = tile.backgroundPosition();
    }
  }
  else if (tile === grass) {
    for (var c = 0; c < 9; c++) {
      tile_elem.children[c].style.backgroundPosition = tile.backgroundPosition(4);
    };

    var uptile = get_cell_at_coords(x, y).at_offset(0, -1);
    var lefttile = get_cell_at_coords(x, y).at_offset(-1, 0);
    var downtile = get_cell_at_coords(x, y).at_offset(0, 1);
    var righttile = get_cell_at_coords(x, y).at_offset(1, 0);
    if (lefttile && lefttile.tile.name === "water") {
      tile_elem.children[0].style.backgroundPosition = tile.backgroundPosition(5);
      tile_elem.children[3].style.backgroundPosition = tile.backgroundPosition(5);
      tile_elem.children[6].style.backgroundPosition = tile.backgroundPosition(5);
    }
    if (righttile && righttile.tile.name === "water") {
      tile_elem.children[2].style.backgroundPosition = tile.backgroundPosition(3);
      tile_elem.children[5].style.backgroundPosition = tile.backgroundPosition(3);
      tile_elem.children[8].style.backgroundPosition = tile.backgroundPosition(3);
    }
    if (uptile && uptile.tile.name === "water") {
      if (lefttile && lefttile.tile.name === "water") {
        tile_elem.children[0].style.backgroundPosition = tile.backgroundPosition(9);
      } else {
        tile_elem.children[0].style.backgroundPosition = tile.backgroundPosition(7);
      }
      tile_elem.children[1].style.backgroundPosition = tile.backgroundPosition(7);
      if (righttile && righttile.tile.name === "water") {
        tile_elem.children[2].style.backgroundPosition = tile.backgroundPosition(10);
      } else {
        tile_elem.children[2].style.backgroundPosition = tile.backgroundPosition(7);
      }
    }
    if (downtile && downtile.tile.name === "water") {
      if (lefttile && lefttile.tile.name === "water") {
        tile_elem.children[6].style.backgroundPosition = tile.backgroundPosition(11);
      } else {
        tile_elem.children[6].style.backgroundPosition = tile.backgroundPosition(1);
      }
      tile_elem.children[7].style.backgroundPosition = tile.backgroundPosition(1);
      if (righttile && righttile.tile.name === "water") {
        tile_elem.children[8].style.backgroundPosition = tile.backgroundPosition(12);
      } else {
        tile_elem.children[8].style.backgroundPosition = tile.backgroundPosition(1);
      }
    }
  }

	tile_elem.style.backgroundSize = tile_map_width + "px";

  team_elem.style.backgroundImage = team && "url(" + team.backgroundImage + ")";
  team_elem.style.backgroundPosition = team && team.backgroundPosition;
}
function render_board() {
	var body_classes = document.body.className.replace(/\bdidaction\b/, '');

	if (is_cooling_down()) {
		body_classes += " didaction";
	}
	document.body.className = body_classes;

	for (var y=0; y<board_size[1];y++) {
		for (var x=0; x<board_size[0];x++) {
			render_cell(x, y,
				board.tiles[y][x],
				board.teams[y][x]
			);
		}
	}
	var stats = get_board_stats(board);
	document.getElementById("species-count").innerText = stats.team_count;
	document.getElementById("round-number").innerText = board.round;
}

function find_occupied_cells(by_team) {
	var coords = [];
	for (var y=0; y<board_size[1];y++) {
		for (var x=0; x<board_size[0];x++) {
			var entity = board.teams[y][x];
			if (entity && (entity.name == by_team || by_team === undefined)) {
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
			if (occupied.indexOf(x + ',' + y) == -1) {
				coords.push([x, y]);
			}
		}
	}
	return coords;
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
			if (cell.entity === null) {
				return cell.entity === of_team;
			}
			return cell.entity.name === of_team;
		})
	}
	if (of_tile !== undefined) {
		cells = cells.filter(function(cell) {
			return cell.tile.name === of_tile;
		})
	}
	return cells;
}
function get_board_stats(board) {
	var tiles = {};
	var teams = {
		'shark': 0,
		'dragon': 0,
	};
	var team_count = 0;

	board.tiles.forEach(function(tilerow) {
		tilerow.forEach(function(tile) {
			tiles[tile.name] = tiles[tile.name] || 0;
			tiles[tile.name] += 1;
		});
	});
	board.teams.forEach(function(entityrow) {
		entityrow.forEach(function(entity) {
			if (entity === null) {
				return
			}
			if (!teams[entity.name]) {
				teams[entity.name] = 0;
				if (entity._type == "species") {
					team_count += 1;
				}
			}
			teams[entity.name] += 1;
		});
	});

	return {
		round: board.round,
		tiles: tiles,
		teams: teams,
		team_count: team_count,
	}
}
