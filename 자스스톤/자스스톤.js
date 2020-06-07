var my = {
  hero: document.getElementById("my-hero"),
  deck: document.getElementById("my-deck"),
  field: document.getElementById("my-cards"),
  cost: document.getElementById("my-cost"),
  deckData: [],
  heroData: [],
  fieldData: [],
  selectedCard: null,
  selectedCardData: null,
};

var rival = {
  hero: document.getElementById("rival-hero"),
  deck: document.getElementById("rival-deck"),
  field: document.getElementById("rival-cards"),
  cost: document.getElementById("rival-cost"),
  deckData: [],
  heroData: [],
  fieldData: [],
  selectedCard: null,
  selectedCardData: null,
};

var turnButton = document.getElementById("turn-btn");
var turn = true;

function deckToField(data, turn) {
  var who = turn ? my : rival;
  var currentCost = Number(who.cost.textContent);

  console.log(Number(who.cost.textContent), data.cost);
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

  return true;
}

function reDrawField(who) {
  who.field.innerHTML = '';
  who.fieldData.forEach(function(data){
    set(data, who.field);
  });
}

function reDrawDeck(who) {
  who.deck.innerHTML = '';
  who.deckData.forEach(function(data){
    set(data, who.deck);
  });
}

function reDrawHero() {
  who.hero.innerHTML = '';
  set(who.heroData, who.hero, true);
}

function reDraw(turn) {
  var who = turn ? my : rival;
  reDrawField(who);
  reDrawDeck(who);
  reDrawHero(who);
}

function activeTurn(card, data, turn) {
  var who = turn ? who : rival;
  var 
  if (card.classList.contains("card-turnover")) {
    return;
  }
  if ((turn ? !data.mine : data.mine) && who.selectedCard) {
    data.hp = data.hp - who.selectedCardData.att;
    if (data.hp <= 0) {
      var index = rival.fieldData.indexOf(data);
      if (index > -1) {
        rival.fieldData.splice(index, 1);
      } else {
        alert("승리하셨습니다!");
        init();
      }
    }
    reDraw(!turn);
    who.selectedCard.classList.remove("card-selected");
    who.selectedCard.classList.add("card-turnover");
    who.selectedCard = null;
    who.selectedCardData = null;
  } else if ((turn ? !data.mine : data.mine)) {
    return;
  }
  if (data.field) {
    card.parentNode.querySelectorAll(".card").forEach(function (thisCard) {
      thisCard.classList.remove("card-selected");
    });
    card.classList.add("card-selected");
    who.selectedCard = card;
    who.selectedCardData = data;
  } else {
    if (deckToField(data, turn)) {
      turn ? createMyDeck(1) : createRivalDeck(1);
    }
  }
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
    activeTurn(card, data, turn);
  });
  dom.appendChild(card);
}
function createMyDeck(num) {
  console.log("hello");
  for (var i = 0; i < num; ++i) {
    my.deckData.push(createCard(false, true));
  }
  reDrawDeck(true);
}
function createRivalDeck(num) {
  for (var i = 0; i < num; ++i) {
    rival.deckData.push(createCard(false, false));
  }
  reDrawDeck(false);
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
    this.field = true;
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
  reDraw(true);
  reDraw(false);
}

turnButton.addEventListener("click", function () {
  var who = turn ? my : rival;
  document.getElementById("rival").classList.toggle("turn");
  document.getElementById("my").classList.toggle("turn");
  reDrawField(who);
  reDrawHero(who); 

  turn = !turn;
  if (turn) {
    rival.cost.textContent = 10;
  } else {
    my.cost.textContent = 10;
  }
});

function getCard() {}

function page() {}

init();
