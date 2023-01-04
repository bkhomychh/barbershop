let slider = tns({
  container: '.slider',
  items: 1,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayButtonOutput: false,
  speed: 400,
  freezable: true,

  controlsText: ['Back', 'Forward'],
  preventActionWhenRunning: true,
});

const controlsRef = document.querySelector('.tns-controls');
const sliderRef = document.querySelector('.slider');

controlsRef.addEventListener('click', onControlsClick);

function onControlsClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  slider.play();
}
