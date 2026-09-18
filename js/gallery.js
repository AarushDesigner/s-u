document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const closeButton = document.querySelector('[data-lightbox-close]');

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.classList.toggle('active', item === button));

      items.forEach((item) => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !matches);
      });
    });
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = item.dataset.src || item.querySelector('img').src;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    });

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });
  });
});
