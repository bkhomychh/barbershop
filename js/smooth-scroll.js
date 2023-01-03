const anchorsRef = document.querySelectorAll('.js-anchor');

anchorsRef.forEach(anchor => {
  anchor.addEventListener('click', onAnchorClick);
});

function onAnchorClick(evt) {
  evt.preventDefault();
  evt.target.blur();

  const targetedEl = document.querySelector(`${evt.target.getAttribute('href')}`);
  const targetedElCoordinates = targetedEl.offsetTop;

  window.scrollTo({
    top: targetedElCoordinates,
    behavior: 'smooth',
  });
}
