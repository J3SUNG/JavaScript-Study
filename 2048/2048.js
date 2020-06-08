var table = document.getElementById("table");
var data = [];

function init() {
  var fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function (column) {
    var columnData = [];
    data.push(columnData);
    var tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function (row) {
      columnData.push(0);
      var td = document.createElement("td");
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);
}

function randomCreate() {
  var emptyArray = [];
  data.forEach(function (columnData, i) {
    columnData.forEach(function (rowData, j) {
      if (!rowData) {
        emptyArray.push([i, j]);
      }
    });
  });
  console.log(emptyArray);
  var randomCell = emptyArray[Math.floor(Math.random() * emptyArray.length)];
  data[randomCell[0]][randomCell[1]] = 2;
  draw();
}

function draw() {
  data.forEach(function (columnData, i) {
    columnData.forEach(function (rowData, j) {
      if (rowData > 0) {
        table.children[i].children[j].textContent = rowData;
      } else {
        table.children[i].children[j].textContent = "";
      }
    });
  });
}

init();
randomCreate();
draw();
