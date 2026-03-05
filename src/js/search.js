window.addEventListener('load', function() {
  if (typeof runSplashScreen === 'function') {
    runSplashScreen();
  }

  if (typeof productData !== 'undefined') {
    renderProducts('best', '.product-section.viewed .product-list');

  } else {

  }

});

function renderProducts(category, targetSelector) {
  const targetEl = document.querySelector(targetSelector);
  if (!targetEl || typeof productData === 'undefined') return;

  // 수정된 로직: 해당 카테고리 문자열이 포함되어 있는지 확인
  const filteredProducts = productData.filter(p => p.category.includes(category));

  const htmlContent = filteredProducts.map(product => `
    <li class="product-item">
      <div class="product-thumb">
        <img src="${product.thumb}" alt="${product.name}">
        <button type="button" class="btn-wish"><img src="src/img/icon/like.svg" alt="wish" /></button>
      </div>
      <div class="product-info">
        <span class="name">${product.name}</span>
        <div class="price-container">
          <div class="origin-row">
            <span class="badge-benefit">T혜택가</span>
            <span class="origin-price">${product.originPrice}</span>
          </div>
          <div class="sale-row">
            <span class="discount">${product.discount}</span>
            <span class="price">${product.price}</span>
          </div>
          <div class="sub-info">
            <div class="rating-row">
              <img src="src/img/icon/star_b5.svg" alt="별점" class="icon-star">
              <span class="rating">${product.rating}</span>
              <span class="review-count">(${product.reviewCount})</span>
            </div>

            ${product.tags && product.tags.length > 0 ? `
            <ul class="tag-list">
              ${product.tags.map(tag => `<li class="tag-item">${tag}</li>`).join('')}
            </ul>
            ` : ''}
          </div>
        </div>
        </div>
    </li>
  `).join('');

  targetEl.innerHTML = htmlContent;
}
