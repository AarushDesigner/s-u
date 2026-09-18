document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('[data-menu]');

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
});
