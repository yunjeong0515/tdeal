/**
 * 공통 HTML Include 함수
 */
function includeHTML() {
  const includeElements = document.querySelectorAll('[data-include]');

  includeElements.forEach(el => {
    const filePath = el.getAttribute('data-include');

    if (filePath) {
      fetch(filePath + '?v=' + Date.now(), { cache: 'no-store' })
        .then(res => res.text())
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute('data-include');

          // --- 하단 탭바 활성화 체크 ---
          if (el.querySelector('.bottom-tab-bar')) {
            setActiveTab();
          }
        })
        .catch(err => console.error('Include Error:', err));
    }
  });
}

/**
 * 하단 탭바 Active 상태 관리
 */
function setActiveTab() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'home.html'; // 기본값을 home.html로

  const tabItems = document.querySelectorAll('.bottom-tab-bar .tab-item');

  tabItems.forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const targetPage = href.split('/').pop();

    item.classList.remove('active');

    // home.html에 있을 때 홈 아이콘 활성화
    if (currentPage === targetPage) {
      item.classList.add('active');
    }
  });
}

// 스크립트가 로드되자마자 실행
window.addEventListener('DOMContentLoaded', includeHTML);

/**
 * [추가] 다른 페이지에서 홈으로 갈 때 스플래시 방지
 * 하단 탭바의 '홈' 버튼 클릭 시 세션을 미리 심어줍니다.
 */
document.addEventListener('click', (e) => {
  const link = e.target.closest('.bottom-tab-bar a');
  if (link && link.getAttribute('href').includes('index.html')) {
    sessionStorage.setItem('splashSeen', 'true');
  }
});
