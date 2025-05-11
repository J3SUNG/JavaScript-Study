// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 요소 가져오기
    const colorText = document.getElementById('color-text');
    const colorButton = document.getElementById('color-button');
    const toggleContent = document.getElementById('toggle-content');
    const toggleButton = document.getElementById('toggle-button');
    const textInput = document.getElementById('text-input');
    const charCounter = document.getElementById('char-counter');
    const consentCheckbox = document.getElementById('consent-checkbox');
    const logContainer = document.getElementById('log-container');
    
    // 1. 색상 변경 기능
    colorButton.addEventListener('click', function() {
        // 무작위 색상 생성
        const randomColor = getRandomColor();
        colorText.style.color = randomColor;
    });
    
    // 무작위 색상을 생성하는 함수
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // 2. 숨기기/보이기 토글 기능
    toggleButton.addEventListener('click', function() {
        if (toggleContent.style.display === 'none') {
            toggleContent.style.display = 'block';
            toggleButton.textContent = '숨기기';
        } else {
            toggleContent.style.display = 'none';
            toggleButton.textContent = '보이기';
        }
    });
    
    // 3. 문자 수 카운터 기능
    textInput.addEventListener('input', function() {
        const count = textInput.value.length;
        charCounter.textContent = `글자 수: ${count}`;
    });
    
    // 4. 체크박스 이벤트 처리 기능
    consentCheckbox.addEventListener('change', function() {
        const isChecked = consentCheckbox.checked;
        const message = isChecked ? '약관에 동의하셨습니다.' : '약관 동의가 취소되었습니다.';
        
        // 로그 메시지 추가
        const logEntry = document.createElement('div');
        logEntry.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
        logContainer.prepend(logEntry);
        
        // 확인 메시지 표시
        if (isChecked) {
            alert('감사합니다. 약관에 동의하셨습니다.');
        }
    });
});
