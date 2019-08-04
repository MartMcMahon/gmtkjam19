var tile_map_width = 1920;

var grass = {
  name: "grass",
  backgroundPosition: function(sliceIndex) {
    var coords = assets_grassSprites[sliceIndex];
    if (sliceIndex === 4) { coords = [0, 0]; }
    return getBackgroundPositionString(coords);
  }
};

var water = {
  name: "water",
  backgroundPosition: function() {
    var coordList = [
      [48, 112],
      [0, 16], [16, 16], [32, 16], [48, 16],
      [0, 32], [16, 32], [32, 32], [48, 32]
    ];
    var index = 0;
    if (Math.random() < 0.10) {
      index = randint(1, 9);
    }

    return getBackgroundPositionString(coordList[index]);
  }
}

function species(entity) {
	entity._type = "species";
	entity.age = 0
	entity.rounds_since_eating = 0;
	entity.starvation_time = entity.starvation_time || Infinity;
	return entity
}

function bird() {
  return species({
  	constructor: bird, name: "bird",
  	starvation_time: 8,
  	backgroundImage: "./gfx/ent-bird.png", backgroundPosition: "50% 50%", habitat: [grass, water]
  });
}
function bug() {
  return species({
  	constructor: bug, name: "bug",
  	backgroundImage: "./gfx/ent-bug.png" , backgroundPosition: "50% 50%", habitat: [grass]
  });
}
function dragon() {
  return species({
  	constructor: dragon, name: "dragon",
  	starvation_time: 16,
  	backgroundImage: "./gfx/ent-dragon.png", backgroundPosition: "50% 50%", habitat: [grass]
  });
}
function fish() {
  return species({ constructor: fish, name: "fish", backgroundImage: "./gfx/ent-fish.png", backgroundPosition: "50% 50%", habitat: [water] });
}
function mushroom() {
  return species({ constructor: mushroom, name: "mushroom", recycler: true, backgroundImage: "./gfx/ent-mushroom.gif", backgroundPosition: "50% 50%", habitat: [grass] });
}
function seaweed() {
  return species({ constructor: seaweed, name: "seaweed", backgroundImage: "./gfx/ent-seaweed.png", backgroundPosition: "50% 50%", habitit: [water] });
}
function shark() {
  return species({
  	constructor: shark, name: "shark",
  	starvation_time: 16,
  	backgroundImage: "./gfx/ent-shark.png", backgroundPosition: "50% 50%", habitat: [water]
  });
}
function snail() {
  return species({ constructor: snail, name: "snail", recycler: true, backgroundImage: "./gfx/ent-snail.png", backgroundPosition: "50% 50%", habitat: [water] });
}
function snake() {
  return species({
  	constructor: snake, name: "snake",
  	starvation_time: 8,
  	backgroundImage: "./gfx/ent-snake.png", backgroundPosition: "50% 50%", habitat: [grass, water]
  });
}
function tree() {
  return species({ constructor: tree, name: "tree", backgroundImage: "./gfx/ent-tree2.png", backgroundPosition: "50% 50%", habitat: [grass] });
}

// flags
function scarecrow() {
  var ent = species({ name: "scarecrow", backgroundImage: "./gfx/pixel-scarecrow.png", backgroundPosition: "50% 50%", habitat: [grass] });
	ent._type = "nonspecies";
  return ent;
}
function flag() {
  var ent = species({ name: "flag", backgroundImage: "./gfx/pixel-no-step.png", backgroundPosition: "50% 50%", habitat: [grass] });
	ent._type = "nonspecies";
  return ent;
}

var tiles = [
	grass, water // , desert, forest
]
var teams = [
	bird,
  bug,
  dragon,
  fish,
  mushroom,
  seaweed,
  shark,
  snail,
  snake,
  tree
]

var team_lookup = {};
for (var i=teams.length; i--;) {
	team_lookup[teams[i]().name] = teams[i]
}
