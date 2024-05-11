// 객체 (객체는 속성과 메소드를 가지고 있는 데이터 구조)
const baseObject = {
  name: "Jetty",
  age: 20,
};

const object1 = baseObject;
const object2 = baseObject;

// 클래스 (클래스는 객체를 만들어내기 위한 템플릿)
class User {
  constructor(name) {
    this.name = name;
    this.age = 20;
  }
}

const userA = new User("Jetty");
const userB = new User("Cola");

// this (클래스에서 this는 인스턴스를 가리킴)
class User2 {
  constructor(name, lastName, email, password) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
  getProfile() {
    console.log(`${this.name} ${this.lastName} ${this.email}`);
  }
  updatePassword(newPassword, oldPassword) {
    if (oldPassword === this.password) {
      this.password = newPassword;
    } else {
      console.log("Can't change password.");
    }
  }
}

const userC = new User2("Jetty", "Kim", "jetty@co.kr", 1234);

userC.sayHello(); // Hello, I'm Jetty
userC.getProfile(); // Jetty Kim jetty@co.kr
userC.updatePassword(5678, 1234);

class Admin extends User2 {
  deleteWebsite() {
    console.log("Deleting the whole website...");
  }
}

const adminA = new Admin("cola", "lee", "cola@co.kr", 1122);

adminA.deleteWebsite(); // Deleting the whole website...

console.log(adminA.email); // cola@co.kr

// 클래스 상속 (클래스는 다른 클래스로부터 속성과 메소드를 상속받을 수 있음)
class User3 {
  constructor({ username, lastName, email, password }) {
    this.username = username;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
  sayHello() {
    console.log(`Hello, I'm ${this.username}`);
  }
  getProfile() {
    console.log(`${this.username} ${this.lastName} ${this.email}`);
  }
  updatePassword(newPassword, oldPassword) {
    if (oldPassword === this.password) {
      this.password = newPassword;
    } else {
      console.log("Can't change password.");
    }
  }
}

// super (super는 부모 클래스의 생성자를 호출)
class Admin2 extends User3 {
  constructor({ username, lastName, email, password, superAdmin }) {
    super({ username, lastName, email, password });
    this.superAdmin = superAdmin;
  }
  deleteWebsite() {
    console.log("Deleting the whole website...");
  }
}

class Counter {
  constructor({ initialNumber = 0, counterId, plusId, minusId }) {
    this.count = initialNumber;
    this.counter = document.getElementById(counterId);
    this.counter.innerText = initialNumber;
    this.plusBtn = document.getElementById(plusId);
    this.minusBtn = document.getElementById(minusId);
    this.addEventListener();
  }
  addEventListener = () => {
    this.plusBtn.addEventListener("click", this.increase);
    this.minusBtn.addEventListener("click", this.decrease);
  };
  // this가 button을 가리키고 있음
  // increase() {
  //   this.count = this.count + 1;
  //   this.repaintCount();
  // }
  // this가 Counter를 가리키기 위해 화살표 함수 사용
  increase = () => {
    this.count = this.count + 1;
    this.repaintCount();
  };
  decrease = () => {
    this.count = this.count - 1;
    this.repaintCount();
  };
  repaintCount = () => {
    this.counter.innerText = this.count;
  };
}
