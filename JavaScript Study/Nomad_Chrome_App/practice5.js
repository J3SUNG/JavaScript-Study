const title = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  if (title.style.color == "blue") {
    title.style.color = "green";
  } else {
    title.style.color = "blue";
  }
}

function handleMouseEnter() {
  console.log("mouse is here");
}

function handleMouseLeave() {
  console.log("mouse is not here");
}

console.dir(title);

title.style.color = "blue";
title.addEventListener("click", handleTitleClick);
title.addEventListener("mouseenter", handleMouseEnter);
title.addEventListener("mouseleave", handleMouseLeave);
