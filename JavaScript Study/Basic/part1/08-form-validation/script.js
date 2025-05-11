// 여기에 폼 유효성 검사 코드를 작성하세요

// 요구사항:
// 1. 사용자 이름: 최소 2자 이상, 특수문자 없이
// 2. 이메일: 올바른 이메일 형식 (@와 도메인 포함)
// 3. 비밀번호: 최소 8자 이상, 문자와 숫자 포함
// 4. 비밀번호 확인: 비밀번호와 일치해야 함
// 5. 선택 약관: 체크 여부 확인

// 유효성 검사 로직은 다음과 같아야 합니다:
// - 폼 제출 시 모든 필드 검사
// - 각 필드를 떠날 때(blur 이벤트) 해당 필드 검사
// - 유효하지 않은 입력에 대해 오류 메시지 표시
// - 모든 필드가 유효할 때만 폼 제출 허용

const form = document.querySelector("#signup-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const termsCheckbox = document.querySelector("#terms");

const usernameError = document.querySelector("#username-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const confirmPasswordError = document.querySelector("#confirm-password-error");
const termsError = document.querySelector("#terms-error");

const successMessage = document.querySelector("#success-message");

function validateUsername(value) {
  if (value.length < 2) return false;

  const hasSpecialChar = /[^a-zA-Z0-9가-힣]/.test(value);
  if (hasSpecialChar) return false;

  return true;
}

usernameInput.addEventListener("blur", () => {
  const isValid = validateUsername(usernameInput.value);

  if (!isValid) {
    usernameInput.classList.add("invalid");
    usernameError.style.display = "block";
  } else {
    usernameInput.classList.remove("invalid");
    usernameError.style.display = "none";
  }
});

function validateEmail(value) {
  if (!value.includes("@")) return false;

  const parts = value.split("@");
  if (parts.length !== 2) return false;

  const domain = parts[1];
  if (!domain.includes(".")) return false;

  return true;
}

function validatePassword(value) {
  if (value.length < 8) return false;

  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);

  return hasLetter && hasNumber;
}

function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function validateTerms(isChecked) {
  return isChecked;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isUsernameValid = validateUsername(usernameInput.value);
  const isEmailValid = validateEmail(emailInput.value);
  const isPasswordValid = validatePassword(passwordInput.value);
  const isConfirmPasswordValid = validateConfirmPassword(
    passwordInput.value,
    confirmPasswordInput.value
  );
  const isTermsChecked = validateTerms(termsCheckbox.checked);

  if (!isUsernameValid) {
    usernameInput.classList.add("invalid");
    usernameError.style.display = "block";
  } else {
    usernameInput.classList.remove("invalid");
    usernameError.style.display = "none";
  }

  if (!isEmailValid) {
    emailInput.classList.add("invalid");
    emailError.style.display = "block";
  } else {
    emailInput.classList.remove("invalid");
    emailError.style.display = "none";
  }

  if (!isPasswordValid) {
    passwordInput.classList.add("invalid");
    passwordError.style.display = "block";
  } else {
    passwordInput.classList.remove("invalid");
    passwordError.style.display = "none";
  }

  if (!isConfirmPasswordValid) {
    confirmPasswordInput.classList.add("invalid");
    confirmPasswordError.style.display = "block";
  } else {
    confirmPasswordInput.classList.remove("invalid");
    confirmPasswordError.style.display = "none";
  }

  if (!isTermsChecked) {
    termsCheckbox.classList.add("invalid");
    termsError.style.display = "block";
  } else {
    termsCheckbox.classList.remove("invalid");
    termsError.style.display = "none";
  }

  const isFormValid =
    isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsChecked;

  if (isFormValid) {
    successMessage.style.display = "block";
    form.reset(); // 폼 초기화 (선택)
  } else {
    successMessage.style.display = "none";
  }
});
