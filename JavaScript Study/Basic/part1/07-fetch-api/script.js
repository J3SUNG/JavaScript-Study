// API 데이터 가져오기 기능 구현

const fetchButton = document.querySelector("#fetch-users-btn");
const usersContainer = document.querySelector("#users-container");
const postsContainer = document.querySelector("#posts-container");

fetchButton.addEventListener("click", getUser);

function getUser() {
  showLoading(true);
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => setUserContainer(data))
    .catch((err) => {
      alert("사용자 정보를 불러오지 못했습니다.");
      console.error(err);
    })
    .finally(() => {
      showLoading(false);
    });
}

function fetchUserPosts(id) {
  showLoading(true);
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((res) => res.json())
    .then((data) => setPostsContainer(data))
    .catch((err) => {
      alert("게시물을 불러오지 못했습니다.");
      console.error(err);
    })
    .finally(() => showLoading(false));
}

function setPostsContainer(data) {
  postsContainer.innerHTML = "";
  data.forEach((item) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    h3.textContent = item.title;
    p.textContent = item.body;

    div.appendChild(h3);
    div.appendChild(p);
    postsContainer.appendChild(div);
  });
}

function setUserContainer(data) {
  usersContainer.innerHTML = "";
  data.forEach((item) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    div.addEventListener("click", () => {
      fetchUserPosts(item.id);
    });

    h3.textContent = item.name;
    p.textContent = item.email;

    div.appendChild(h3);
    div.appendChild(p);
    usersContainer.appendChild(div);
  });
}

function showLoading(isLoading) {
  const loading = document.querySelector("#loader");
  loading.style.display = isLoading ? "block" : "none";
}

// 여기에 Fetch API를 사용하여 데이터를 가져오는 코드를 작성하세요.
// 요구사항:
// 1. 사용자 목록 가져오기: https://jsonplaceholder.typicode.com/users
// 2. 특정 사용자의 게시물 가져오기: https://jsonplaceholder.typicode.com/posts?userId={userId}
// 3. 로딩 상태 및 오류 처리 구현
