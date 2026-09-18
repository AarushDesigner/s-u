document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  if (header) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  if (window.lucide) {
    lucide.createIcons();
  }

  document.querySelectorAll('.reveal').forEach((element) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(element);
  });

  const year = document.querySelector('[data-year]');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const form = document.querySelector('[data-booking-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const service = form.querySelector('[name="service"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      const status = form.querySelector('.form-status');

      const text = encodeURIComponent(
        `Hello S&U Professional Luxury Unisex Salon, I would like to enquire about an appointment. My name is ${name || 'Customer'}${phone ? ` and my phone number is ${phone}` : ''}${service ? ` for ${service}` : ''}${message ? `. Message: ${message}` : ''}`
      );

      if (status) {
        status.textContent = 'Your enquiry has been prepared. Please send it on WhatsApp to confirm your appointment.';
      }

      window.open(`https://wa.me/916230014000?text=${text}`, '_blank', 'noopener');
      form.reset();
    });
  }
});
