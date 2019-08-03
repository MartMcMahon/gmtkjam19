function getNineSliceList(x, y) {
  return [
    [x, y +  0], [x + 16, y +  0], [x + 32, y +  0],
    [x, y + 16], [x + 16, y + 16], [x + 32, y + 16],
    [x, y + 32], [x + 16, y + 32], [x + 32, y + 32]
  ];
}

// function getEntitySpriteCoords(entity) {
//   switch (entity) {
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

