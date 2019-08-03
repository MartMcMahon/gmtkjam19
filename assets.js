function getNineSliceList(x, y) {
  return [
    [x, y +  0], [x + 48, y +  0], [x + 96, y +  0],
    [x, y + 48], [x + 48, y + 48], [x + 96, y + 48],
    [x, y + 96], [x + 48, y + 96], [x + 96, y + 96]
  ];
}

// function getEntitySpriteCoords(entity) {
//   switch (entity) {
//   return;
// }

function getTileSpriteCoords(tile) {
  switch (tile) {
    case "grass": return [96, 288];
    case "water": return [288, 288];
  }
}

function getBackgroundPositionString(coords) {
  return "-" + coords[0] + "px -" + coords[1] + "px";
}

var s_index = 0;
function debug_setSlice(sliceIndex) {
  s_index = sliceIndex;
  render_board();
}
