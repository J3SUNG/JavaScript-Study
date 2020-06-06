var my = {
  hero: document.getElementById("my-hero"),
  deck: document.getElementById("my-deck"),
  field: document.getElementById("my-cards"),
  cost: document.getElementById("my-cost"),
  deckData: [],
  heroData: [],
  fieldData: [],
};

var rival = {
  hero: document.getElementById("rival-hero"),
  deck: document.getElementById("rival-deck"),
  field: document.getElementById("rival-cards"),
  cost: document.getElementById("rival-cost"),
  deckData: [],
  heroData: [],
  fieldData: [],
};

var turnButton = document.getElementById("turn-btn");
var turn = true;

function deckToField(data, turn) {
  var who = turn ? my : rival;
  var currentCost = Number(who.cost.textContent);

  if (Number(who.cost.textContent) < data.cost) {
    return false;
  }
  var idx = who.deckData.indexOf(data);
  who.deckData.splice(idx, 1);
  who.fieldData.push(data);
  who.deck.innerHTML = "";
  who.field.innerHTML = "";
  who.fieldData.forEach(function (data) {
    set(data, who.field);
  });
  who.deckData.forEach(function (data) {
    set(data, who.deck);
  });
  data.field = true;
  who.cost.textContent = currentCost - data.cost;
}
function set(data, dom, hero) {
  var card = document.querySelector(".card-hidden .card").cloneNode(true);
  card.querySelector(".card-cost").textContent = data.cost;
  card.querySelector(".card-att").textContent = data.att;
  card.querySelector(".card-hp").textContent = data.hp;
  my.deck.appendChild(card);
  if (hero) {
    card.querySelector(".card-cost").style.display = "none";
    var name = document.createElement("div");
    name.textContent = "hero";
    card.appendChild(name);
  }
  card.addEventListener("click", function () {
    if (turn) {
      if (!data.mine || data.field) {
        return;
      }
      if (deckToField(data, turn)) {
        createMyDeck(1);
      }
    } else {
      if (data.mine || data.field) {
        return;
      }
      if (deckToField(data, turn)) {
        createRivalDeck(1);
      }
    }
  });
  dom.appendChild(card);
}
function createMyDeck(num) {
  for (var i = 0; i < num; ++i) {
    my.deckData.push(createCard(false, true));
  }
  my.deck.innerHTML = "";
  my.deckData.forEach(function (data) {
    set(data, my.deck);
  });
}
function createRivalDeck(num) {
  for (var i = 0; i < num; ++i) {
    rival.deckData.push(createCard(false, false));
  }
  rival.deck.innerHTML = "";
  rival.deckData.forEach(function (data) {
    set(data, rival.deck);
  });
}
function createMyHero() {
  my.heroData = createCard(true, true);
  set(my.heroData, my.hero, true);
}
function createRivalHero() {
  rival.heroData = createCard(true, false);
  set(rival.heroData, rival.hero, true);
}
function Card(hero, card) {
  if (hero) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
  if (card) {
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
  if (turn) {
    rival.cost.textContent = 10;
  } else {
    my.cost.textContent = 10;
  }
  document.getElementById("rival").classList.toggle("turn");
  document.getElementById("my").classList.toggle("turn");
});

function getCard() {}

function page() {}

init();
