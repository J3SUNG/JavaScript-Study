var tetris = document.querySelector("#tetris");
var tetrisData = [];
var currentBlock;
var nextBlock;
var currentTopLeft = [0, 3];
var blocks = [
  {
    name: "s",
    center: false,
    numCode: 1,
    color: "red",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ],
    ],
  },
  {
    name: "t",
    center: true,
    numCode: 2,
    color: "orange",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "z",
    center: true,
    numCode: 3,
    color: "yellow",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "zr",
    center: true,
    numCode: 4,
    color: "grren",
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
  },
  {
    name: "l",
    center: true,
    numCode: 5,
    color: "blue",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ],
  },
  {
    name: "lr",
    center: true,
    numCode: 6,
    color: "navy",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "b",
    center: true,
    numCode: 7,
    color: "violet",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
  },
];

const colors = ["red", "orange", "yellow", "green", "blue", "navy", "violet"];

const isActiveBlock = (value) => value > 0 && value < 10;
const isInvalidBlock = (value) => value === undefined || value >= 10;

function init() {
  const fragment = document.createDocumentFragment();
  [...Array(20).keys()].forEach((col, i) => {
    const tr = document.createElement("tr");
    fragment.appendChild(tr);
    [...Array(10).keys()].forEach((row, j) => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    const column = Array(10).fill(0);
    tetrisData.push(column);
  });
  tetris.appendChild(fragment);
}
var stopDown = false;

function createCell() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 20; ++i) {
    var tr = document.createElement("tr");
    var arr = [];
    tetrisData.push(arr);
    fragment.appendChild(tr);
    for (var j = 0; j < 10; ++j) {
      var td = document.createElement("td");
      tr.appendChild(td);
      arr.push(0);
    }
  }
  console.log(tetris, fragment);
  tetris.appendChild(fragment);
}

function drawScreen() {
  tetrisData.forEach(function (tr, i) {
    tr.forEach(function (td, j) {
      tetris.children[i].children[j].className = blockDict[td][0];
    });
  });
}

function draw() {
  tetrisData.forEach((col, i) => {
    col.forEach((row, j) => {
      if (row > 0) {
        // tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? colors[tetrisData[i][j] / 10 - 1]: ;
      } else {
        tetris.children[i].children[j].className = "";
      }
    });
  });
}

function generate() {
  if (!currentBlock) {
    currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  } else {
    currentBlock = nextBlock;
  }
  currentBlock.currentShapeIndex = 0;
  nextBlock = blocks[Math.floor(Math.random() * blocks.length)];
  drawNext();
  currentTopLeft = [-1, 3];
  let isGameOver = false;
  currentBlock.shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row && tetrisData[i][j + 3]) {
        isGameOver = true;
      }
    });
  });
  currentBlock.shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row) {
        tetrisData[i][j + 3] = currentBlock.numCode;
      }
    });
  });
  if (isGameOver) {
    clearInterval(int);
    draw();
    alert("game over");
  } else {
    draw();
  }
}

function blockDown() {
  stopDown = false;
  for (var i = tetrisData.length - 1; i >= 0; --i) {
    tetrisData[i].forEach(function (td, j) {
      if (td > 0 && td < 10) {
        if (tetrisData[i + 1] && !stopDown) {
          tetrisData[i + 1][j] = td;
          tetrisData[i][j] = 0;
        } else {
          stopDown = true;
          tetrisData[i][j] = td * 10;
        }
      }
    });
  }
  if (stopDown) {
    createBlock();
  }
  drawScreen();
}

window.addEventListener("keydown", function (e) {
  console.log(e);
  switch (e.code) {
    case "ArrowRight":
      break;
    case "ArrowLeft":
      break;
    case "ArrowDown":
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", function (e) {
  console.log(e);
  switch (e.code) {
    case "Space":
      break;
    case "ArrowUp":
      break;
    default:
      break;
  }
});

//let int = setInterval(tick, 2000);
init();
generate();
