function sayHello(name) {
  console.log(name + " Hello!");
}

sayHello("J3SUNG");

const player = {
  name: "J3SUNG",
  sayHi: function () {
    console.log("Hi, I'm " + this.name);
  },
};

player.sayHi();

const age = 96;
function calculateKrAge(ageOfForeigner) {
  return ageOfForeigner + 2;
}

const KrAge = calculateKrAge(age);

console.log(KrAge);
