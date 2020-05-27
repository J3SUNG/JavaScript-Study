var body = document.body;
var word = document.createElement("div");
var form = document.createElement("form");
var input = document.createElement("input");
var button = document.createElement("button");
var result = document.createElement("div");

word.textContent = "자바스크립트";
button.textContent = "입력";
document.body.append(word);
document.body.append(form);
form.append(input);
form.append(button);
document.body.append(result);

form.addEventListener("submit", function funcCallback(event) {
  event.preventDefault();
  if (word.textContent[word.textContent.length - 1] === input.value[0]) {
    result.textContent = "Success";
    word.textContent = input.value;
    input.value = "";
    input.focus();
  } else {
    result.textContent = "Fail";
    input.value = "";
    input.focus();
  }
});
