var myHero = document.getElementById("my-hero");
var rivalHero = document.getElementById("rival-hero");
var myDeck = document.getElementById("my-deck");
var rivalDeck = document.getElementById("rival-deck");
var myField = document.getElementById("my-cards");
var rivalField = document.getElementById("rival-cards");
var myCost = document.getElementById("my-cost");
var rivalCost = document.getElementById("rival-cost");
var turnButton = document.getElementById("turn-btn");
var myDeckData = [];
var rivalDeckData = [];
var myHeroData;
var rivalHeroData;
var myFieldData = [];
var rivalFieldData = [];

function set(data, dom, hero) {
  var card = document.querySelector(".card-hidden .card").cloneNode(true);
  card.querySelector(".card-cost").textContent = data.cost;
  card.querySelector(".card-att").textContent = data.att;
  card.querySelector(".card-hp").textContent = data.hp;
  myDeck.appendChild(card);
  if (hero) {
    card.querySelector(".card-cost").style.display = "none";
    var name = document.createElement("div");
    name.textContent = "hero";
    card.appendChild(name);
  }
  card.addEventListener("click", function () {
    if (turn) {
      if (!data.mine) {
        console.log(data.mine);
        console.log(turn);
        return;
      }
      var currentCost = Number(myCost.textContent);
      if (Number(myCost.textContent) < data.cost) {
        return;
      }
      var idx = myDeckData.indexOf(data);
      myDeckData.splice(idx, 1);
      myFieldData.push(data);
      myDeck.innerHTML = "";
      myField.innerHTML = "";
      myFieldData.forEach(function (data) {
        set(data, myField);
      });
      myDeckData.forEach(function (data) {
        set(data, myDeck);
      });
      myCost.textContent = currentCost - data.cost;
    } else {
      if (data.mine) {
        return;
      }
      var currentCost = Number(rivalCost.textContent);
      if (Number(rivalCost.textContent) < data.cost) {
        return;
      }
      var idx = rivalDeckData.indexOf(data);
      rivalDeckData.splice(idx, 1);
      rivalFieldData.push(data);
      rivalDeck.innerHTML = "";
      rivalField.innerHTML = "";
      rivalFieldData.forEach(function (data) {
        set(data, rivalField);
      });
      rivalDeckData.forEach(function (data) {
        set(data, rivalDeck);
      });
      rivalCost.textContent = currentCost - data.cost;
    }
  });
  dom.appendChild(card);
}
function createMyDeck(num) {
  for (var i = 0; i < num; ++i) {
    myDeckData.push(createCard(false, true));
  }
  myDeckData.forEach(function (data) {
    set(data, myDeck);
  });
}
function createRivalDeck(num) {
  for (var i = 0; i < num; ++i) {
    rivalDeckData.push(createCard(false, false));
  }
  rivalDeckData.forEach(function (data) {
    set(data, rivalDeck);
  });
}
function createMyHero() {
  myHeroData = createCard(true, true);
  set(myHeroData, myHero, true);
}
function createRivalHero() {
  rivalHeroData = createCard(true, false);
  set(rivalHeroData, rivalHero, true);
}
function Card(hero, myCard) {
  if (hero) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
  console.log(myCard);
  if (myCard) {
    console.log("AA");
    this.mine = true;
  }
}
function createCard(hero, card) {
  return new Card(hero, card);
}
function init() {
  createMyDeck(5);
  createRivalDeck(5);
  createMyHero();
  createRivalHero();
}

turnButton.addEventListener("click", function () {
  turn = !turn;
  document.getElementById("rival").classList.toggle("turn");
  document.getElementById("my").classList.toggle("turn");
});

var turn = true;
function getCard() {}

function page() {}

init();
