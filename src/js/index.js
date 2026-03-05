window.addEventListener('load', function() {
  if (typeof runSplashScreen === 'function') {
    runSplashScreen();
  }

  if (typeof productData !== 'undefined') {
    renderProducts('best', '.product-section.best .product-list');

    renderProducts('seol', '.product-section.seol .product-list');
  } else {
    console.error("products.js가 로드되지 않았거나 productData가 정의되지 않았습니다.");
  }

  // 1. 탭 메뉴 초기화
  initTabMenu();

  // 2. Swiper 초기화
  initMainSwiper();
  initMidSwiper();
});

function renderProducts(category, targetSelector) {
  const targetEl = document.querySelector(targetSelector);
  if (!targetEl || typeof productData === 'undefined') return;

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

function initCategoryTabs() {
  const tabButtons = document.querySelectorAll('.product-container .category-tab button');
  const productListSelector = '.product-section.seol .product-list';

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
    경
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');


      const categoryKeyword = this.getAttribute('data-cate');

      if (categoryKeyword) {

        renderProducts(categoryKeyword, productListSelector);
      }
    });
  });
}

function initTabMenu() {
  const tabs = document.querySelectorAll('.tab-item');
  const indicator = document.querySelector('.tab-indicator');

  if (!tabs.length || !indicator) return;

  // 초기 위치 잡기
  moveIndicator(document.querySelector('.tab-item.active'));

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      moveIndicator(e.target);
    });
  });
}

function moveIndicator(target) {
  const indicator = document.querySelector('.tab-indicator');
  if (!target || !indicator) return;
  indicator.style.left = `${target.offsetLeft}px`;
  indicator.style.width = `${target.offsetWidth}px`;
}

function initMainSwiper() {
  const swiperElement = document.querySelector('.mainSwiper');
  if (!swiperElement) return;

  // 1. 실제 슬라이드들(복사본 제외)을 가져옵니다.
  const slides = swiperElement.querySelectorAll('.swiper-slide');
  const totalSlides = slides.length;

  // 2. 각 슬라이드 안에 배지 HTML을 자동으로 삽입합니다.
  slides.forEach((slide, index) => {
    const badgeHTML = `
      <div class="swiper-pagination-badge">
        <div class="pagination-info">
          <span class="current">${index + 1}</span>
          <span class="divider"></span>
          <span class="total">${totalSlides}</span>
        </div>
        <button type="button" class="btn-view-all">
          <img src="src/img/icon/add_w.svg" alt="" style="width:12px; height:12px;" />
        </button>
      </div>
    `;

    slide.insertAdjacentHTML('beforeend', badgeHTML);
  });


  const mainSwiper = new Swiper(".mainSwiper", {
    slidesPerView: 1.02,
    centeredSlides: true,
    spaceBetween: 15,
    // loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }
  });
}

function initMidSwiper() {
  const midSwiperEl = document.querySelector('.midSwiper');
  if (!midSwiperEl) return;

  new Swiper(".midSwiper", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}
