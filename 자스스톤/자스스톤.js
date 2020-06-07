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

function reDraw(turn) {
  var who = turn ? my : rival;
  who.deck.innerHTML = "";
  who.field.innerHTML = "";
  who.hero.innerHTML = "";
  who.fieldData.forEach(function (data) {
    set(data, who.field);
  });
  who.deckData.forEach(function (data) {
    set(data, who.deck);
  });
  set(who.heroData, who.hero, true);
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
      console.log(
        !data.mine,
        my.selectedCard,
        !card.classList.contains("card-turnover")
      );
      if (
        !data.mine &&
        my.selectedCard &&
        !card.classList.contains("card-turnover")
      ) {
        console.log(my.selectedCard);
        console.log(data.hp, my.selectedCardData.att);
        data.hp = data.hp - my.selectedCardData.att;
        reDraw(!turn);
        my.selectedCard.classList.remove("card-selected");
        my.selectedCard.classList.add("card-turnover");
        my.selectedCard = null;
        my.selectedCardData = null;
        console.log("A");
      }
      if (!data.mine) {
        console.log("B");
        return;
      }
      if (data.field) {
        console.log("C");
        card.parentNode.querySelectorAll(".card").forEach(function (thisCard) {
          thisCard.classList.remove("card-selected");
        });
        card.classList.add("card-selected");
        my.selectedCard = card;
        my.selectedCardData = data;
      } else {
        if (deckToField(data, turn)) {
          createMyDeck(1);
        }
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
  console.log("hello");
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
