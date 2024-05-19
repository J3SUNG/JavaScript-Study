// ES Module
// default export
import { odd, even } from "./namedExport.mjs";

function checkOddOrEven(num) {
  return num % 2 ? odd : even;
}

export default checkOddOrEven;
