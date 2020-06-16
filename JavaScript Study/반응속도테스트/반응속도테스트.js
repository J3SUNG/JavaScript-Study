var screen = document.querySelector("#screen");
var startTime;
var endTime;
var score = [];
var timeOut;

screen.addEventListener("click", function () {
  if (screen.classList.contains("waiting")) {
    screen.classList.remove("waiting");
    screen.classList.add("ready");
    screen.textContent = "초록색이 되면 클릭하세요.";
    timeOut = setTimeout(function () {
      startTime = new Date();
      screen.click();
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (screen.classList.contains("ready")) {
    if (!startTime) {
      clearTimeout(timeOut);
      screen.classList.remove("ready");
      screen.classList.add("waiting");
      screen.textContent = "너무 빨리 클릭했습니다.!";
    } else {
      screen.classList.remove("ready");
      screen.classList.add("now");
      screen.textContent = "클릭하세요!";
    }
  } else if (screen.classList.contains("now")) {
    endTime = new Date();
    console.log(endTime - startTime);
    score.push(endTime - startTime);
    startTime = null;
    endTime = null;
    screen.classList.remove("now");
    screen.classList.add("waiting");
    screen.textContent = "클릭해서 시작하세요.";
  }
});
