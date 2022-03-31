const age = prompt("How old are you?");

if (isNaN(age)) {
  console.log("Please write a number");
} else if (age < 17) {
  console.log("You are too young.");
} else {
  console.log("You can drink");
}
