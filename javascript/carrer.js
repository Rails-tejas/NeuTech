
  AOS.init();

  // Bootstrap form validation
  (() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();


// Bootstrap validation
  (function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  })()

  // AJAX submission
  const form = document.getElementById('internshipForm');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!form.checkValidity()) return;

    const data = new FormData(form);
    const messageDiv = document.getElementById('formMessage');

    try {
      const response = await fetch('https://formspree.io/f/xvgbbawo', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        messageDiv.innerHTML = '<div class="alert alert-success">Application submitted successfully! We will contact you soon.</div>';
        form.reset();
        form.classList.remove('was-validated');
      } else {
        messageDiv.innerHTML = '<div class="alert alert-danger">There was a problem submitting your application. Please try again later.</div>';
      }
    } catch (error) {
      messageDiv.innerHTML = '<div class="alert alert-danger">Network error. Please try again later.</div>';
    }
  });
