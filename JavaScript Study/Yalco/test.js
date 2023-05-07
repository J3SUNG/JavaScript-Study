// 💡 결과가 Promise의 인스턴스임 확인
console.log(fetch("https://showcases.yalco.kr/javascript/mockserver/race-result"));

fetch("https://showcases.yalco.kr/javascript/mockserver/race-result")
  .then((response) => {
    console.log(response);
    return response;
  })
  .then((response) => response.json())
  .then(console.log);
