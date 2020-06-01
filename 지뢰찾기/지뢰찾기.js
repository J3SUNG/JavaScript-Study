var tbody = document.querySelector("#table tbody");
var dataset = [];
var stopFlag = false;
var openCell = 0;
var code = {
  openCell: -1,
  qMark: -2,
  flag: -3,
  flagMine: -4,
  qMarkMine: -5,
  mine: 1,
  cell: 0,
};
document.querySelector("#exec").addEventListener("click", function () {
  document.querySelector("#result").textContent = "";
  tbody.innerHTML = "";
  stopFlag = false;
  openCell = 0;
  dataset = [];
  var hor = parseInt(document.querySelector("#hor").value);
  var ver = parseInt(document.querySelector("#ver").value);
  var mine = parseInt(document.querySelector("#mine").value);
  var box = Array(hor * ver)
    .fill()
    .map(function (element, index) {
      return index;
    });
  var shuffle = [];
  while (box.length > hor * ver - mine) {
    var changeValue = box.splice(Math.floor(Math.random() * box.length), 1)[0];
    shuffle.push(changeValue);
  }
  for (var i = 0; i < ver; ++i) {
    var arr = [];
    var tr = document.createElement("tr");
    dataset.push(arr);
    for (var j = 0; j < hor; ++j) {
      arr.push(code.cell);
      var td = document.createElement("td");
      td.addEventListener("contextmenu", function (e) {
        if (stopFlag) {
          return;
        }
        e.preventDefault();
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var cell = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (["", "X"].includes(e.currentTarget.textContent)) {
          e.currentTarget.textContent = "!";
          e.currentTarget.classList.add("flag");
          if (dataset[line][cell] === code.mine) {
            dataset[line][cell] = code.flagMine;
          } else {
            dataset[line][cell] = code.flag;
          }
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
          e.currentTarget.classList.remove("flag");
          e.currentTarget.classList.add("question");
          if (dataset[line][cell] === code.flagMine) {
            dataset[line][cell] = code.qMarkMine;
          } else {
            dataset[line][cell] = code.qMark;
          }
        } else if (e.currentTarget.textContent === "?") {
          e.currentTarget.classList.remove("question");
          if (dataset[line][cell] === code.qMarkMine) {
            e.currentTarget.textContent = "X";

            dataset[line][cell] = code.mine;
          } else {
            e.currentTarget.textContent = "";
            dataset[line][cell] = code.cell;
          }
        }
      });
      td.addEventListener("click", function (e) {
        if (stopFlag) {
          return;
        }
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var cell = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (
          [
            code.openCell,
            code.flag,
            code.flagMine,
            code.qMarkMine,
            code.qMark,
          ].includes(dataset[line][cell])
        ) {
          return;
        }
        e.currentTarget.classList.add("opened");
        ++openCell;
        if (dataset[line][cell] === code.mine) {
          e.currentTarget.textContent = "펑";
          document.querySelector("#result").textContent = "실패!";
          stopFlag = true;
        } else {
          var around = [dataset[line][cell - 1], dataset[line][cell + 1]];
          if (dataset[line - 1]) {
            around = around.concat(
              dataset[line - 1][cell - 1],
              dataset[line - 1][cell],
              dataset[line - 1][cell + 1]
            );
          }
          if (dataset[line + 1]) {
            around = around.concat(
              dataset[line + 1][cell - 1],
              dataset[line + 1][cell],
              dataset[line + 1][cell + 1]
            );
          }
          var count = around.filter(function (v) {
            return [code.mine, code.flagMine, code.qMarkMine].includes(v);
          }).length;
          e.currentTarget.textContent = count || "";
          dataset[line][cell] = code.openCell;
          if (count === 0) {
            var aroundCell = [];
            if (tbody.children[line - 1]) {
              aroundCell = aroundCell.concat([
                tbody.children[line - 1].children[cell - 1],
                tbody.children[line - 1].children[cell],
                tbody.children[line - 1].children[cell + 1],
              ]);
            }
            aroundCell = aroundCell.concat([
              tbody.children[line].children[cell - 1],
              tbody.children[line].children[cell + 1],
            ]);
            if (tbody.children[line + 1]) {
              aroundCell = aroundCell.concat([
                tbody.children[line + 1].children[cell - 1],
                tbody.children[line + 1].children[cell],
                tbody.children[line + 1].children[cell + 1],
              ]);
            }
            aroundCell
              .filter(function (v) {
                return !!v;
              })
              .forEach(function (nextCell) {
                var parentTr = nextCell.parentNode;
                var parentTbody = nextCell.parentNode.parentNode;
                var nextCellCell = Array.prototype.indexOf.call(
                  parentTr.children,
                  nextCell
                );
                var nextCellLine = Array.prototype.indexOf.call(
                  parentTbody.children,
                  parentTr
                );
                if (dataset[nextCellLine][nextCellCell] !== code.openCell) {
                  nextCell.click();
                }
              });
          }
        }
        if (openCell === hor * ver - mine) {
          document.querySelector("#result").textContent = "승리!";
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  for (var k = 0; k < shuffle.length; ++k) {
    var locY = Math.floor(shuffle[k] / hor);
    var locX = shuffle[k] % hor;
    tbody.children[locY].children[locX].textContent = "X";
    dataset[locY][locX] = code.mine;
  }
});
