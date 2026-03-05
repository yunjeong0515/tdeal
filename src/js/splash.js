/**
 * Splash Screen
 */
function runSplashScreen() {
  const textContainer = document.getElementById('split-text');
  const splash = document.getElementById('splash-screen');

  if (textContainer) {
    const text = textContainer.innerText;
    const characters = text.split('');
    textContainer.innerText = '';

    characters.forEach((char, index) => {
      const span = document.createElement('span');
      span.classList.add('char');
      span.innerText = char === ' ' ? '\u00A0' : char;
      // 지연 시간을 0.5초부터 시작하여 순차적으로 부여
      span.style.animationDelay = `${0.5 + (index * 0.1)}s`;
      textContainer.appendChild(span);
    });
  }
}

// 파일이 로드되면 자동으로 실행되도록 추가
document.addEventListener('DOMContentLoaded', runSplashScreen);
