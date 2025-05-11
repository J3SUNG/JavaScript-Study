// 모달 창과 라이트박스 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소
    const body = document.body;
    const openModalBtn = document.getElementById('open-modal');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // 모달 창 생성 및 추가
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>모달 창 제목</h2>
            <p>모달 창 내용입니다. 여기에 원하는 컨텐츠를 넣을 수 있습니다.</p>
            <p>모달 창은 사용자와의 상호작용을 위한 중요한 UI 요소입니다. 모달 창은 특정 작업을 완료하거나 중요한 정보를 표시하기 위해 사용됩니다.</p>
        </div>
    `;
    document.body.appendChild(modal);

    // 라이트박스 생성 및 추가
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-button">&times;</span>
            <img src="" alt="확대된 이미지">
            <div class="caption"></div>
            <button class="nav-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="nav-btn next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // 라이트박스 요소
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.caption');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');

    // 현재 선택된 이미지 인덱스
    let currentImageIndex = 0;
    const images = Array.from(thumbnails).map(thumbnail => {
        const img = thumbnail.querySelector('img');
        return {
            src: img.src.replace('/300/200', '/800/600'), // 큰 이미지로 URL 변경
            alt: img.alt,
            caption: thumbnail.querySelector('p').textContent
        };
    });

    // 모달 창 열기
    function openModal() {
        modal.classList.add('active');
        body.style.overflow = 'hidden'; // 배경 스크롤 방지
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }

    // 모달 창 닫기
    function closeModal() {
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        modal.querySelector('.modal-content').style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('active');
            body.style.overflow = ''; // 배경 스크롤 복원
        }, 300);
    }

    // 라이트박스 열기
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        body.style.overflow = 'hidden'; // 배경 스크롤 방지
        setTimeout(() => {
            lightbox.querySelector('.lightbox-content').style.transform = 'scale(1)';
            lightbox.querySelector('.lightbox-content').style.opacity = '1';
        }, 10);
    }

    // 라이트박스 닫기
    function closeLightbox() {
        lightbox.querySelector('.lightbox-content').style.transform = 'scale(0.8)';
        lightbox.querySelector('.lightbox-content').style.opacity = '0';
        setTimeout(() => {
            lightbox.classList.remove('active');
            body.style.overflow = ''; // 배경 스크롤 복원
        }, 300);
    }

    // 라이트박스 이미지 업데이트
    function updateLightboxImage() {
        const currentImage = images[currentImageIndex];
        
        // 이미지와 캡션을 페이드 아웃 효과로 변경
        lightboxImg.style.opacity = '0';
        lightboxCaption.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImg.src = currentImage.src;
            lightboxImg.alt = currentImage.alt;
            lightboxCaption.textContent = currentImage.caption;
            
            // 이미지와 캡션 페이드 인
            lightboxImg.style.opacity = '1';
            lightboxCaption.style.opacity = '1';
        }, 300);
    }

    // 이전 이미지로 이동
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }

    // 다음 이미지로 이동
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    }

    // 이벤트 리스너 등록
    
    // 모달 창 이벤트
    openModalBtn.addEventListener('click', openModal);
    modal.querySelector('.close-button').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 라이트박스 이벤트
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => openLightbox(index));
    });
    
    lightbox.querySelector('.close-button').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // 키보드 이벤트 (ESC 키로 모달/라이트박스 닫기, 화살표 키로 이미지 이동)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) {
                closeModal();
            } else if (lightbox.classList.contains('active')) {
                closeLightbox();
            }
        } else if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    // 추가: 라이트박스 이미지 트랜지션 스타일
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-content img {
            transition: opacity 0.3s ease;
        }
        .lightbox-content .caption {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
