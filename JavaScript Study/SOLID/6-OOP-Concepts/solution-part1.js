// OOP 개념을 적용한 쇼핑 카트 구현
// 주요 OOP 개념: 캡슐화, 상속, 다형성, 추상화

// 1. 기본 상품 모델 클래스 (추상화 및 캡슐화)
// Product.js
export class Product {
  constructor(id, name, price, category, imageUrl) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._category = category;
    this._imageUrl = imageUrl;
  }

  // 접근자 메서드를 통한 캡슐화
  get id() { return this._id; }
  get name() { return this._name; }
  get price() { return this._price; }
  get category() { return this._category; }
  get imageUrl() { return this._imageUrl; }
  
  // 기본 세금 계산 메서드 (다형성을 위한 메서드)
  calculateTax() {
    return this._price * 0.1; // 기본 세율 10%
  }
  
  // 상품 정보를 객체로 반환
  toJSON() {
    return {
      id: this._id,
      name: this._name,
      price: this._price,
      category: this._category,
      imageUrl: this._imageUrl
    };
  }
}

// 2. 다양한 상품 타입을 위한 파생 클래스 (상속과 다형성)
// ClothingProduct.js
export class ClothingProduct extends Product {
  constructor(id, name, price, imageUrl, size, color) {
    super(id, name, price, 'clothing', imageUrl);
    this._size = size;
    this._color = color;
  }
  
  get size() { return this._size; }
  get color() { return this._color; }
  
  // 의류 특화 세금 계산 메서드 오버라이드 (다형성)
  calculateTax() {
    return this._price * 0.08; // 의류 세율 8%
  }
  
  // 부모 메서드 오버라이드
  toJSON() {
    return {
      ...super.toJSON(),
      size: this._size,
      color: this._color
    };
  }
}

// ElectronicsProduct.js
export class ElectronicsProduct extends Product {
  constructor(id, name, price, imageUrl, warranty, brand) {
    super(id, name, price, 'electronics', imageUrl);
    this._warranty = warranty;
    this._brand = brand;
  }
  
  get warranty() { return this._warranty; }
  get brand() { return this._brand; }
  
  // 전자제품 특화 세금 계산 메서드 오버라이드 (다형성)
  calculateTax() {
    return this._price * 0.12; // 전자제품 세율 12%
  }
  
  // 부모 메서드 오버라이드
  toJSON() {
    return {
      ...super.toJSON(),
      warranty: this._warranty,
      brand: this._brand
    };
  }
}

// 3. 장바구니 아이템 클래스 (캡슐화)
// CartItem.js
export class CartItem {
  constructor(product, quantity = 1) {
    this._product = product;
    this._quantity = quantity;
  }
  
  get product() { return this._product; }
  get quantity() { return this._quantity; }
  get subtotal() { return this._product.price * this._quantity; }
  get tax() { return this._product.calculateTax() * this._quantity; }
  
  setQuantity(quantity) {
    if (quantity < 1) throw new Error('수량은 1 이상이어야 합니다.');
    this._quantity = quantity;
  }
  
  increaseQuantity(amount = 1) {
    this._quantity += amount;
  }
  
  decreaseQuantity(amount = 1) {
    const newQuantity = this._quantity - amount;
    if (newQuantity < 1) throw new Error('수량은 1 이상이어야 합니다.');
    this._quantity = newQuantity;
  }
  
  toJSON() {
    return {
      product: this._product.toJSON(),
      quantity: this._quantity,
      subtotal: this.subtotal,
      tax: this.tax
    };
  }
}

// 4. 장바구니 관리 클래스 (캡슐화와 추상화)
// ShoppingCart.js
export class ShoppingCart {
  constructor() {
    this._items = new Map(); // productId => CartItem
    this._promoCode = null;
    this._discount = 0;
  }
  
  get items() { return Array.from(this._items.values()); }
  get isEmpty() { return this._items.size === 0; }
  get itemCount() { return this._items.size; }
  get totalItems() { 
    return this.items.reduce((sum, item) => sum + item.quantity, 0); 
  }
  
  get subtotal() {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
  
  get totalTax() {
    return this.items.reduce((sum, item) => sum + item.tax, 0);
  }
  
  get discount() { return this._discount; }
  
  get discountAmount() {
    return this.subtotal * (this._discount / 100);
  }
  
  get total() {
    return this.subtotal + this.totalTax - this.discountAmount;
  }
  
  addItem(product, quantity = 1) {
    if (quantity < 1) throw new Error('수량은 1 이상이어야 합니다.');
    
    if (this._items.has(product.id)) {
      // 기존 아이템이 있는 경우 수량 증가
      const existingItem = this._items.get(product.id);
      existingItem.increaseQuantity(quantity);
    } else {
      // 새 아이템 추가
      this._items.set(product.id, new CartItem(product, quantity));
    }
    
    return this;
  }
  
  removeItem(productId) {
    this._items.delete(productId);
    return this;
  }
  
  updateQuantity(productId, quantity) {
    if (!this._items.has(productId)) {
      throw new Error(`상품 ID ${productId}를 찾을 수 없습니다.`);
    }
    
    const item = this._items.get(productId);
    item.setQuantity(quantity);
    
    return this;
  }
  
  clear() {
    this._items.clear();
    this._promoCode = null;
    this._discount = 0;
    return this;
  }
  
  applyPromoCode(code, discounts) {
    if (!discounts[code]) {
      throw new Error('유효하지 않은 프로모션 코드입니다.');
    }
    
    this._promoCode = code;
    this._discount = discounts[code];
    
    return this;
  }
  
  toJSON() {
    return {
      items: this.items.map(item => item.toJSON()),
      subtotal: this.subtotal,
      tax: this.totalTax,
      discount: this.discount,
      discountAmount: this.discountAmount,
      total: this.total
    };
  }
}
