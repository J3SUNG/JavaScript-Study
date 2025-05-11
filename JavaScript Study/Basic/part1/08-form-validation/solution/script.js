// DOM 요소 선택
const form = document.getElementById('signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const terms = document.getElementById('terms');
const successMessage = document.getElementById('success-message');

// 오류 메시지 요소
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const termsError = document.getElementById('terms-error');

// 이벤트 리스너 등록
form.addEventListener('submit', validateForm);
username.addEventListener('blur', validateUsername);
email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);
confirmPassword.addEventListener('blur', validateConfirmPassword);
terms.addEventListener('change', validateTerms);

// 폼 제출 시 유효성 검사
function validateForm(e) {
    e.preventDefault();
    
    // 모든 필드 검사
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();
    
    // 모든 필드가 유효한 경우 성공 메시지 표시
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }
}

// 사용자 이름 검사: 최소 2자 이상, 특수문자 없이
function validateUsername() {
    const value = username.value.trim();
    const regex = /^[a-zA-Z0-9가-힣]{2,}$/;
    
    if (!regex.test(value)) {
        showError(username, usernameError);
        return false;
    } else {
        hideError(username, usernameError);
        return true;
    }
}

// 이메일 검사: 올바른 이메일 형식 (@와 도메인 포함)
function validateEmail() {
    const value = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regex.test(value)) {
        showError(email, emailError);
        return false;
    } else {
        hideError(email, emailError);
        return true;
    }
}

// 비밀번호 검사: 최소 8자 이상, 문자와 숫자 포함
function validatePassword() {
    const value = password.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!regex.test(value)) {
        showError(password, passwordError);
        return false;
    } else {
        hideError(password, passwordError);
        return true;
    }
}

// 비밀번호 확인 검사: 비밀번호와 일치해야 함
function validateConfirmPassword() {
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;
    
    if (confirmValue !== passwordValue) {
        showError(confirmPassword, confirmPasswordError);
        return false;
    } else {
        hideError(confirmPassword, confirmPasswordError);
        return true;
    }
}

// 약관 동의 검사: 체크 여부 확인
function validateTerms() {
    if (!terms.checked) {
        termsError.style.display = 'block';
        return false;
    } else {
        termsError.style.display = 'none';
        return true;
    }
}

// 오류 표시 함수
function showError(input, errorElement) {
    input.classList.add('invalid');
    errorElement.style.display = 'block';
}

// 오류 숨김 함수
function hideError(input, errorElement) {
    input.classList.remove('invalid');
    errorElement.style.display = 'none';
}
