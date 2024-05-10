const friends = ["jetty", "cola", "duri", "nuri"];

// for (배열의 인덱스에 대해 반복)
for (let i = 0; i < friends.length; i++) {
  console.log(friends[i]);
}

// for...of (배열의 각 요소에 대해 반복)
// strings, arrays, maps, sets, arguments, nodelists, typedarrays 등에 사용 가능
// break, continue 사용 가능
for (const friend of friends) {
  console.log(friend);
}

// forEach (배열의 각 요소에 대해 콜백 함수 실행)
// array 객체에만 사용 가능
// break, continue 사용 불가능
friends.forEach((friend, index) => console.log(`${index + 1}. ${friend}`));
