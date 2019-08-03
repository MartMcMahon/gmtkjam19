var tile_size = 48;

// var grass = { backgroundPosition: "0 0", name: "grass" };
var grass = {
  name: "grass",
  backgroundPosition: function(sliceIndex) {
    var startCoords = getTileSpriteCoords("grass");
    var coords =  getNineSliceList(startCoords[0], startCoords[1])[sliceIndex];
    coords[1][1] = [0,0];
    console.log(coords);
    return getBackgroundPositionString(coords);
  }
};
// var water = { backgroundPosition: "-96px -96px", name: "water" };
var water = {
  name: "water",
  backgroundPosition: function(sliceIndex) {
    var startCoords = getTileSpriteCoords("water");
    var coords =  getNineSliceList(startCoords[0], startCoords[1])[sliceIndex];
    return getBackgroundPositionString(coords);
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

var tile_map_width = 1920;

