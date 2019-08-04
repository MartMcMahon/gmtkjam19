function kill(percentage, by_team) {
	var occupied = find_occupied_cells(by_team);
	occupied = shuffle(occupied);
	for (var i=Math.ceil(occupied.length * percentage); i--;) {
		var coords = occupied[i];
		var x = coords[0];
		var y = coords[1];

		board.teams[y][x] = null;
	}
	render_board();
}

info_shown = false;
function toggle_info() {
	var info = document.getElementById('info');
	if (info_shown) {
		info.style.display = 'none';
	}
	else {
		info.style.display = 'block';
	}
	info_shown = !info_shown;
}

function goto_story() {
	document.getElementById('title-screen').style.display = 'none';
	document.getElementById('story-screen').style.display = 'block';
}
function dismiss_story() {
	document.getElementById('story-screen').style.display = 'none';
	run_game(round_duration);
}

function spawn() {
	for (var i=8; i--;) {
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