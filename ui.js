var isAddMode = false;
var flagType = null;

var selected_tile = [];
function select_tile(id) {
  var s = id.split('-');
  if (s.length === 3) {
    selected_tile = [ Number(s[1]), Number(s[2]) ];
    console.log('ok', selected_tile);
  } else {
    return null;
  }

  if (isAddMode) {
    board.teams[selected_tile[1]][selected_tile[0]] = flagEntity;
    console.log(flagEntity);
    isAddMode = !isAddMode;
    // reset element style before mouse leaves
    elem = document.getElementById(id);
    elem.style.border = "unset";
    elem.style.margin = "unset";
    elem.style.zIndex = "unset";
  }

}

function mouseOver(id) {
  if (!isAddMode) {
    return null;
  }
  var elem = document.getElementById(id);
  elem.style.border = "6px dashed red";
  elem.style.margin = "-6px";
  elem.style.zIndex = 1;
}
function mouseLeave(id) {
  var elem = document.getElementById(id);
  elem.style.border = "unset";
  elem.style.margin = "unset";
  elem.style.zIndex = "unset";
}

function toggleAddMode(newFlagEntity) {
  isAddMode = !isAddMode;
  flagEntity = newFlagEntity;
}

