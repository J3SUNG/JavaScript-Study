var myGlobalVar = 1;
const myGlobalConst = 1;

function myGlobalFunc() {}

console.log(globalThis.myGlobalVar, globalThis.myGlobalConst, globalThis.myGlobalFunc);

errorFuncs.forEach((func) => {
  try {
    func();
  } catch (e) {
    if (e instanceof TypeError) {
      console.error("자료형 확인하세요.");
      return;
    }
    if (e instanceof ReferenceError) {
      console.error("선언 안 된 거 쓴 거 없는지 확인하세요.");
      return;
    }
    console.error("아니, 뭘 한 거에요?");
  }
});

const obj = {
  x: 1,
  y: 2,

  func1: function () {
    console.log("1.", this);
  },
  func2() {
    console.log("2.", this);
  },
  func3: () => {
    console.log("3.", this);
  },
};

const outer = {
  a: true,
  b: false,

  func: function () {
    const inner = {
      x: 1,
      y: 2,

      func1: function () {
        console.log("1.", this);
      },
      func2() {
        console.log("2.", this);
      },
      func3: () => {
        console.log("3.", this);
      },
    };

    // this가 inner를 가리킴
    inner.func1();
    inner.func2();

    // this가 outer를 가리킴
    inner.func3();
  },
};

outer.func();
