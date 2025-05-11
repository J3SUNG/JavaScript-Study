// // 여기에 리스트 필터링 기능을 구현하세요

// // 요구사항:
// // 1. 검색어를 입력하면 실시간으로 목록이 필터링되어야 합니다.
// const searchInput = document.querySelector("#search-input");
// const productItem = document.querySelectorAll(".product-item");

// searchInput.addEventListener("input", () => {
//   const searchTerm = searchInput.value.toLowerCase();

//   productItem.forEach((item) => {
//     const title = item.querySelector("h3").textContent.toLowerCase();
//     item.style.display = title.includes(searchTerm) ? "block" : "none";
//   });
// });

// // 2. 카테고리 선택 시 해당 카테고리의 항목만 표시되어야 합니다.
// const categorySelect = document.querySelector("#category-select");
// categorySelect.addEventListener("change", () => {
//   const selectedCategory = categorySelect.value;

//   productItem.forEach((item) => {
//     const itemCategory = item.dataset.category;

//     const shouldShow = selectedCategory === "all" || itemCategory === selectedCategory;
//     item.style.display = shouldShow ? "block" : "none";
//   });
// });

// 3. 검색어와 카테고리 필터링이 함께 작동해야 합니다.
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const productItems = document.querySelectorAll(".product-item");

const filterProducts = () => {
  const search = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  productItems.forEach((item) => {
    const title = item.querySelector("h3").textContent.toLowerCase();
    const itemCategory = item.dataset.category;

    item.style.display =
      (category === "all" || category === itemCategory) && title.includes(search)
        ? "block"
        : "none";
  });
};

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

// 4. "전체" 카테고리 선택 시 모든 카테고리의 항목이 표시되어야 합니다.
// 5. 일치하는 항목이 없을 경우 "검색 결과가 없습니다" 메시지를 표시해야 합니다.
