const SERVER_URL = "https://showcases.yalco.kr/javascript/mockserver/";

async function getWinnersSchool() {
  const raceResult = await fetch(SERVER_URL + "race-result").then((result) => result.json());

  const winnerIdx = raceResult.sort((a, b) => {
    return a.record - b.record;
  })[0].runner_idx;

  const winnerInfo = await fetch(`${SERVER_URL}runners/${winnerIdx}`).then((result) =>
    result.json()
  );

  const schoolIdx = winnerInfo.school_idx;

  const schoolInfo = await fetch(`${SERVER_URL}schools/${schoolIdx}`).then((result) =>
    result.json()
  );

  console.log(schoolInfo);
}

getWinnersSchool();
