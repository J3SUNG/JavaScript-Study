// 이미지 슬라이더 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    // 필요한 DOM 요소 가져오기
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const autoplayBtn = document.getElementById('autoplay-btn');
    const indicatorsContainer = document.getElementById('indicators');
    const currentSlideElement = document.getElementById('current-slide');
    const totalSlidesElement = document.getElementById('total-slides');
    
    // 변수 초기화
    let currentIndex = 0;
    let autoplayInterval = null;
    const autoplayDelay = 3000; // 3초마다 슬라이드 전환
    let isAutoplay = true; // 자동 재생 상태
    const slideCount = slides.length;
    
    // 전체 슬라이드 수 표시
    totalSlidesElement.textContent = slideCount;
    
    // 인디케이터 생성
    function createIndicators() {
        for (let i = 0; i < slideCount; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            
            // 첫 번째 인디케이터는 활성 상태로 설정
            if (i === 0) {
                indicator.classList.add('active');
            }
            
            // 인디케이터 클릭 이벤트
            indicator.addEventListener('click', function() {
                goToSlide(i);
            });
            
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // 특정 슬라이드로 이동하는 함수
    function goToSlide(index) {
        // 범위를 벗어나는 인덱스 처리
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        // 현재 인덱스 업데이트
        currentIndex = index;
        
        // 슬라이드 이동 (CSS transform 사용)
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 현재 슬라이드 번호 업데이트
        currentSlideElement.textContent = currentIndex + 1;
        
        // 인디케이터 업데이트
        updateIndicators();
    }
    
    // 인디케이터 상태 업데이트
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 이전 슬라이드로 이동
    function goToPrevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // 다음 슬라이드로 이동
    function goToNextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // 자동 슬라이드 시작
    function startAutoplay() {
        if (!autoplayInterval) {
            autoplayInterval = setInterval(goToNextSlide, autoplayDelay);
            autoplayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    // 자동 슬라이드 중지
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
            autoplayBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    // 자동 슬라이드 토글
    function toggleAutoplay() {
        if (isAutoplay) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
        isAutoplay = !isAutoplay;
    }
    
    // 이벤트 리스너 등록
    prevBtn.addEventListener('click', function() {
        goToPrevSlide();
        // 자동 슬라이드가 켜져 있을 경우, 일시적으로 중지하고 다시 시작
        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        goToNextSlide();
        // 자동 슬라이드가 켜져 있을 경우, 일시적으로 중지하고 다시 시작
        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    });
    
    autoplayBtn.addEventListener('click', toggleAutoplay);
    
    // 슬라이더에 마우스 오버/아웃 이벤트 추가
    slider.addEventListener('mouseenter', function() {
        // 마우스가 슬라이더 위에 있을 때 자동 슬라이드 일시 중지
        if (isAutoplay) {
            stopAutoplay();
        }
    });
    
    slider.addEventListener('mouseleave', function() {
        // 마우스가 슬라이더에서 벗어났을 때 자동 슬라이드 재개
        if (isAutoplay) {
            startAutoplay();
        }
    });
    
    // 키보드 이벤트 처리 (접근성 향상)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (e.key === 'ArrowRight') {
            goToNextSlide();
        }
    });
    
    // 초기화 함수
    function init() {
        createIndicators();
        startAutoplay();
    }
    
    // 초기화 실행
    init();
});
