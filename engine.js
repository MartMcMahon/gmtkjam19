
function deterministic_random_choice(cell, choices) {
	var i = board.round + cell.x + cell.y + (choices.length * 3);
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
		food_options = food_options.concat(critter.adjacent({team: food, tile: tile_types}))
	});
	if (!food_options.length) {
		return null;
	}
	return deterministic_random_choice(critter, food_options);
}
function eat_or_move(newboard, critter, foods, tile_types) {
	var food = find_food(critter, foods, tile_types);
	if (food) {
		newboard.teams[food.y][food.x] = critter.entity;
		return;
	}
	
	var destination = wander(critter, tile_types);
	if (destination) {
		newboard.teams[critter.y][critter.x] = null;
		newboard.teams[destination.y][destination.x] = critter.entity;
		return;
	}
}


function game_tick() {
	var newboard = {
		round: board.round + 1,
		tiles: board.tiles.map(function(tile_row) {
			return tile_row.slice(0);
		}),
		teams: board.teams.map(function(team_row) {
			return team_row.slice(0);
		})
	}
	
	var critter;
	var critters = get_cells_for_coords(find_occupied_cells());
	for (var i=0; i < critters.length; i++) {
		critter = critters[i];
		switch (critter.entity) {
			// Apex Predators
			case dragon:
				eat_or_move(newboard, critter, [bird], [grass]);
				break;
			case shark:	
				eat_or_move(newboard, critter, [snake], [water]);
				break;
	
			// Predators
			case bird:
				eat_or_move(newboard, critter, [bug, fish, snake], [grass, water]);
				break;
			case snake:
				eat_or_move(newboard, critter, [bug, fish, bird], [grass, water]);
				break;
	
			// Herbavores
			case bug:
				eat_or_move(newboard, critter, [tree], [grass]);
				break;
			case fish:
				eat_or_move(newboard, critter, [seaweed], [water]);
				break;
	
			// Plants
			case tree:
				break;
			case seaweed:
				break;
	
			// Recyclers
			case mushroom:
				break;
			case snail:
				break
				
			default:
				console.log("got an unexpected critter in game_tick(): " + JSON.stringify(critter))
		}
	}
	
	
	
	board = newboard;
	render_board();
}