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
