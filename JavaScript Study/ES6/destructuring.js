const settings = {
  notification: {
    follow: true,
    alerts: true,
    unfollow: false,
  },
  color: {
    theme: "dark",
  },
};

// old way
if (settings.notification.follow) {
  // send email
}

// destructuring
const {
  notification: { follow },
  color,
} = settings;

const { time: { hour = 12 } = {} } = settings;

console.log(follow, color);

// array destructuring
const days = ["Mon", "Tue", "Wed"];

// old way
const m = days[0];
const t = days[1];
const w = days[2];

// destructuring
const [mon, tue, wed, thu = "Thu"] = days;

const numberFunction = () => ["One", "Two", "Three"];
const [one, two, three] = numberFunction();

// renaming
const chosenColor_old = setting.color.chosen_color || "light";

let chosenColor = "blue";
({
  themeColor: { chosen_color: chosenColor = "light" },
} = settings);

// function parameter destructuring

function saveSettings({ notifications, color }) {
  console.log(notifications, color);
}

saveSettings({
  notifications: {
    follow: true,
    alert: true,
  },
  color: {
    theme: "blue",
  },
});

// value shorthands
const isAdmin = false;
const user = {
  // isAdmin: isAdmin,
  isAdmin,
};

// swapping
let gold = "silver";
let silver = "gold";

[gold, silver] = [silver, gold];

// skipping
const arr = [1, 2, 3, 4, 5];
const [a, , , b] = arr;

console.log(a, b); // 1 4
