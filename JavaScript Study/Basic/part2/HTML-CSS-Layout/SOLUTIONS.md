# HTML/CSS 레이아웃 문제 솔루션

이 파일에는 HTML/CSS 레이아웃 문제의 솔루션이 포함되어 있습니다.

## 반응형 카드 레이아웃 (responsive-cards.html)

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  flex: 1 1 30%;
  min-width: 250px;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
  }
  
  .card {
    width: 100%;
    flex: 1 1 100%;
  }
}
```

## 중앙 정렬 모달 (centered-modal.html)

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  max-width: 80%;
  max-height: 80%;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

## 추가 솔루션 (모달 닫기 기능 포함)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>중앙 정렬 모달 (강화 버전)</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: 100vh;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    
    .modal-container {
      max-width: 80%;
      max-height: 80%;
      transform: translateY(-20px);
      transition: transform 0.3s ease;
    }
    
    .modal-overlay.active .modal-container {
      transform: translateY(0);
    }
    
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      position: relative;
    }
    
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
    
    .open-modal-btn {
      margin: 20px;
      padding: 10px 15px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <button class="open-modal-btn" id="openModalBtn">모달 열기</button>
  
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal-container">
      <div class="modal-content">
        <button class="close-button" id="closeModalBtn">&times;</button>
        <h2>모달 제목</h2>
        <p>이것은 화면 중앙에 정렬된 모달 내용입니다.</p>
        <button>확인</button>
      </div>
    </div>
  </div>
  
  <script>
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    
    openModalBtn.addEventListener('click', () => {
      modalOverlay.classList.add('active');
    });
    
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  </script>
</body>
</html>
```

## 면접 시 주의사항

- CSS 레이아웃 기술(Flexbox, Grid, Float, Position 등)의 작동 방식과 차이점을 설명할 수 있어야 합니다.
- 반응형 디자인의 원칙과 모바일 우선(Mobile First) 접근법에 대해 설명할 수 있어야 합니다.
- CSS 단위(px, em, rem, vh, vw 등)의 차이점과 사용 사례를 알고 있어야 합니다.
- CSS 선택자의 특이성(Specificity)과 우선순위 규칙을 이해하고 있어야 합니다.
- 크로스 브라우저 호환성 이슈에 대한 경험이나 해결 방법을 공유하면 좋습니다.
- 성능 최적화 관점에서 CSS를 작성하는 방법(예: 리페인트와 리플로우 최소화)을 알고 있으면 더 좋습니다.
