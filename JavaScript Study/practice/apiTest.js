const baseURL = "https://jsonplaceholder.typicode.com";

const apiRequest = async (method, endpoint, data) => {
  try {
    const url = `${baseURL}${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new error("network error");
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

getData();

const testNewPostData = {
  name: "Blue",
  type: "Water",
};
const postData = (newData) => {
  apiRequest("POST", "/posts", newData);
};

postData(testNewPostData);

const testNewPutData = {
  name: "RED",
  type: "Fire",
  info: "Strong",
};
const putData = (id, newData) => {
  apiRequest("PUT", `/posts/${id}`, newData);
};
putData(1, testNewPutData);

const deleteData = (id) => {
  apiRequest("DELETE", `/posts/${id}`);
};
deleteData(30);
