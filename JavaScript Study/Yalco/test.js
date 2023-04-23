var myGlobalVar = 1;
const myGlobalConst = 1;

function myGlobalFunc() {}

console.log(globalThis.myGlobalVar, globalThis.myGlobalConst, globalThis.myGlobalFunc);
