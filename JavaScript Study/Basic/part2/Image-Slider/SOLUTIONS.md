# 이미지 슬라이더 문제 솔루션

이 파일에는 이미지 슬라이더 문제의 솔루션이 포함되어 있습니다.

## 간단한 이미지 슬라이더 (simple-slider.html)

```javascript
const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicator = document.getElementById('indicator');

let currentIndex = 0;
const totalSlides = slides.length;

// 슬라이드 이동 함수
function goToSlide(index) {
  // 범위 검사 (무한 슬라이드 구현)
  if (index < 0) {
    index = totalSlides - 1;
  } else if (index >= totalSlides) {
    index = 0;
  }
  
  // 현재 인덱스 업데이트
  currentIndex = index;
  
  // 슬라이드 이동 (트랜스폼 사용)
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
  });
  
  // 인디케이터 업데이트
  updateIndicator();
}

// 인디케이터 생성 함수
function createIndicators() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(i));
    indicator.appendChild(dot);
  }
}

// 인디케이터 업데이트 함수
function updateIndicator() {
  const dots = indicator.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    if (i === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// 버튼 클릭 이벤트 리스너
prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

// 초기화
createIndicators();
goToSlide(0);

// 추가: CSS 초기화 (transform이 없으면 슬라이드가 겹쳐보임)
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});
```

## 고급 이미지 슬라이더 (자동 슬라이드 및 터치/스와이프 기능 추가)

```javascript
const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicator = document.getElementById('indicator');
const autoplayBtn = document.getElementById('autoplayBtn');

let currentIndex = 0;
const totalSlides = slides.length;
let autoplayInterval;
let isAutoplay = false;

// 슬라이드 이동 함수
function goToSlide(index) {
  // 범위 검사 (무한 슬라이드 구현)
  if (index < 0) {
    index = totalSlides - 1;
  } else if (index >= totalSlides) {
    index = 0;
  }
  
  // 현재 인덱스 업데이트
  currentIndex = index;
  
  // 슬라이드 이동 (트랜스폼 사용)
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
  });
  
  // 인디케이터 업데이트
  updateIndicator();
}

// 인디케이터 생성 함수
function createIndicators() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(i));
    indicator.appendChild(dot);
  }
}

// 인디케이터 업데이트 함수
function updateIndicator() {
  const dots = indicator.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    if (i === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// 자동 슬라이드 토글 함수
function toggleAutoplay() {
  if (isAutoplay) {
    clearInterval(autoplayInterval);
    autoplayBtn.textContent = '자동 재생';
    isAutoplay = false;
  } else {
    autoplayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3000);
    autoplayBtn.textContent = '정지';
    isAutoplay = true;
  }
}

// 터치/스와이프 기능 설정
let touchStartX = 0;
let touchEndX = 0;

function checkSwipeDirection() {
  if (touchStartX - touchEndX > 50) {
    // 왼쪽으로 스와이프 -> 다음 슬라이드
    goToSlide(currentIndex + 1);
  }
  
  if (touchEndX - touchStartX > 50) {
    // 오른쪽으로 스와이프 -> 이전 슬라이드
    goToSlide(currentIndex - 1);
  }
}

// 이벤트 리스너 등록
prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
autoplayBtn.addEventListener('click', toggleAutoplay);

// 터치 이벤트 리스너
slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  checkSwipeDirection();
});

// 키보드 이벤트 리스너 (접근성 향상)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    goToSlide(currentIndex - 1);
  } else if (e.key === 'ArrowRight') {
    goToSlide(currentIndex + 1);
  }
});

// 초기화
createIndicators();
goToSlide(0);

// CSS 초기화
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});
```

## 면접 시 주의사항

- 이미지 슬라이더를 구현하는 여러 방법(CSS 트랜지션, CSS 애니메이션, JS 애니메이션 등)의 장단점을 알고 있어야 합니다.
- 성능 최적화 측면에서 transform과 opacity를 사용하는 것이 리페인트와 리플로우 관점에서 유리함을 알고 있으면 좋습니다.
- 사용자 경험(UX) 향상을 위한 추가 기능(자동 재생, 스와이프 지원, 키보드 접근성 등)을 제안할 수 있어야 합니다.
- 반응형 슬라이더를 구현할 때 고려해야 할 사항들을 설명할 수 있어야 합니다.
- requestAnimationFrame()을 사용한 애니메이션과 CSS 트랜지션의 차이를 알고 있으면 좋습니다.
