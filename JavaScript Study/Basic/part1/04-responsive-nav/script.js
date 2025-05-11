// 토글 메뉴 기능
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    const closeMenu = document.querySelector('.close-menu');
    
    // 햄버거 메뉴 클릭 이벤트
    menuToggle.addEventListener('click', function() {
        menuItems.classList.add('active');
    });
    
    // 닫기 버튼 클릭 이벤트
    closeMenu.addEventListener('click', function() {
        menuItems.classList.remove('active');
    });
});
