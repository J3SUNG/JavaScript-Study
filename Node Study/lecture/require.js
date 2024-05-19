// require는 node.js에서 모듈을 불러오는 함수이다.
// require가 제일 위에 올 필요는 없다.
// require.cache에는 require한 파일들이 캐싱되어 있다.
// require.main은 노드 실행 시 첫 모듈을 가리킨다.
require("./module");
console.log(require);

const { odd, even } = require("./module");
console.log(odd, even);
