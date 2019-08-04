var tile_map_width = 1920;

var grass = {
  name: "grass",
  backgroundPosition: function(sliceIndex) {
    // var startCoords = getTileSpriteCoords("grass");
    // var startCoords = getGrassSprites();
    // console.log(assets_grassSprites);
    // var coords = getNineSliceList(startCoords[0], startCoords[1])[sliceIndex];
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
	return entity
}

function bird() {
  return species({ name: "bird", backgroundImage: "./gfx/ent-bird.png", backgroundPosition: "50% 50%", habitat: [grass, water] });
}
function bug() {
  return species({ name: "bug", backgroundImage: "./gfx/ent-bug.png" , backgroundPosition: "50% 50%", habitat: [grass] });
}
function dragon() {
  return species({ name: "dragon", backgroundImage: "./gfx/ent-dragon.png", backgroundPosition: "50% 50%", habitat: [grass] });
}
function fish() {
  return species({ name: "fish", backgroundImage: "./gfx/ent-fish.png", backgroundPosition: "50% 50%", habitat: [water] });
}
function mushroom() {
  return species({ name: "mushroom", backgroundImage: "./gfx/ent-mushroom.gif", backgroundPosition: "50% 50%", habitat: [grass] });
}
function seaweed() {
  return species({ name: "seaweed", backgroundImage: "./gfx/ent-seaweed.png", backgroundPosition: "50% 50%", habitit: [water] });
}
function shark() {
  return species({ name: "shark", backgroundImage: "./gfx/ent-shark.png", backgroundPosition: "50% 50%", habitat: [water] });
}
function snail() {
  return species({ name: "snail", backgroundImage: "./gfx/ent-snail.png", backgroundPosition: "50% 50%", habitat: [water] });
}
function snake() {
  return species({ name: "snake", backgroundImage: "./gfx/ent-snake.png", backgroundPosition: "50% 50%", habitat: [grass, water] });
}
function tree() {
  return species({ name: "tree", backgroundImage: "./gfx/ent-tree2.png", backgroundPosition: "50% 50%", habitat: [grass] });
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
