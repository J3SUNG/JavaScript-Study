// DOM 요소 가져오기
const fetchUsersBtn = document.getElementById('fetch-users-btn');
const loader = document.getElementById('loader');
const errorContainer = document.getElementById('error-container');
const usersContainer = document.getElementById('users-container');
const postsContainer = document.getElementById('posts-container');

// 이벤트 리스너 등록
fetchUsersBtn.addEventListener('click', fetchUsers);

// 로딩 상태 관리
function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

// 오류 표시
function showError(message) {
    errorContainer.textContent = `오류: ${message}`;
    errorContainer.style.display = 'block';
}

function hideError() {
    errorContainer.style.display = 'none';
}

// 사용자 정보 가져오기
async function fetchUsers() {
    // UI 초기화
    usersContainer.innerHTML = '';
    postsContainer.innerHTML = '';
    hideError();
    showLoader();
    
    try {
        // API에서 사용자 데이터 가져오기
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP 오류: ${response.status}`);
        }
        
        const users = await response.json();
        
        // 사용자 카드 렌더링
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.setAttribute('data-user-id', user.id);
            
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>이메일:</strong> ${user.email}</p>
                <p><strong>회사:</strong> ${user.company.name}</p>
            `;
            
            // 사용자 카드 클릭 이벤트
            userCard.addEventListener('click', () => {
                // 활성 카드 스타일 적용
                document.querySelectorAll('.user-card').forEach(card => {
                    card.classList.remove('active');
                });
                userCard.classList.add('active');
                
                // 사용자의 게시물 가져오기
                fetchUserPosts(user.id);
            });
            
            usersContainer.appendChild(userCard);
        });
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoader();
    }
}

// 특정 사용자의 게시물 가져오기
async function fetchUserPosts(userId) {
    postsContainer.innerHTML = '';
    showLoader();
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP 오류: ${response.status}`);
        }
        
        const posts = await response.json();
        
        // 게시물이 없는 경우
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>이 사용자의 게시물이 없습니다.</p>';
            return;
        }
        
        // 게시물 렌더링
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            
            postCard.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;
            
            postsContainer.appendChild(postCard);
        });
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoader();
    }
}
