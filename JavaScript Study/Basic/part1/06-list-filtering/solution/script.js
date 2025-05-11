// DOM 요소 선택
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const productItems = document.querySelectorAll('.product-item');
const noResultsMessage = document.getElementById('no-results');

// 이벤트 리스너 등록
searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);

// 제품 필터링 함수
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    
    let visibleCount = 0; // 표시되는 제품 수 계산
    
    // 모든 제품을 순회하며 필터링
    productItems.forEach(item => {
        // 제품명 (h3 태그의 텍스트)
        const productName = item.querySelector('h3').textContent.toLowerCase();
        // 제품 카테고리 (data-category 속성)
        const productCategory = item.getAttribute('data-category');
        
        // 검색어와 카테고리 모두 일치하는지 확인
        const matchesSearch = productName.includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;
        
        // 두 조건 모두 일치하면 표시, 아니면 숨김
        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // 표시되는 제품이 없으면 메시지 표시, 있으면 숨김
    if (visibleCount === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}

// 페이지 로드 시 초기 필터링 실행
filterProducts();
