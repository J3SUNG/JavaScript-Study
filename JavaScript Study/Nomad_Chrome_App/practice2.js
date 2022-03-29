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
