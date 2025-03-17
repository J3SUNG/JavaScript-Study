// 5. 상품 리포지토리 인터페이스 (추상화)
// ProductRepositoryInterface.js
export class ProductRepositoryInterface {
  async getAll() { throw new Error('구현 필요'); }
  async getById(id) { throw new Error('구현 필요'); }
  async getByCategoryId(categoryId) { throw new Error('구현 필요'); }
  async searchByName(query) { throw new Error('구현 필요'); }
}

// 6. 모의 상품 리포지토리 구현 (다형성)
// MockProductRepository.js
export class MockProductRepository extends ProductRepositoryInterface {
  constructor() {
    super();
    
    // 목업 데이터
    this._products = [
      new ClothingProduct(1, '티셔츠', 20000, '/images/tshirt.jpg', 'M', '블랙'),
      new ClothingProduct(2, '청바지', 45000, '/images/jeans.jpg', 'L', '블루'),
      new ElectronicsProduct(3, '스마트폰', 650000, '/images/phone.jpg', 12, '삼성'),
      new ElectronicsProduct(4, '이어폰', 120000, '/images/earphones.jpg', 6, '애플'),
      new Product(5, '백팩', 55000, 'accessories', '/images/backpack.jpg')
    ];
  }
  
  async getAll() {
    // API 호출 시뮬레이션
    return new Promise(resolve => {
      setTimeout(() => resolve([...this._products]), 500);
    });
  }
  
  async getById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const product = this._products.find(p => p.id === id);
        resolve(product || null);
      }, 300);
    });
  }
  
  async getByCategoryId(category) {
    return new Promise(resolve => {
      setTimeout(() => {
        const products = this._products.filter(p => p.category === category);
        resolve([...products]);
      }, 300);
    });
  }
  
  async searchByName(query) {
    return new Promise(resolve => {
      setTimeout(() => {
        const products = this._products.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve([...products]);
      }, 300);
    });
  }
}

// 7. 프로모션 서비스 (캡슐화)
// PromotionService.js
export class PromotionService {
  constructor() {
    this._promoCodes = {
      'SUMMER10': 10,
      'WELCOME20': 20,
      'SALE30': 30
    };
  }
  
  getDiscount(code) {
    return this._promoCodes[code] || 0;
  }
  
  isValidCode(code) {
    return !!this._promoCodes[code];
  }
  
  getAllCodes() {
    return Object.keys(this._promoCodes);
  }
}

// 8. 결제 처리 서비스 인터페이스 (추상화)
// PaymentServiceInterface.js
export class PaymentServiceInterface {
  async processPayment(cart, paymentInfo) { throw new Error('구현 필요'); }
  async verifyPayment(paymentId) { throw new Error('구현 필요'); }
  async getPaymentStatus(paymentId) { throw new Error('구현 필요'); }
}

// 9. 로컬 결제 서비스 구현
// LocalPaymentService.js
export class LocalPaymentService extends PaymentServiceInterface {
  async processPayment(cart, paymentInfo) {
    // 결제 처리 시뮬레이션
    return new Promise(resolve => {
      setTimeout(() => {
        const paymentId = 'PAY-' + Math.random().toString(36).substr(2, 9);
        resolve({
          success: true,
          paymentId,
          amount: cart.total,
          date: new Date().toISOString()
        });
      }, 1000);
    });
  }
  
  async verifyPayment(paymentId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          verified: true,
          paymentId
        });
      }, 500);
    });
  }
  
  async getPaymentStatus(paymentId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: 'completed',
          paymentId
        });
      }, 300);
    });
  }
}

// 10. React 컴포넌트 예시 - 메인 쇼핑 페이지
import React, { useState, useEffect } from 'react';
import { Product, ClothingProduct, ElectronicsProduct } from './Product';
import { ShoppingCart } from './ShoppingCart';
import { MockProductRepository } from './MockProductRepository';
import { PromotionService } from './PromotionService';
import { LocalPaymentService } from './LocalPaymentService';

