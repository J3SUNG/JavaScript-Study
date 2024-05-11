// Numeric separators
// 숫자 사이에 언더바(_)를 넣어 숫자를 구분할 수 있다.
const billion = 1_000_000_000;
const binary = 0b1010_0001;
const hex = 0x1a_00;
const octal = 0o10_00;
const float = 3.141_592_653_589;

// 언더바는 숫자의 처음과 끝에 사용할 수 없다.
// 언더바는 연속으로 사용할 수 없다.
// const invalid = _100; // SyntaxError: Invalid or unexpected token
// const invalid2 = 100_; // SyntaxError: Invalid or unexpected token
// const invalid3 = 10__0; // SyntaxError: Invalid or unexpected token
