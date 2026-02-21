window.addEventListener('load', function() {
  const textContainer = document.getElementById('split-text');
  const text = textContainer.innerText;
  const characters = text.split('');

  textContainer.innerText = '';

  characters.forEach((char, index) => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.innerText = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${0.5 + (index * 0.1)}s`;
    textContainer.appendChild(span);
  });

  // --- 탭 메뉴 미끄러지는 바 로직 ---
  const wrapper = document.querySelector('.tab-wrapper');
  const tabs = document.querySelectorAll('.tab-item');
  const indicator = document.querySelector('.tab-indicator');

  function moveIndicator(target) {
    if (!target || !indicator) return;
    const width = target.getBoundingClientRect().width;
    const left = target.offsetLeft;

    indicator.style.width = `${width}px`;
    indicator.style.left = `${left}px`;
  }

  // 탭 클릭 이벤트 설정
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      moveIndicator(e.target);

      e.target.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    });
  });

  // 스플래시 종료 및 메인 컨텐츠 초기화
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    splash.classList.add('fade-out');

    // 스플래시가 사라지기 시작할 때 탭 바 위치를 잡음
    const activeTab = document.querySelector('.tab-item.active');
    if (activeTab) {
      moveIndicator(activeTab);
    }

    // Swiper 배너가 있다면 여기서 함께 초기화해주는 것이 안전합니다.
    initSwiper();

  }, 4000);
});


function initSwiper() {
  const swiperElement = document.querySelector('.mainSwiper');
  if (!swiperElement) return;


  const currentEl = document.querySelector('.swiper-pagination-badge .current');
  const totalEl = document.querySelector('.swiper-pagination-badge .total');


  const realSlides = swiperElement.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
  if (totalEl) totalEl.innerText = realSlides.length;

  const mainSwiper = new Swiper(".mainSwiper", {
    slidesPerView: 1.02,
    centeredSlides: true,
    spaceBetween: 15,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    on: {
      init: function() {

        if (currentEl) {
          currentEl.innerText = this.realIndex + 1;
        }
      },
      slideChange: function () {
        if (currentEl) {
          currentEl.innerText = this.realIndex + 1;
        }
      }
    }
  });
}
