var tile_size = 48;
var tile_map_width = 1920;

var grass = {
  name: "grass",
  backgroundPosition: function(sliceIndex) {
    var startCoords = getTileSpriteCoords("grass");
    var coords = getNineSliceList(startCoords[0], startCoords[1])[sliceIndex];
    if (sliceIndex === 4) { coords = [0, 0]; }
    return getBackgroundPositionString(coords);
  }
};

var water = {
  name: "water",
  backgroundPosition: function() {
    var coordList = [
      [48, 112], [0, 48], [48, 48], [96, 48], [144, 48],
      [0, 96], [48, 96], [96, 96], [144, 96]
    ];
    // var randIndex = randint(0, 8);
    var randIndex = 0;

    // var startCoords = getTileSpriteCoords("water");
    // var coords =  getNineSliceList(startCoords[0], startCoords[1])[sliceIndex];

    return getBackgroundPositionString(coordList[randIndex]);
  }
}

var bird = { name: "bird", backgroundImage: "./gfx/ent-bird.png", backgroundPosition: "50% 50%", habitat: [grass, water] };
var bug = { name: "bug", backgroundImage: "./gfx/ent-bug.png" , backgroundPosition: "50% 50%", habitat: [grass] };
var dragon = { name: "dragon", backgroundImage: "./gfx/ent-dragon.png", backgroundPosition: "50% 50%", habitat: [grass] };
var fish = { name: "fish", backgroundImage: "./gfx/ent-fish.png", backgroundPosition: "50% 50%", habitat: [water] };
var mushroom = { name: "mushroom", backgroundImage: "./gfx/ent-mushroom.png", backgroundPosition: "50% 50%", habitat: [grass] };
var seaweed = { name: "seaweed", backgroundImage: "./gfx/ent-seaweed.png", backgroundPosition: "50% 50%", habitit: [water] };
var shark = { name: "shark", backgroundImage: "./gfx/ent-shark.png", backgroundPosition: "50% 50%", habitat: [water] };
var snail = { name: "snail", backgroundImage: "./gfx/ent-snail.png", backgroundPosition: "50% 50%", habitat: [water] };
var snake = { name: "snake", backgroundImage: "./gfx/ent-snake.png", backgroundPosition: "50% 50%", habitat: [grass, water] };
var tree = { name: "tree", backgroundImage: "./gfx/ent-tree2.png", backgroundPosition: "50% 50%", habitat: [grass] };

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
