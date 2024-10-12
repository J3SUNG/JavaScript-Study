const baseURL = "https://jsonplaceholder.typicode.com";

const apiRequest = async (method, endpoint, data) => {
  try {
    const url = `${baseURL}${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

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
    console.error(method, error);
  }
};

const getData = () => {
  apiRequest("GET", "/posts");
};

let testData = {
  name: "HI",
  age: 29,
};
const postData = (newData) => {
  apiRequest("POST", "/posts", newData);
};

let testData2 = {
  name: "WOW",
  age: 999,
};
const putData = (id, newData) => {
  apiRequest("PUT", `/posts/${id}`, newData);
};

const deleteData = (id) => {
  apiRequest("DELETE", `/posts/${id}`);
};

getData();
postData(testData);
putData(1, testData2);
deleteData(10);
