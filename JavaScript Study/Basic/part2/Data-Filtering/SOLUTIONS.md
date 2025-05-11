# 데이터 필터링 및 검색 문제 솔루션

이 파일에는 데이터 필터링 및 검색 문제의 솔루션이 포함되어 있습니다.

## 상품 필터링 (product-filter.html)

```javascript
const searchInput = document.getElementById('searchInput');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const priceCheckboxes = document.querySelectorAll('input[name="price"]');
const productsList = document.getElementById('productsList');

// 상품 리스트 렌더링 함수
function renderProducts(productsToRender) {
  productsList.innerHTML = '';
  
  if (productsToRender.length === 0) {
    productsList.innerHTML = `<div class="no-results">검색 결과가 없습니다.</div>`;
    return;
  }
  
  productsToRender.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p class="price">${product.price.toLocaleString()}원</p>
      <span class="category">${product.category}</span>
    `;
    
    productsList.appendChild(productCard);
  });
}

// 필터링 함수
function filterProducts() {
  // 검색어 가져오기
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  // 선택된 카테고리 가져오기
  const selectedCategories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  // 선택된 가격 범위 가져오기
  const selectedPriceRanges = Array.from(priceCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  // 필터링 적용
  const filteredProducts = products.filter(product => {
    // 검색어 필터
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    
    // 카테고리 필터
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    
    // 가격 필터
    let matchesPrice = selectedPriceRanges.length === 0;
    
    if (!matchesPrice) {
      for (const range of selectedPriceRanges) {
        if (range === '0-50000' && product.price < 50000) {
          matchesPrice = true;
          break;
        } else if (range === '50000-100000' && product.price >= 50000 && product.price < 100000) {
          matchesPrice = true;
          break;
        } else if (range === '100000+' && product.price >= 100000) {
          matchesPrice = true;
          break;
        }
      }
    }
    
    // 모든 조건 충족 (AND 조건)
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // 필터링된 상품 표시
  renderProducts(filteredProducts);
}

// 이벤트 리스너 등록
searchInput.addEventListener('input', filterProducts);

categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterProducts);
});

priceCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterProducts);
});

// 초기 렌더링
renderProducts(products);
```

## 고급 필터링 및 정렬 기능 추가

```javascript
const searchInput = document.getElementById('searchInput');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const priceCheckboxes = document.querySelectorAll('input[name="price"]');
const sortSelect = document.getElementById('sortSelect');
const productsList = document.getElementById('productsList');
const resultCount = document.getElementById('resultCount');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

// 필터 상태
let filters = {
  search: '',
  categories: [],
  priceRanges: [],
  sort: 'name-asc' // 기본값
};

// 상품 렌더링 함수
function renderProducts(productsToRender) {
  productsList.innerHTML = '';
  
  if (productsToRender.length === 0) {
    productsList.innerHTML = `<div class="no-results">검색 결과가 없습니다.</div>`;
    resultCount.textContent = '검색 결과: 0개';
    return;
  }
  
  // 결과 개수 표시
  resultCount.textContent = `검색 결과: ${productsToRender.length}개`;
  
  // 상품 카드 생성
  productsToRender.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <h3>${highlightText(product.name, filters.search)}</h3>
      <p class="price">${product.price.toLocaleString()}원</p>
      <span class="category">${product.category}</span>
    `;
    
    productsList.appendChild(productCard);
  });
}

// 검색어 하이라이트 함수
function highlightText(text, searchTerm) {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// 필터 적용 및 정렬 함수
function applyFilters() {
  // 필터링
  let filteredProducts = products.filter(product => {
    // 검색어 필터
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase());
    
    // 카테고리 필터
    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(product.category);
    
    // 가격 필터
    let matchesPrice = filters.priceRanges.length === 0;
    
    if (!matchesPrice) {
      for (const range of filters.priceRanges) {
        const [min, max] = range.split('-').map(Number);
        if (max) {
          if (product.price >= min && product.price < max) {
            matchesPrice = true;
            break;
          }
        } else {
          // "100000+" 같은 경우
          if (product.price >= min) {
            matchesPrice = true;
            break;
          }
        }
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // 정렬
  const [sortField, sortDirection] = filters.sort.split('-');
  
  filteredProducts.sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    }
    
    return sortDirection === 'desc' ? -comparison : comparison;
  });
  
  // 렌더링
  renderProducts(filteredProducts);
}

// 필터 변경 이벤트 핸들러
function handleSearchInput() {
  filters.search = searchInput.value.trim();
  applyFilters();
}

function handleCategoryChange() {
  filters.categories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  applyFilters();
}

function handlePriceChange() {
  filters.priceRanges = Array.from(priceCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  applyFilters();
}

function handleSortChange() {
  filters.sort = sortSelect.value;
  applyFilters();
}

// 필터 초기화 함수
function clearFilters() {
  // 검색어 초기화
  searchInput.value = '';
  
  // 체크박스 초기화
  categoryCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  priceCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // 정렬 초기화
  sortSelect.value = 'name-asc';
  
  // 필터 상태 초기화
  filters = {
    search: '',
    categories: [],
    priceRanges: [],
    sort: 'name-asc'
  };
  
  // 필터 재적용
  applyFilters();
}

// 이벤트 리스너 등록 (디바운싱 적용)
let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(handleSearchInput, 300);
});

categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handleCategoryChange);
});

priceCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handlePriceChange);
});

sortSelect.addEventListener('change', handleSortChange);
clearFiltersBtn.addEventListener('click', clearFilters);

// 초기 렌더링
applyFilters();
```

## 면접 시 주의사항

- 배열 고차 함수(map, filter, reduce 등)의 차이점과 각각의 사용 사례를 명확히 설명할 수 있어야 합니다.
- 필터링 로직이 복잡해질 때의 최적화 방법(복합 필터, 캐싱, 메모이제이션 등)을 알고 있으면 좋습니다.
- 입력 디바운싱(debouncing)의 중요성과 구현 방법을 이해하고 있어야 합니다.
- 대규모 데이터를 처리할 때의 성능 고려사항(가상 스크롤, 페이지네이션, 지연 로딩 등)을 알고 있으면 좋습니다.
- 사용자 경험(UX) 측면에서 필터링 UI의 디자인 패턴과 최적화 방법을 설명할 수 있어야 합니다.
- 실무에서는 상태 관리 라이브러리(Redux, MobX 등)를 활용한 필터링 구현이 일반적임을 알고 있으면 좋습니다.
