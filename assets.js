var tile_size = 16;
function getNineSliceList(x, y) {
  return [
    [x, y +  0], [x + 16, y +  0], [x + 32, y +  0],
    [x, y + 16], [x + 16, y + 16], [x + 32, y + 16],
    [x, y + 32], [x + 16, y + 32], [x + 32, y + 32]
  ];
}

assets_grassSprites = [
  [2, 6], [3, 6], [4, 6],
  [2, 7], [3, 7], [4, 7],
  [2, 8], [3, 8], [4, 8],
  [2, 9], [3, 9],
  [2, 10], [3, 10]
]
assets_grassSprites = assets_grassSprites.map(function(c) { return getSpritePixelsFromCoords(c); });

function getSpritePixelsFromCoords(coords) {
  return [coords[0] * tile_size, coords[1] * tile_size];
}

// function getEntitySpriteCoords(entity) {
//   switch (entity) {
//     case "
//   return;
// }

function getTileSpriteCoords(tile) {
  switch (tile) {
    case "grass": return [32, 96];
    case "water": return [0, 16];
  }
}

function getBackgroundPositionString(coords) {
  return "-" + coords[0] + "px -" + coords[1] + "px";
}