const ShoppingPage = () => {
  // 서비스 인스턴스 생성
  const productRepository = new MockProductRepository();
  const promotionService = new PromotionService();
  const paymentService = new LocalPaymentService();
  
  // 상태 관리
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(new ShoppingCart());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  
  // 상품 목록 로드
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productList = await productRepository.getAll();
        setProducts(productList);
      } catch (err) {
        setError('상품을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // 장바구니에 상품 추가
  const handleAddToCart = (product) => {
    try {
      const updatedCart = new ShoppingCart();
      
      // 기존 아이템 복사
      cart.items.forEach(item => {
        updatedCart.addItem(item.product, item.quantity);
      });
      
      // 새 아이템 추가
      updatedCart.addItem(product);
      
      // 기존 할인 유지
      if (cart.discount > 0) {
        updatedCart._discount = cart.discount;
      }
      
      setCart(updatedCart);
    } catch (err) {
      setError('장바구니에 추가하는데 실패했습니다.');
    }
  };
  
  // 수량 변경
  const handleUpdateQuantity = (productId, quantity) => {
    try {
      const updatedCart = new ShoppingCart();
      
      // 모든 아이템 복사하되 해당 아이템 수량 변경
      cart.items.forEach(item => {
        if (item.product.id === productId) {
          updatedCart.addItem(item.product, quantity);
        } else {
          updatedCart.addItem(item.product, item.quantity);
        }
      });
      
      // 기존 할인 유지
      if (cart.discount > 0) {
        updatedCart._discount = cart.discount;
      }
      
      setCart(updatedCart);
    } catch (err) {
      setError('수량 변경에 실패했습니다.');
    }
  };
  
  // 장바구니에서 상품 제거
  const handleRemoveFromCart = (productId) => {
    try {
      const updatedCart = new ShoppingCart();
      
      // 삭제할 아이템을 제외한 모든 아이템 복사
      cart.items
        .filter(item => item.product.id !== productId)
        .forEach(item => {
          updatedCart.addItem(item.product, item.quantity);
        });
      
      // 기존 할인 유지
      if (cart.discount > 0) {
        updatedCart._discount = cart.discount;
      }
      
      setCart(updatedCart);
    } catch (err) {
      setError('상품 제거에 실패했습니다.');
    }
  };
  
  // 프로모션 코드 적용
  const handleApplyPromoCode = () => {
    try {
      if (!promotionService.isValidCode(promoCode)) {
        setError('유효하지 않은 프로모션 코드입니다.');
        return;
      }
      
      const discount = promotionService.getDiscount(promoCode);
      const updatedCart = new ShoppingCart();
      
      // 모든 아이템 복사
      cart.items.forEach(item => {
        updatedCart.addItem(item.product, item.quantity);
      });
      
      // 할인 적용
      updatedCart._discount = discount;
      
      setCart(updatedCart);
      setError(null);
    } catch (err) {
      setError('프로모션 코드 적용에 실패했습니다.');
    }
  };
  
  // 결제 처리
  const handleCheckout = async () => {
    if (cart.isEmpty) {
      setError('장바구니가 비어 있습니다.');
      return;
    }
    
    try {
      setLoading(true);
      // 결제 정보 (실제 앱에서는 사용자 입력 필요)
      const paymentInfo = {
        method: 'card',
        cardNumber: '1234-5678-9012-3456',
        cardHolder: '홍길동'
      };
      
      const result = await paymentService.processPayment(cart, paymentInfo);
      
      if (result.success) {
        alert(`결제가 완료되었습니다. 결제 ID: ${result.paymentId}`);
        // 장바구니 비우기
        setCart(new ShoppingCart());
        setPromoCode('');
      } else {
        setError('결제 처리 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="shopping-page">
      <h1>쇼핑몰</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="content-wrapper">
        <div className="product-section">
          <h2>상품 목록</h2>
          
          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : (
            <div className="product-list">
              {products.map(product => (
                <div key={product.id} className="product-item">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="price">{product.price.toLocaleString()}원</p>
                  
                  {/* 상품 타입별 다양한 정보 표시 (다형성 활용) */}
                  {product instanceof ClothingProduct && (
                    <div className="product-details">
                      <p>사이즈: {product.size}</p>
                      <p>색상: {product.color}</p>
                    </div>
                  )}
                  
                  {product instanceof ElectronicsProduct && (
                    <div className="product-details">
                      <p>보증기간: {product.warranty}개월</p>
                      <p>브랜드: {product.brand}</p>
                    </div>
                  )}
                  
                  <button onClick={() => handleAddToCart(product)}>
                    장바구니에 추가
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="cart-section">
          <h2>장바구니</h2>
          
          {cart.isEmpty ? (
            <div className="empty-cart">장바구니가 비어 있습니다.</div>
          ) : (
            <>
              <div className="cart-items">
                {cart.items.map(item => (
                  <div key={item.product.id} className="cart-item">
                    <img src={item.product.imageUrl} alt={item.product.name} />
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p>{item.product.price.toLocaleString()}원</p>
                    </div>
                    <div className="quantity-control">
                      <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="item-total">
                      {item.subtotal.toLocaleString()}원
                    </div>
                    <button onClick={() => handleRemoveFromCart(item.product.id)}>삭제</button>
                  </div>
                ))}
              </div>
              
              <div className="promo-code">
                <input
                  type="text"
                  placeholder="프로모션 코드"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={handleApplyPromoCode}>적용</button>
              </div>
              
              <div className="cart-summary">
                <div className="summary-item">
                  <span>소계:</span>
                  <span>{cart.subtotal.toLocaleString()}원</span>
                </div>
                <div className="summary-item">
                  <span>세금:</span>
                  <span>{cart.totalTax.toLocaleString()}원</span>
                </div>
                
                {cart.discount > 0 && (
                  <div className="summary-item discount">
                    <span>할인 ({cart.discount}%):</span>
                    <span>-{cart.discountAmount.toLocaleString()}원</span>
                  </div>
                )}
                
                <div className="summary-item total">
                  <span>총 금액:</span>
                  <span>{cart.total.toLocaleString()}원</span>
                </div>
                
                <button 
                  className="checkout-button"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? '처리 중...' : '결제하기'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
