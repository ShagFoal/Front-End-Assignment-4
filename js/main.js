// Form validation
const contactForm = document.getElementById('contact-form');

function checkField(input, valid) {
  input.classList.toggle('is-invalid', !valid);
  return valid;
}

if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirmPassword');
  const messageInput = document.getElementById('message');
  const consentInput = document.getElementById('consent');
  const result = document.getElementById('form-result');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    result.style.display = 'none';

    const nameValid = checkField(nameInput, nameInput.value.trim() !== '');
    const emailValid = checkField(emailInput, emailInput.value.trim() !== '' && emailInput.validity.valid);
    const passwordValid = checkField(passwordInput, passwordInput.value.trim() !== '' && passwordInput.value.length >= 6);
    const confirmValid = checkField(confirmInput, confirmInput.value !== '' && confirmInput.value === passwordInput.value);
    const messageValid = checkField(messageInput, messageInput.value.trim() !== '');
    const consentValid = checkField(consentInput, consentInput.checked);

    if (nameValid && emailValid && passwordValid && confirmValid && messageValid && consentValid) {
      result.style.display = 'block';
      contactForm.reset();
    }
  });

  contactForm.addEventListener('input', () => {
    result.style.display = 'none';
  });
}

// FAQ
const questions = document.querySelectorAll('.custom-accordion-header');

questions.forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const answer = question.nextElementSibling;
    const open = item.classList.toggle('active');

    question.setAttribute('aria-expanded', String(open));
    answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0px';
  });
});

window.addEventListener('resize', () => {
  document.querySelectorAll('.custom-accordion-item.active .custom-accordion-body').forEach((answer) => {
    answer.style.maxHeight = answer.scrollHeight + 'px';
  });
});

// Popup
const modal = document.getElementById('subscriptionModal');
const openButton = document.getElementById('openModalBtn');

if (modal && openButton) {
  const closeButton = document.getElementById('closeModalBtn');
  const subscribeForm = document.getElementById('popupSubscribeForm');
  const popupEmail = document.getElementById('popupEmail');
  const successMessage = document.getElementById('popupSuccessMsg');

  function closePopup() {
    modal.style.display = 'none';
    openButton.focus();
  }

  openButton.addEventListener('click', () => {
    subscribeForm.reset();
    popupEmail.classList.remove('is-invalid');
    successMessage.style.display = 'none';
    modal.style.display = 'flex';
    popupEmail.focus();
  });

  closeButton.addEventListener('click', closePopup);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closePopup();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') closePopup();
  });

  subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.style.display = 'none';
    if (checkField(popupEmail, popupEmail.value.trim() !== '' && popupEmail.validity.valid)) {
      successMessage.style.display = 'block';
      subscribeForm.reset();
    }
  });
  popupEmail.addEventListener('input', () => {
    successMessage.style.display = 'none';
  });
}

// Background color
const colorButton = document.getElementById('changeBgBtn');

if (colorButton) {
  const colors = ['#f7f9fa', '#eef8f6', '#fefae0'];
  let colorIndex = 0;

  colorButton.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
  });
}

// Clock
const clock = document.getElementById('currentDateTime');

if (clock) {
  function updateClock() {
    clock.textContent = new Date().toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  }

  updateClock();
  setInterval(updateClock, 1000);
}
