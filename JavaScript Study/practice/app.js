const baseURL = "https://jsonplaceholder.typicode.com";

const apiRequest = async (method, endpoint, data = null) => {
  try {
    const url = `${baseURL}/${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // 데이터가 있는 경우에만 body를 추가
    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log(method, result);
  } catch (error) {
    console.error(`Error with ${method} request:`, error);
  }
};

// GET 요청
const getData = () => {
  apiRequest("GET", "/posts");
};

// POST 요청
const postData = () => {
  const data = {
    title: "foo",
    body: "bar",
    userId: 1,
  };
  apiRequest("POST", "/posts", data);
};

// PUT 요청
const updateData = (id) => {
  const updatedData = {
    title: "updated title",
    body: "updated body",
    userId: 1,
  };
  apiRequest("PUT", `/posts/${id}`, updatedData);
};

// DELETE 요청
const deleteData = (id) => {
  apiRequest("DELETE", `/posts/${id}`);
};

// 테스트 실행 예시
getData(); // GET 요청으로 데이터 가져오기
postData(); // POST 요청으로 데이터 생성
updateData(1); // PUT 요청으로 ID 1 데이터 업데이트
deleteData(1); // DELETE 요청으로 ID 1 데이터 삭제
