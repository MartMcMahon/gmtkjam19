var tile_size = 48;
var tile_map_width = 1920;

var grass = {
  name: "grass",
  backgroundPosition: function(sliceIndex) {
    var startCoords = getTileSpriteCoords("grass");
    var coords = getNineSliceList(startCoords[0], startCoords[1])[sliceIndex];
    coords[1][1] = [0,0];
    console.log(coords);
    return getBackgroundPositionString(coords);
  }
};

var water = {
  name: "water",
  backgroundPosition: function() {
    var coordList = [
      [0, 48], [48, 48], [96, 48], [144, 48],
      [0, 96], [48, 96], [96, 96], [144, 96]
    ];
    var randIndex = randint(0, 8);

    // var startCoords = getTileSpriteCoords("water");
    // var coords =  getNineSliceList(startCoords[0], startCoords[1])[sliceIndex];

    return getBackgroundPositionString(coordList[randIndex]);
  }
}

// var desert = {color: "yellow"};
// var forest = {color: "green"};

var snake = { backgroundPosition: "-1680px 0", name: "snake" };
var mushroom = { backgroundPosition: "-1728px 0", name: "mushroom" };
var tree = { backgroundPosition: "-1776px 0", name: "tree" };

var tiles = [
	grass, water // , desert, forest
]
var teams = [
	snake, mushroom, tree
]
