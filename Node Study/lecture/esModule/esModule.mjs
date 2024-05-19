// CommonJS
// 확장자 : js, cjs
// 확장자 생략 가능
// top level await 미지원
// __filename, __dirname, require, module, exports, exports 참조 가능

// ES Module
// 확장자 : mjs, js(package.json에 "type": "module"을 추가해야 함)
// 확장자 생략 불가능
// top level await 지원
// __filename, __dirname, require, module, exports, exports 참조 불가능

// CommonJS 모듈
require(".a");
module.exports = A;
const A = require(".a");
exports.C = D;
const E = F;
exports.E = E;
const { C, E } = require(".b");

// ES 모듈
import "./a.mjs";
export default A;
import A from "./a.mjs";
export const C = D;
const E2 = F;
export { E2 };
import { C, E2 } from "./b.mjs";
