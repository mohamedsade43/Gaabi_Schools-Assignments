// Mobile navigation and small frontend interactions
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Demo only: these forms do not send data to a server.
document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const message = form.querySelector('.form-message');
    if (message) {
      message.textContent = 'Thank you! This demo form is working, but it is not connected to a booking or messaging service yet.';
    }
    form.reset();
  });
});
