var tetris = document.querySelector("#tetris");
var tetrisData = [];

function createCell() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 20; ++i) {
    var tr = document.createElement("tr");
    fragment.appendChild(tr);
    for (var j = 0; j < 10; ++j) {
      var td = document.createElement("td");
      tr.appendChild(td);
    }
  }
  console.log(tetris, fragment);
  tetris.appendChild(fragment);
}

window.addEventListener("keyup", function (e) {
  console.log(e);
  switch (e.code) {
    case "Space":
      break;
    case "ArrowRight":
      break;
    case "ArrowLeft":
      break;
    case "ArrowDown":
      break;
    case "ArrowUp":
      break;
    default:
      break;
  }
});

createCell();
