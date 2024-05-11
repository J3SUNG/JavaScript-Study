// optional chaining 객체의 중첩속성을 접근할 때, 중간에 null 또는 undefined가 발생할 수 있는 경우에 사용한다.
const user = {
  name: "jetty",
  address: {
    city: "Seoul",
    country: "Korea",
  },
};

console.log(user.address.city); // Seoul

console.log(user.profile.img); // TypeError: Cannot read property 'img' of undefined
console.log(user.profile?.img); // undefined

// user && user.profile && user.profile.img && user.profile.img.url
console.log(user?.profile?.img?.url); // undefined
