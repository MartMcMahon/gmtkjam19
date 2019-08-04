function hash(s) {
  s = "" + s;
  var h = 0, l = s.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

function deterministic_random_choice(cell, choices) {
	var i = hash(board.round) + hash(cell.x & cell.y) + hash(choices.length);
	return choices[i % choices.length];
}

function wander(critter, tile_types) {
	var destinations = [];
	tile_types.forEach(function(tile_type) {
		destinations = destinations.concat(critter.adjacent({team: null, tile: tile_type}));
	});
	if (!destinations.length) {
		return null;
	}
	return deterministic_random_choice(critter, destinations);
}

function find_food(critter, foods, tile_types) {
	var food_options = [];
	foods.forEach(function(food) {
	    tile_types.forEach(function(tile_type) {
	    	food_options = food_options.concat(critter.adjacent({team: food, tile: tile_type}))
	    });
	});
	if (!food_options.length) {
		return null;
	}
	return deterministic_random_choice(critter, food_options);
}
function eat_or_move(board, critter, foods, tile_types) {
	var food = find_food(critter, foods, tile_types);
	if (food) {
		board.teams[food.y][food.x] = critter.entity.constructor();
		critter.entity.rounds_since_eating = 0
		return;
	}
	else {
		critter.entity.rounds_since_eating += 1;
		if (critter.entity.rounds_since_eating > critter.entity.starvation_time) {
		  var recycler = critter.tile.name == "grass" ? mushroom() : snail();
			board.teams[critter.y][critter.x] = recycler;
			return
		}
	}

	var destination = wander(critter, tile_types);
	if (destination) {
		board.teams[critter.y][critter.x] = null;
		board.teams[destination.y][destination.x] = critter.entity;
		return;
	}
}

function add_random_creature(teams) {
		var team = choose(teams)();
		var cells = get_cells_for_coords(find_unoccupied_cells()).filter(function(cell) {
			return team.habitat.indexOf(cell.tile) !== -1;
		});
		var cell = choose(cells);
		board.teams[cell.y][cell.x] = team;
}

function plant_growth(critter_class, tile_type, recycler_type) {
	if (board.round % 3 !== 0) {
		return;
	}
  var critter_type = critter_class().name;
	var destinations = [].concat(
		get_cells_for_coords(find_occupied_cells(recycler_type)),
		get_cells_for_coords(find_unoccupied_cells()).filter(function (cell) {
			return cell.tile.name === tile_type
		}),
	);
	destinations.filter(function(cell) {
		var adjacent_friendlies = [].concat(
			cell.adjacent({team: critter_type}),
			cell.adjacent({team: recycler_type}),
		);
		return adjacent_friendlies.length >= 2;	
	}).forEach(function(cell) {
		board.teams[cell.y][cell.x] = critter_class();
	});
}

function addScarecrow(coords) {
  console.log('adding scarecrow here', coords);
  console.log(board.teams);
}

function addNoStep(coords) {
  console.log('adding no step here', coords);
}




var critter_priority = [
	'dragon', 'shark',
	'bird', 'snake',
	'bug', 'fish',
	'tree', 'seaweed',
	'mushroom', 'snail'
]
function game_tick() {
	board.round += 1;

	var critter;
	var critters = get_cells_for_coords(find_occupied_cells());
	critters.forEach(function(critter) {
		critter.age += 1;
	});
	critters.sort(function(a, b) {
		return hash(board.round + "" + JSON.stringify(a)) < hash(board.round + "" + JSON.stringify(b))
	})

	for (var ci=0; ci < critter_priority.length; ci++) {
		var critter_type = critter_priority[ci];
		for (var i=0; i < critters.length; i++) {
			critter = critters[i];
			if (critter.entity.name !== critter_type) {
				continue;
			}
			if (board.teams[critter.y][critter.x].name !== critter.entity.name) {
				continue;
			}

			switch (critter.entity.name) {
				// Apex Predators
				case 'dragon':
					eat_or_move(board, critter, ['bird'], ['grass']);
					break;
				case 'shark':
					eat_or_move(board, critter, ['snake'], ['water']);
					break;

				// Predators
				case 'bird':
					eat_or_move(board, critter, ['bug', 'snake', 'fish'], ['grass', 'water']);
					break;
				case 'snake':
					eat_or_move(board, critter, ['fish', 'bird', 'bug'], ['grass', 'water']);
					break;

				// Herbavores
				case 'bug':
					eat_or_move(board, critter, ['tree'], ['grass']);
					break;
				case 'fish':
					eat_or_move(board, critter, ['seaweed'], ['water']);
					break;

				// Plants (handled later)
				case 'tree':
				case 'seaweed':
					break

				// Recyclers (handled later)
				case 'mushroom':
				case 'snail':
					break

				default:
					console.log("got an unexpected critter in game_tick(): " + JSON.stringify(critter))
			}
		}
	}

	plant_growth(tree, 'grass', 'mushroom');
	plant_growth(seaweed, 'water', 'snail');

	var stats = get_board_stats(board);
	if (stats.teams.bird > 10 && stats.teams.dragon < 2) {
		add_random_creature([dragon]);
	}
	if (stats.teams.snake > 10 && stats.teams.shark < 2) {
		add_random_creature([shark]);
	}

	render_board();
}
