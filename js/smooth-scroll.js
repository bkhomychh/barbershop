document.body.addEventListener('click', onAnchorClick);

function onAnchorClick(evt) {
  if (!evt.target.classList.contains('js-anchor')) {
    return;
  }

  evt.preventDefault();
  evt.target.blur();

  const targetedEl = document.querySelector(`${evt.target.getAttribute('href')}`);
  const targetedElCoordinates = targetedEl.offsetTop;
  const mobileMenu = document.querySelector('.js-menu-container');
  const isMobileMenuOpen = mobileMenu.classList.contains('is-open');

  window.scrollTo({
    top: targetedElCoordinates,
    behavior: 'smooth',
  });

  if (isMobileMenuOpen) {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
}
