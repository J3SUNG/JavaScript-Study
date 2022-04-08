const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  console.log("Click!");
}
function handleMouseEnter() {
  console.log("Enter!");
}
function handleMouseLeave() {
  console.log("Leave!");
}
function handleWindowResize() {
  document.body.style.background = "tomato";
}
function handleWindowCopy() {
  alert("copier!");
}
function handleWindowOffline() {
  alert("SOS no WIFI");
}
function handleWindowOnline() {
  alert("All Good");
}

h1.onclick = handleTitleClick;
h1.onmouseenter = handleMouseEnter;
h1.onmouseleave = handleMouseLeave;

window.addEventListener("resize", handleWindowResize);
window.addEventListener("copy", handleWindowCopy);
window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);
