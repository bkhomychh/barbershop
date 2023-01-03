const lazyImages = [...document.querySelectorAll('img[data-src], source[data-srcset]')];

if ('loading' in HTMLImageElement.prototype) {
  fillSrc(lazyImages);
} else {
  onDocumentScroll();

  document.addEventListener('scroll', throttle(onDocumentScroll, 300));

  function onDocumentScroll() {
    const bottomViewportCoordinates = window.innerHeight + window.pageYOffset;
    const imagesToDownload = lazyImages.filter(
      img => img.offsetTop - bottomViewportCoordinates < 500,
    );

    fillSrc(imagesToDownload);
  }
}

function fillSrc(images) {
  [...images].forEach(img => {
    if (img.hasAttribute('src')) {
      img.src = img.dataset.src;
    } else {
      img.srcset = img.dataset.srcset;
    }

    removeItemFromArray(images, img);
  });
}

function removeItemFromArray(array, item) {
  array.splice(array.indexOf(item), 1);
}

function throttle(fn, ms) {
  let timeoutIsLaunched = false;

  function launchFn() {
    if (timeoutIsLaunched) {
      return;
    }

    fn();
    setTimeout(() => (timeoutIsLaunched = false), ms);
    timeoutIsLaunched = true;
  }

  return launchFn;
}
