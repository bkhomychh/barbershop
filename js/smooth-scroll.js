const anchorsRef = document.querySelectorAll('.js-anchor');

anchorsRef.forEach(anchor => {
  anchor.addEventListener('click', onAnchorClick);
});

function onAnchorClick(evt) {
  evt.preventDefault();
  evt.target.blur();

  const targetedEl = document.querySelector(`${evt.target.getAttribute('href')}`);
  const targetedElCoordinates = targetedEl.offsetTop;
  const mobileMenu = document.querySelector('.js-menu-container');

  window.scrollTo({
    top: targetedElCoordinates,
    behavior: 'smooth',
  });

  if (mobileMenu.classList.contains('is-open')) {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
}
