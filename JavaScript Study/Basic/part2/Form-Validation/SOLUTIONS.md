# 폼 검증 문제 솔루션

이 파일에는 폼 검증 문제의 솔루션이 포함되어 있습니다.

## 비밀번호 강도 검사 (password-strength.html)

```javascript
const passwordInput = document.getElementById('password');
const strengthMeter = document.getElementById('strengthMeter');
const feedback = document.getElementById('feedback');

passwordInput.addEventListener('input', checkPasswordStrength);

function checkPasswordStrength() {
  const password = passwordInput.value;
  
  // 초기화
  let strength = 0;
  let message = '';
  
  // 문자 포함 검사
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  // 포함된 형식 개수 세기
  let typesCount = 0;
  if (hasLetters) typesCount++;
  if (hasNumbers) typesCount++;
  if (hasSpecialChars) typesCount++;
  
  // 강도 및 피드백 설정
  if (password.length === 0) {
    strength = 0;
    message = '';
  } else if (password.length < 8) {
    strength = 1;
    message = '너무 짧습니다. 8자 이상으로 작성하세요.';
  } else if (typesCount === 1) {
    strength = 1;
    message = '약함: 문자, 숫자, 특수문자를 혼합해 사용하세요.';
  } else if (typesCount === 2) {
    strength = 2;
    message = '중간: 더 강한 비밀번호를 위해 다른 형식의 문자도 추가하세요.';
  } else {
    strength = 3;
    message = '강함: 안전한 비밀번호입니다!';
  }
  
  // 화면 업데이트
  // strength: 0(비었음), 1(약함), 2(중간), 3(강함)
  const percent = (strength / 3) * 100;
  strengthMeter.style.width = `${percent}%`;
  
  // 클래스 제거
  strengthMeter.classList.remove('weak', 'medium', 'strong');
  
  // 강도에 따라 클래스 추가
  if (strength === 1) {
    strengthMeter.classList.add('weak');
  } else if (strength === 2) {
    strengthMeter.classList.add('medium');
  } else if (strength === 3) {
    strengthMeter.classList.add('strong');
  }
  
  feedback.textContent = message;
}
```

## 고급 폼 검증 (전체 폼)

```javascript
// 폼 요소 가져오기
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const submitButton = document.getElementById('submitButton');

// 오류 메시지 요소 가져오기
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// 검증 상태 추적
let validUsername = false;
let validEmail = false;
let validPassword = false;
let validConfirmPassword = false;

// 정규 표현식 패턴
const patterns = {
  username: /^[a-zA-Z0-9_]{4,20}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/
};

// 이벤트 리스너 등록
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);
form.addEventListener('submit', handleSubmit);

// 사용자명 검증
function validateUsername() {
  const value = username.value.trim();
  
  if (value === '') {
    showError(username, usernameError, '사용자명을 입력하세요.');
    validUsername = false;
  } else if (!patterns.username.test(value)) {
    showError(username, usernameError, '사용자명은 4~20자의 영문, 숫자, 밑줄만 허용됩니다.');
    validUsername = false;
  } else {
    showSuccess(username, usernameError);
    validUsername = true;
  }
  
  updateSubmitButton();
}

// 이메일 검증
function validateEmail() {
  const value = email.value.trim();
  
  if (value === '') {
    showError(email, emailError, '이메일을 입력하세요.');
    validEmail = false;
  } else if (!patterns.email.test(value)) {
    showError(email, emailError, '유효한 이메일 주소를 입력하세요.');
    validEmail = false;
  } else {
    showSuccess(email, emailError);
    validEmail = true;
  }
  
  updateSubmitButton();
}

// 비밀번호 검증
function validatePassword() {
  const value = password.value;
  
  if (value === '') {
    showError(password, passwordError, '비밀번호를 입력하세요.');
    validPassword = false;
  } else if (!patterns.password.test(value)) {
    showError(password, passwordError, '비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.');
    validPassword = false;
  } else {
    showSuccess(password, passwordError);
    validPassword = true;
  }
  
  // 비밀번호가 변경되면 비밀번호 확인도 다시 검증
  if (confirmPassword.value !== '') {
    validateConfirmPassword();
  }
  
  updateSubmitButton();
}

// 비밀번호 확인 검증
function validateConfirmPassword() {
  const confirmValue = confirmPassword.value;
  const passwordValue = password.value;
  
  if (confirmValue === '') {
    showError(confirmPassword, confirmPasswordError, '비밀번호 확인을 입력하세요.');
    validConfirmPassword = false;
  } else if (confirmValue !== passwordValue) {
    showError(confirmPassword, confirmPasswordError, '비밀번호가 일치하지 않습니다.');
    validConfirmPassword = false;
  } else {
    showSuccess(confirmPassword, confirmPasswordError);
    validConfirmPassword = true;
  }
  
  updateSubmitButton();
}

// 오류 표시 함수
function showError(input, errorElement, message) {
  input.classList.add('error');
  input.classList.remove('success');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// 성공 표시 함수
function showSuccess(input, errorElement) {
  input.classList.remove('error');
  input.classList.add('success');
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

// 제출 버튼 업데이트
function updateSubmitButton() {
  if (validUsername && validEmail && validPassword && validConfirmPassword) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// 폼 제출 처리
function handleSubmit(e) {
  e.preventDefault();
  
  if (validUsername && validEmail && validPassword && validConfirmPassword) {
    // 서버로 데이터 전송 (여기서는 alert로 대체)
    alert('회원가입이 성공적으로 완료되었습니다!');
    form.reset();
    
    // 모든 성공 스타일 제거
    document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
    
    // 검증 상태 초기화
    validUsername = false;
    validEmail = false;
    validPassword = false;
    validConfirmPassword = false;
    
    updateSubmitButton();
  }
}

// 초기 제출 버튼 상태 설정
updateSubmitButton();
```

## 면접 시 주의사항

- 정규 표현식 패턴의 의미와 작동 방식을 이해하고 설명할 수 있어야 합니다.
- 클라이언트 측 검증과 서버 측 검증의 차이점과 각각의 중요성을 설명할 수 있어야 합니다.
- HTML5의 기본 폼 검증 속성(required, pattern, minlength 등)과 JavaScript 검증의 차이와 장단점을 알고 있으면 좋습니다.
- 이벤트 디바운싱(debouncing)과 쓰로틀링(throttling)의 개념과 실시간 검증에서의 활용 방법을 알고 있으면 좋습니다.
- 접근성 측면에서 폼 오류 메시지 처리 방법(ARIA 속성 활용 등)을 알고 있으면 좋습니다.
- 실제 프로덕션 환경에서는 바닐라 JS보다 폼 라이브러리(Formik, React Hook Form 등)를 사용하는 경우가 많다는 점도 언급할 수 있습니다.
