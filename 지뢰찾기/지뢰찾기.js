var tbody = document.querySelector("#table tbody");
var dataset = [];
document.querySelector("#exec").addEventListener("click", function () {
  tbody.innerHTML = "";
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
      arr.push(1);
      var td = document.createElement("td");
      td.addEventListener("contextmenu", function (e) {
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
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
        } else if (e.currentTarget.textContent === "?") {
          if (dataset[line][cell] === 1) {
            e.currentTarget.textContent = "";
          } else if (dataset[line][cell] === "X") {
            e.currentTarget.textContent = "X";
          }
        }
      });
      td.addEventListener("click", function (e) {
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var cell = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (dataset[line][cell] === "X") {
          e.currentTarget.textContent = "펑";
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
          e.currentTarget.textContent = around.filter(function (v) {
            return v === "X";
          }).length;
        }
      });
      tr.appendChild(td);
      // td.textContent = 1;
    }
    tbody.appendChild(tr);
  }

  for (var k = 0; k < shuffle.length; ++k) {
    var locY = Math.floor(shuffle[k] / 10);
    var locX = shuffle[k] % 10;
    tbody.children[locY].children[locX].textContent = "X";
    dataset[locY][locX] = "X";
  }
});
