// 여기에 이벤트 처리 코드를 작성하세요
// 1. 색상 변경 기능
const colorButton = document.querySelector("#color-button");
const colorText = document.querySelector(".color-text");

colorButton.addEventListener("click", () => {
  colorText.style.color = "red";
});

// 2. 숨기기/보이기 토글 기능
const toggleButton = document.querySelector("#toggle-button");
const toggleContent = document.querySelector(".toggle-content");

toggleButton.addEventListener("click", () => {
  toggleContent.style.display = toggleContent.style.display === "none" ? "block" : "none";
});

// 3. 문자 수 카운터 기능
const textInput = document.querySelector("#text-input");
const charCounter = document.querySelector("#char-counter");

textInput.addEventListener("input", () => {
  charCounter.textContent = `글자 수: ${textInput.value.length}`;
});

// 4. 체크박스 이벤트 처리 기능
const consentCheckbox = document.querySelector("#consent-checkbox");
const logContainer = document.querySelector(".log-container");

consentCheckbox.addEventListener("change", () => {
  if (consentCheckbox.checked) {
    const confirmed = confirm("정말 동의하시나요?");
    if (!confirmed) {
      consentCheckbox.checked = false;
      return;
    }
    logContainer.textContent += "체크됨\n";
  } else {
    logContainer.textContent += "해제됨\n";
  }
});
