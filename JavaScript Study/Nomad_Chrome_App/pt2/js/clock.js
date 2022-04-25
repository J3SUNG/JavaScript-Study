const clock = document.querySelector("h2#clock");

// clock.innerText = "Hey!!";
function getClock() {
  const date = new Date();
  let hour = String(date.getHours()).padStart(2, "0");
  let minute = String(date.getMinutes()).padStart(2, "0");
  let second = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hour} : ${minute} : ${second}`;
}

getClock();
setInterval(getClock, 1000);
