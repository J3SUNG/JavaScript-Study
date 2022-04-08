const title = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  if (title.style.color == "blue") {
    title.style.color = "green";
  } else {
    title.style.color = "blue";
  }
}

console.dir(title);

title.style.color = "blue";
title.addEventListener("click", handleTitleClick);
