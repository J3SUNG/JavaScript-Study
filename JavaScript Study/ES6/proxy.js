// Proxy는 객체에 대한 작업을 가로채는 객체이다.
const userObj = {
  name: "Mike",
  age: 30,
  password: 1234,
};

const userFilter = {
  get: (target, prop, receiver) => {
    if (prop === "password") {
      return "****";
    } else {
      return Reflect.get(target, prop, receiver);
    }
  },
  set: (target, prop, value) => {
    if (prop === "age") {
      if (value < 0) {
        throw new Error("invalid age");
      }
    }
    target[prop] = value;
  },
};

const filteredUser = new Proxy(userObj, userFilter);
