/**
 * Web Technologies 1 - Assignment #4: Introduction to JavaScript
 * Author: Bilyalov Askhat (SE-2514)
 */

document.addEventListener('DOMContentLoaded', () => {
  initDateTime();
  initBgColorChanger();
  initPopup();
  initAccordion();
  initFormValidation();
});

/* ==========================================================================
   Task 5. Display Current Date and Time
   ========================================================================== */
function initDateTime() {
  const dateTimeEl = document.getElementById('currentDateTime');
  if (!dateTimeEl) return;

  function update() {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    dateTimeEl.textContent = now.toLocaleString('en-US', options);
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   Task 4. Change Background Color with JavaScript
   ========================================================================== */
function initBgColorChanger() {
  const btn = document.getElementById('changeBgBtn');
  if (!btn) return;

  const bgColors = [
    '#f8f9fa', // Default light
    '#eef8f6', // Light mint
    '#fefae0', // Soft warm cream
    '#eef2f7', // Cool slate
    '#faedcd', // Light almond
    '#f3e8ee'  // Soft lavender
  ];
  let colorIndex = 0;

  btn.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % bgColors.length;
    document.body.style.backgroundColor = bgColors[colorIndex];
  });
}

/* ==========================================================================
   Task 3. Popup Subscription Form
   ========================================================================== */
function initPopup() {
  const modal = document.getElementById('subscriptionModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('popupSubscribeForm');
  const successMsg = document.getElementById('popupSuccessMsg');

  if (!modal || !openBtn || !closeBtn) return;

  // Open modal
  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // Close modal function
  const closeModal = () => {
    modal.style.display = 'none';
  };

  // Close on button click
  closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click (outside the modal box)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // Handle popup form submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const popupEmail = document.getElementById('popupEmail');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!popupEmail.value.trim() || !emailPattern.test(popupEmail.value.trim())) {
        popupEmail.classList.add('is-invalid');
        return;
      }

      popupEmail.classList.remove('is-invalid');
      if (successMsg) successMsg.style.display = 'block';
      form.reset();

      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
        closeModal();
      }, 1800);
    });
  }
}

/* ==========================================================================
   Task 2. Accordion for FAQs
   ========================================================================== */
function initAccordion() {
  const headers = document.querySelectorAll('.custom-accordion-header');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = header.nextElementSibling;
      const isOpen = item.classList.contains('active');

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   Task 1. Form Validation
   ========================================================================== */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const messageInput = document.getElementById('message');
  const consentInput = document.getElementById('consent');
  const formResult = document.getElementById('form-result');

  // Helper to set field error
  function setError(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback') ||
                     input.closest('.mb-3')?.querySelector('.invalid-feedback') ||
                     input.parentElement.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = message;
  }

  // Helper to set field success
  function setSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  // Email format regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setError(nameInput, 'Name is required.');
      isValid = false;
    } else {
      setSuccess(nameInput);
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      setError(emailInput, 'Email address is required.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      setSuccess(emailInput);
    }

    // Validate Password (min 6 characters)
    if (!passwordInput.value) {
      setError(passwordInput, 'Password is required.');
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      setError(passwordInput, 'Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setSuccess(passwordInput);
    }

    // Validate Confirm Password
    if (!confirmPasswordInput.value) {
      setError(confirmPasswordInput, 'Please confirm your password.');
      isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      setError(confirmPasswordInput, 'Passwords do not match.');
      isValid = false;
    } else {
      setSuccess(confirmPasswordInput);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      setError(messageInput, 'Message is required.');
      isValid = false;
    } else {
      setSuccess(messageInput);
    }

    // Validate Consent checkbox
    if (!consentInput.checked) {
      consentInput.classList.add('is-invalid');
      isValid = false;
    } else {
      consentInput.classList.remove('is-invalid');
    }

    // If all valid, display success result
    if (isValid) {
      if (formResult) {
        formResult.style.display = 'block';
        formResult.scrollIntoView({ behavior: 'smooth' });
      }
      form.reset();
      // Remove validation classes after reset
      [nameInput, emailInput, passwordInput, confirmPasswordInput, messageInput, consentInput].forEach(el => {
        el.classList.remove('is-valid');
      });
    }
  });
}
