const peopleName = "John";

// Normal way
const a = peopleName + " Guest";
// Template Literals
const b = `${peopleName} Guest`;

console.log(a);
console.log(b);

const wrapper = document.querySelector(".wrapper");

// Normal way
const addWelcome1 = () => {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.innerText = "Hello";
  div.className = "welcome";
  div.appendChild(h1);
  wrapper.appendChild(div);
};

// Template Literals
const addWelcome2 = () => {
  const div = `
    <div class="welcome">
      <h1>Hello</h1>
    </div>
  `;
  wrapper.innerHTML = div;
};

const friends = ["John", "Peter", "Tom"];
const list = `
  <ul>
    ${friends.map((friend) => `<li>${friend}</li>`).join("")}
  </ul>
`;

const styled = (css) => console.log(css);

styled`border-radius:10px; color:blue;`;

const styled2 = (aElement) => {
  const el = document.createElement(aElement);
  return (args) => {
    const styles = args[0];
    el.style = styles;
    return el;
  };
};

const title = styled2("h1")`
  border-radius: 10px;
  color: blue;
`;

// includes (문자열 포함 여부)
const isEmail = (email) => email.includes("@");

// repeat (문자열 반복)
const displayName = `${"*".repeat(10)} 6060`;

// startsWith (문자열 시작 여부)
// endsWith (문자열 끝 여부)
const addr = "Korea, Seoul";
const isKorea = addr.startsWith("Korea");
const isSeoul = addr.endsWith("Seoul");

// padStart 문자열 길이가 짧을 때 앞에 문자를 채워주는 메소드
let hours = "12";
let minutes = "3";
let seconds = "5";

const time = `${hours}:${minutes}:${seconds}`;

console.log(time); // 12:3:5

hours = String(hours).padStart(2, "0");
minutes = String(minutes).padStart(2, "0");
seconds = String(seconds).padStart(2, "0");

const time2 = `${hours}:${minutes}:${seconds}`;

console.log(time2); // 12:03:05

hours = string(hours).padEnd(3, "h");
minutes = string(minutes).padEnd(3, "m");
seconds = string(seconds).padEnd(3, "s");

const time3 = `${hours}:${minutes}:${seconds}`;

console.log(time3); // 12h:03m:05s

// trim (문자열 공백 제거)
const text = "  Hello  ";
console.log(text.trim()); // Hello

// trimStart (문자열 앞 공백 제거)
// trimEnd (문자열 뒤 공백 제거)
console.log(text.trimStart()); // Hello
console.log(text.trimEnd()); //   Hello
