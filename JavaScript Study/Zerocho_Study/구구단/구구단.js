var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);
var mul = num1 * num2;

var body = document.body;
var word = document.createElement("div");
var form = document.createElement("form");
var input = document.createElement("input");
var button = document.createElement("button");
var result = document.createElement("div");

word.textContent = `${num1} * ${num2} = ?`;
button.textContent = "입력";
document.body.append(word);
document.body.append(form);
form.append(input);
form.append(button);
document.body.append(result);

form.addEventListener("submit", function funcCallback(event) {
  event.preventDefault();
  if (mul === Number(input.value)) {
    result.textContent = "Success";
    num1 = Math.ceil(Math.random() * 9);
    num2 = Math.ceil(Math.random() * 9);
    mul = num1 * num2;
    word.textContent = `${num1} * ${num2} = ?`;
    input.value = "";
    input.focus();
  } else {
    result.textContent = "Fail";
    input.value = "";
    input.focus();
  }
});
