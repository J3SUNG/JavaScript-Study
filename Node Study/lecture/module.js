const odd = "홀수입니다.";
const even = "짝수입니다.";

// exports는 module.exports의 참조값을 가지고 있음
// 객체를 가리키고 있으므로 module.exports에 다른 값을 대입하면 exports가 더이상 module.exports를 가리키지 않음
// exports.odd = odd;
// exports.even = even;

module.exports = {
  odd,
  even,
};
