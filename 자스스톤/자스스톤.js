var myHero = document.getElementById("my-hero");
var rivalHero = document.getElementById("rival-hero");
var myDeck = document.getElementById("my-deck");
var rivalDeck = document.getElementById("rival-deck");
var myDeckData = [];
var rivalDeckData = [];
var myHeroData;
var rivalHeroData;

function createMyDeck(num) {
  for (var i = 0; i < num; ++i) {
    myDeckData.push(createCard());
  }
  myDeckData.forEach(function (data) {
    var card = document.createElement("div");
    var cost = document.createElement("div");
    rivalDeck.appendChild();
  });
}
function createRivalDeck(num) {
  for (var i = 0; i < num; ++i) {
    rivalDeckData.push(createCard());
  }
}
function createMyHero() {
  myHeroData = createCard();
}
function createRivalHero() {
  rivalHeroData = createCard();
}

function init() {
  createMyDeck(5);
  createRivalDeck(5);
  createMyHero();
  createRivalHero();
}
function Card() {
  this.att = Math.ceil(Math.random() * 5);
  this.hp = Math.ceil(math.random() * 5);
  this.cost = Math.floor((this.att + this.hp) / 2);
}
function createCard() {
  return new Card();
}

init();
