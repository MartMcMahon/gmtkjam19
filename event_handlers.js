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
function spawn() {
	for (var i=5; i--;) {
		add_random_creature(teams);
	}
}

var gameInterval, animationTimeouts = [];
function cancelAnimationTimeouts() {
  for (var i=animationTimeouts.length;i--;) {
  	clearTimeout(animationTimeouts[i])
  }
  animationTimeouts = [];
}
function stop_game() {
  cancelAnimationTimeouts()
  clearInterval(gameInterval);
}
function run_game(round_duration, animate) {
	function go() {
		cancelAnimationTimeouts();
		if (animate !== false) {
			animationTimeouts.push(
				setTimeout(render_board, round_duration / 3)
			);
			animationTimeouts.push(
				setTimeout(render_board, 2 * round_duration / 3)
			);
		}
		game_tick();
	}
	
	gameInterval = setInterval(go, round_duration);
	if (animate !== false) {
		go()
	}
}

function fast_forward() {
	stop_game();
	run_game(ff_round_duration, false);
}
function normal_speed() {
	stop_game();
	run_game(round_duration);
}