var coordinate = 0;
var dictionary = {
  rock: "0px",
  scissor: "-142px",
  paper: "-284px",
};
var score = {
  scissor: 1,
  rock: 0,
  paper: -1,
};

function computerChoice(coordinate) {
  return Object.entries(dictionary).find(function (v) {
    return v[1] === coordinate;
  })[0];
}

var interval;
makeInterval();

function makeInterval() {
  interval = setInterval(function () {
    if (coordinate === dictionary.rock) {
      coordinate = dictionary.scissor;
    } else if (coordinate === dictionary.scissor) {
      coordinate = dictionary.paper;
    } else {
      coordinate = dictionary.rock;
    }
    document.querySelector("#computer").style.background =
      "url(https://en.pimg.jp/023/182/267/1/23182267.jpg) " + coordinate + " 0";
  }, 100);
}

document.querySelectorAll(".btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    clearInterval(interval);
    setTimeout(function () {
      makeInterval();
    }, 1000);
    var myChoice = this.textContent;
    var myScore = score[myChoice];
    var comScore = score[computerChoice(coordinate)];
    var result = myScore - comScore;
    if (result === 0) {
      console.log("Draw!");
    } else if ([-1, 2].includes(result)) {
      console.log("Win!");
    } else {
      console.log("Lose!");
    }
    console.log(`${myChoice} : ${computerChoice(coordinate)}`);
  });
});
