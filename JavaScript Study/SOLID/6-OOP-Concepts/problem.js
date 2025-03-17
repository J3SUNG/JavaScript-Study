// OOP 개념을 제대로 활용하지 않은 쇼핑 카트 컴포넌트
import React, { useState, useEffect } from 'react';
import './ShoppingCart.css';

// 객체지향 프로그래밍 원칙을 따르지 않는 문제점:
// 1. 모든 로직이 하나의 컴포넌트에 혼합되어 있음
// 2. 데이터 모델 정의와 캡슐화 부재
// 3. 상태 변경 로직이 UI 컴포넌트와 결합되어 있음
// 4. 다양한 상품 타입에 대한 다형성 활용 부재
// 5. 코드 재사용성, 확장성 및 유지보수성 부족

const ShoppingCart = () => {
  // 단순 배열로 상품을 관리 (객체 모델 없음)
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API에서 상품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // 실제로는 API 호출을 해야 하지만, 여기서는 목업 데이터를 사용
        const mockData = [
          { id: 1, name: '티셔츠', price: 20000, category: 'clothing', imageUrl: '/images/tshirt.jpg' },
          { id: 2, name: '청바지', price: 45000, category: 'clothing', imageUrl: '/images/jeans.jpg' },
          { id: 3, name: '운동화', price: 80000, category: 'shoes', imageUrl: '/images/sneakers.jpg' },
          { id: 4, name: '모자', price: 15000, category: 'accessories', imageUrl: '/images/hat.jpg' },
          { id: 5, name: '양말', price: 5000, category: 'accessories', imageUrl: '/images/socks.jpg' },
        ];
        
        setProducts(mockData);
        setLoading(false);
      } catch (err) {
        setError('상품을 불러오는데 실패했습니다.');
        setLoading(false);
        console.error('상품 로딩 오류:', err);
      }
    };

    fetchProducts();
  }, []);
  
  // 장바구니에 상품 추가
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // 이미 장바구니에 있으면 수량만 증가
      const updatedCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      setCart(updatedCart);
    } else {
      // 새 상품이면 장바구니에 추가
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // 총 가격 업데이트
    updateTotalPrice([...cart, { ...product, quantity: 1 }]);
  };
  
  // 장바구니에서 상품 제거
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    
    // 총 가격 업데이트
    updateTotalPrice(updatedCart);
  };
  
  // 상품 수량 변경
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    );
    
    setCart(updatedCart);
    
    // 총 가격 업데이트
    updateTotalPrice(updatedCart);
  };
  
  // 총 가격 계산
  const updateTotalPrice = (cartItems) => {
    // 모든 상품의 (가격 * 수량)을 합산
    const baseTotal = cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
    
    // 할인 적용
    const finalTotal = baseTotal - (baseTotal * discount / 100);
    setTotalPrice(finalTotal);
  };
  
  // 프로모션 코드 적용
  const applyPromoCode = () => {
    // 하드코딩된 프로모션 코드 (실제로는 API 호출을 통해 검증해야 함)
    const promoCodes = {
      'SUMMER10': 10,
      'WELCOME20': 20,
      'SALE30': 30
    };
    
    if (promoCodes[promoCode]) {
      setDiscount(promoCodes[promoCode]);
      // 할인 적용된 가격 업데이트
      updateTotalPrice(cart);
    } else {
      alert('유효하지 않은 프로모션 코드입니다.');
    }
  };
  
  // 결제 처리
  const checkout = () => {
    // 실제로는 API를 호출하여 결제 처리를 해야 함
    if (cart.length === 0) {
      alert('장바구니가 비어 있습니다.');
      return;
    }
    
    // 결제 정보 준비 (가격, 상품 목록 등)
    const orderData = {
      items: cart,
      totalPrice: totalPrice,
      discount: discount,
      date: new Date().toISOString()
    };
    
    console.log('결제 진행:', orderData);
    alert('결제가 완료되었습니다!');
    
    // 장바구니 비우기
    setCart([]);
    setTotalPrice(0);
    setDiscount(0);
    setPromoCode('');
  };
  
  // 특정 카테고리의 상품만 필터링
  const filterByCategory = (category) => {
    if (category === 'all') {
      return products;
    } else {
      return products.filter(product => product.category === category);
    }
  };
  
  // 가격으로 상품 정렬
  const sortByPrice = (order) => {
    const sortedProducts = [...products];
    
    if (order === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    setProducts(sortedProducts);
  };
  
  // 상품 목록 렌더링
  const renderProducts = () => {
    if (loading) return <div className="loading">상품을 불러오는 중...</div>;
    if (error) return <div className="error">{error}</div>;
    if (products.length === 0) return <div className="empty">상품이 없습니다.</div>;
    
    return (
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{product.price.toLocaleString()}원</p>
            <p className="category">{product.category}</p>
            <button onClick={() => addToCart(product)}>
              장바구니에 추가
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  // 장바구니 렌더링
  const renderCart = () => {
    if (cart.length === 0) {
      return <div className="empty-cart">장바구니가 비어 있습니다.</div>;
    }
    
    return (
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p className="item-price">{item.price.toLocaleString()}원</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="item-total">
              {(item.price * item.quantity).toLocaleString()}원
            </div>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>
              삭제
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="shopping-container">
      <div className="products-section">
        <h2>상품 목록</h2>
        <div className="product-controls">
          <div className="category-filter">
            <button onClick={() => setProducts(filterByCategory('all'))}>전체</button>
            <button onClick={() => setProducts(filterByCategory('clothing'))}>의류</button>
            <button onClick={() => setProducts(filterByCategory('shoes'))}>신발</button>
            <button onClick={() => setProducts(filterByCategory('accessories'))}>액세서리</button>
          </div>
          <div className="price-sort">
            <button onClick={() => sortByPrice('asc')}>가격 낮은순</button>
            <button onClick={() => sortByPrice('desc')}>가격 높은순</button>
          </div>
        </div>
        {renderProducts()}
      </div>
      
      <div className="cart-section">
        <h2>장바구니</h2>
        {renderCart()}
        
        <div className="promo-code">
          <input
            type="text"
            placeholder="프로모션 코드 입력"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={applyPromoCode}>적용</button>
        </div>
        
        <div className="cart-summary">
          {discount > 0 && (
            <div className="discount-info">
              <span>할인: {discount}%</span>
            </div>
          )}
          <div className="total-price">
            <span>총 가격: {totalPrice.toLocaleString()}원</span>
          </div>
          <button className="checkout-button" onClick={checkout}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
