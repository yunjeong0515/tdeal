window.addEventListener('load', function() {
  const textContainer = document.getElementById('split-text');
  const text = textContainer.innerText;
  const characters = text.split(''); // 글자별로 자르기

  // 기존 텍스트 비우기
  textContainer.innerText = '';

  characters.forEach((char, index) => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.innerText = char === ' ' ? '\u00A0' : char; // 공백 처리

    // 로고 애니메이션이 끝날 때쯤(약 1.2초 후)부터 한 글자씩 등장
    // index * 0.1s 를 통해 순차적으로 나타나게 함
    span.style.animationDelay = `${0.5 + (index * 0.1)}s`;

    textContainer.appendChild(span);
  });

  // 모든 애니메이션이 끝나고 스플래시 종료 (글자 수에 따라 유동적 조절 가능)
  setTimeout(() => {
    document.getElementById('splash-screen').classList.add('fade-out');
  }, 4000);
});
