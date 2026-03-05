document.addEventListener('DOMContentLoaded', function() {
  initTabMenu();
  // 페이지 로드 시 렌더링 함수 실행
  renderLikeContents();
});

function initTabMenu() {
  const tabWrapper = document.querySelector('.like-content .top-tab-menu .tab-wrapper');
  const tabs = tabWrapper.querySelectorAll('button');
  const indicator = tabWrapper.querySelector('.tab-indicator');
  const wishContainer = document.querySelector('.wish-container');
  const recentContainer = document.querySelector('.recent-container');

  function setIndicator(activeTab) {
    if (!activeTab) return;
    indicator.style.width = `${activeTab.offsetWidth}px`;
    indicator.style.left = `${activeTab.offsetLeft}px`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      setIndicator(this);

      const tabType = this.getAttribute('data-tab');
      if (tabType === 'wish') {
        wishContainer.style.display = 'block';
        recentContainer.style.display = 'none';
      } else {
        wishContainer.style.display = 'none';
        recentContainer.style.display = 'block';
      }
    });
  });

  const activeTab = tabWrapper.querySelector('button.active');
  setIndicator(activeTab);

  const initialType = activeTab.getAttribute('data-tab');
  if (initialType === 'wish') {
    wishContainer.style.display = 'block';
    recentContainer.style.display = 'none';
  } else {
    wishContainer.style.display = 'none';
    recentContainer.style.display = 'block';
  }

  window.addEventListener('resize', () => {
    const activeTab = tabWrapper.querySelector('button.active');
    setIndicator(activeTab);
  });
}

function renderLikeContents() {
  if (typeof productData === 'undefined') {
    console.error("products.js가 로드되지 않았거나 productData가 정의되지 않았습니다.");
    return;
  }


  const wishProducts = productData.filter(p => p.category.includes('wish'));

  const wishListEl = document.querySelector('.wish-container .product-list');
  const emptyStateEl = document.querySelector('.wish-container .empty-state');
  const totalCountEl = document.querySelector('.wish-container .total-count');

  if (wishListEl) {
    if (wishProducts.length > 0) {
      wishListEl.innerHTML = createProductListHTML(wishProducts);
      if (emptyStateEl) emptyStateEl.style.display = 'none';
      wishListEl.style.display = 'block';
      if (totalCountEl) totalCountEl.textContent = wishProducts.length;
    } else {
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      wishListEl.style.display = 'none';
      if (totalCountEl) totalCountEl.textContent = '0';
    }
  }

  const recentProducts = productData.filter(p => p.category.includes('recent'));

  const recentListEl = document.querySelector('.recent-container .product-list.recent');
  const recentTotalCountEl = document.querySelector('.recent-container .recent .total-count');

  if (recentListEl) {
    recentListEl.innerHTML = createProductListHTML(recentProducts);
    if (recentTotalCountEl) recentTotalCountEl.textContent = recentProducts.length;
  }


  const recommendedProducts = productData.filter(p => p.category.includes('recommended'));

  const recommendedListEl = document.querySelector('.recommended-list');

  if (recommendedListEl) {
    recommendedListEl.innerHTML = createProductListHTML(recommendedProducts);
  }
}

function createProductListHTML(products) {
  return products.map(product => `
    <li class="product-item">
      <div class="product-thumb">
        <img src="${product.thumb}" alt="${product.name}">
        <button type="button" class="btn-wish active"><img src="src/img/icon/like.svg" alt="wish" /></button>
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
    </li>
  `).join('');
}
