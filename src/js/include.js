function includeHTML() {
  const includeElements = document.querySelectorAll('[data-include]');

  includeElements.forEach(el => {
    const filePath = el.getAttribute('data-include');

    if (filePath) {
      console.log('Include:', filePath);

      fetch(filePath + '?v=' + Date.now(), { cache: 'no-store' })
        .then(res => res.text())
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute('data-include');
        });
    }
  });
}

window.addEventListener('DOMContentLoaded', includeHTML);
