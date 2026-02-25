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
      span.style.animationDelay = `${0.5 + (index * 0.1)}s`;
      textContainer.appendChild(span);
    });
  }


  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
    }, 4000);
  }
}
