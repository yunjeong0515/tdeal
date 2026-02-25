window.addEventListener('load', function() {
  // 스플래시 로직 실행 (파일을 분리했다면 여기서 호출)
  if (typeof runSplashScreen === 'function') {
    runSplashScreen();
  }

  // 1. 탭 메뉴 초기화
  initTabMenu();

  // 2. Swiper 초기화
  initSwiper();
});

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

function initSwiper() {
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
    // 슬라이드 내용 맨 뒤에 추가
    slide.insertAdjacentHTML('beforeend', badgeHTML);
  });

  // 3. Swiper 초기화 (이제 숫자는 고정되었으니 넘기기만 하면 됩니다)
  const mainSwiper = new Swiper(".mainSwiper", {
    slidesPerView: 1.02,
    centeredSlides: true,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }
  });
}
