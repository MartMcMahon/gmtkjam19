round_events = {};

cooldown = 2;
function is_cooling_down() {
	for (var i=cooldown; i--;) {
		console.log(board.round + " -- " + (board.round - i) + ' -- ' + round_events[board.round - i]);
		if (round_events[board.round - i] !== undefined) {
			return true;
		}
	}
	return false;
}
function register_event(event_name) {
	if (is_cooling_down()) {
		return false;
	}
	round_events[board.round] = event_name;
	return true;
}

function do_kill(percentage, by_team) {
	var occupied = find_occupied_cells(by_team);
	occupied = shuffle(occupied);
	for (var i=Math.ceil(occupied.length * percentage); i--;) {
		var coords = occupied[i];
		var x = coords[0];
		var y = coords[1];

		board.teams[y][x] = null;
	}
}

function kill(percentage, by_team) {
	if (!register_event('kill:' + Math.round(percentage * 100) + "%:" + by_team)) {
		return
	}
	do_kill(percentage, by_team);
	render_board();
}

function plague(by_team) {
	if (!register_event('plague:' + by_team)) {
		return
	}
	var nemesi = {
		"tree": [bug],
		"seaweed": [fish],
		"bug": [snake, bird],
		"fish": [snake, bird],
		"snake": [bird, shark],
		"bird": [snake, dragon],
		"dragon": [tree],
		"shark": [seaweed],
		"mushroom": [tree],
		"snail": [seaweed],
	};

	do_kill(plague_ratio, by_team);
	add_random_creature(nemesi[by_team]);

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
	if (!register_event('spawn')) {
		return
	}
	for (var i=8; i--;) {
		add_random_creature(teams);
	}
	render_board();
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
