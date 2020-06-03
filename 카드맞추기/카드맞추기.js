var horizontal = 4;
var vertical = 3;
var colorSample = [
  "red",
  "red",
  "orange",
  "orange",
  "green",
  "green",
  "yellow",
  "yellow",
  "blue",
  "blue",
  "purple",
  "purple",
];
var colorArr = colorSample.slice();
var color = [];
var clickFlag = true;
var clickCard = [];
var completeCard = [];
var count;
var startTime;
var endTime;

function shuffle() {
  for (var i = 0; colorArr.length > 0; ++i) {
    color = color.concat(
      colorArr.splice(Math.floor(Math.random() * colorArr.length), 1)
    );
  }
}
console.log(color);

function set(horizontal, vertical) {
  shuffle();
  count = horizontal * vertical;
  clickFlag = false;
  console.log(horizontal, vertical);
  for (var i = 0; i < horizontal * vertical; ++i) {
    var card = document.createElement("div");
    card.className = "card";
    var cardInner = document.createElement("div");
    cardInner.className = "card-inner";
    var cardFront = document.createElement("div");
    cardFront.className = "card-front";
    var cardBack = document.createElement("div");
    cardBack.className = "card-back";
    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (card) {
      card.addEventListener("click", function () {
        if (
          clickFlag === false ||
          completeCard.includes(card) ||
          (clickCard.length === 1 && clickCard[0] === card)
        ) {
          return;
        }
        card.classList.toggle("flipped");
        clickCard.push(card);
        console.log(clickCard);
        if (clickCard.length === 2) {
          if (
            clickCard[0].querySelector(".card-back").style.backgroundColor ===
            clickCard[1].querySelector(".card-back").style.backgroundColor
          ) {
            completeCard.push(clickCard[0]);
            completeCard.push(clickCard[1]);
            count -= 2;
            clickCard = [];
            if (count === 0) {
              endTime = new Date();
              alert(`성공! ${(endTime - startTime) / 1000}초 걸렸습니다.`);
              document.querySelector("#wrapper").innerHTML = "";
              colorArr = colorSample.slice();
              color = [];
              completeCard = [];
              set(horizontal, vertical);
            }
          } else {
            clickFlag = false;
            setTimeout(function () {
              clickCard[0].classList.remove("flipped");
              clickCard[1].classList.remove("flipped");
              clickFlag = true;
              clickCard = [];
            }, 1000);
          }
        }
      });
    })(card);
    document.querySelector("#wrapper").appendChild(card);
  }
  document.querySelectorAll(".card").forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add("flipped");
    }, 1000 + 100 * index);
    setTimeout(function () {
      card.classList.remove("flipped");
      clickFlag = true;
      startTime = new Date();
    }, 3000 + 100 * index);
  });
}

set(horizontal, vertical);
