
    // AOS init
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

    // Swiper init (testimonials)
    const swiper = new Swiper('.swiper', { loop: true, pagination: { el: '.swiper-pagination', clickable: true }, autoplay: { delay: 3500 } });

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth active nav link highlight
    const sections = document.querySelectorAll('section[id], header.hero');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const id = entry.target.getAttribute('id') || 'top';
        if(entry.isIntersecting){
          navLinks.forEach(l=>l.classList.remove('active'));
          const link = document.querySelector(`.nav-link[href="#${id}"]`);
          if(link) link.classList.add('active');
        }
      })
    },{ root: null, threshold: 0.4 });
    sections.forEach(s=>observer.observe(s));

    // Counters
    const targets = [
      { el: '#counter1', end: 10 },
      { el: '#counter2', end: 10000 },
      { el: '#counter3', end: 5 },
      { el: '#counter4', end: 80 }
    ];
    const easeOut = t => 1 - Math.pow(1 - t, 4);
    const runCounter = (el, end, duration=1600) => {
      const start = performance.now();
      function tick(now){
        const p = Math.min(1, (now-start)/duration);
        const value = Math.floor(easeOut(p) * end);
        el.textContent = value.toLocaleString();
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const counterObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          targets.forEach(t=>{ const el = document.querySelector(t.el); el && runCounter(el, t.end); });
          counterObserver.disconnect();
        }
      })
    },{ threshold: 0.5 });
    counterObserver.observe(document.querySelector('#work'));

    

    // Sticky navbar shadow on scroll
    const topNav = document.getElementById('topNav');
    const setShadow = () => {
      if(window.scrollY > 8){ topNav.classList.add('shadow'); } else { topNav.classList.remove('shadow'); }
    };
    setShadow();
    window.addEventListener('scroll', setShadow);
function handleFormSubmission(formId) {
  const form = document.getElementById(formId);
  const thankYou = form.nextElementSibling;

  form.addEventListener("submit", function(event){
    event.preventDefault();

    if(!form.checkValidity()){
      form.classList.add("was-validated");
      return;
    }

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if(response.ok){
        form.style.display = "none";
        thankYou.style.display = "block";

        setTimeout(() => {
          form.reset();
          form.classList.remove("was-validated");
          form.style.display = "block";
          thankYou.style.display = "none";

          // Close modal if inside Bootstrap modal
          const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
          if(modal) modal.hide();
        }, 2000);
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    }).catch(() => alert("Oops! There was a problem submitting your form."));
  });
}

// Initialize both forms
handleFormSubmission("freeQuoteForm");
handleFormSubmission("contactForm");

const advancedThankYou = document.querySelector(".thank-you-advanced");
const envelope = advancedThankYou.querySelector(".envelope");
const lettersContainer = advancedThankYou.querySelector(".letters-container");

function showAdvancedThankYou() {
  advancedThankYou.style.display = "flex";
  envelope.classList.add("open");

  // Generate flying letters
  const text = "YOUR MESSAGE SENT!";
  lettersContainer.innerHTML = "";
  text.split("").forEach((char, index) => {
    const span = document.createElement("div");
    span.classList.add("letter");
    span.textContent = char;
    span.style.left = `${Math.random() * 120}px`;
    span.style.top = `80px`;
    span.style.animationDelay = `${index * 0.1}s`;
    lettersContainer.appendChild(span);
  });

  // Hide after animation
  setTimeout(() => {
    envelope.classList.remove("open");
    advancedThankYou.style.display = "none";
  }, 2500);
}

// Example: trigger after form submission
document.getElementById("quoteForm").addEventListener("submit", function(e){
  e.preventDefault();
  const form = this;
  if (!form.checkValidity()) { form.classList.add("was-validated"); return; }

  fetch(form.action, { method: form.method, body: new FormData(form), headers: { 'Accept':'application/json' } })
    .then(res => {
      if (res.ok) {
        form.style.display = "none";
        showAdvancedThankYou();
        setTimeout(()=>{ form.reset(); form.style.display="block"; form.classList.remove("was-validated"); }, 5000);
      } else { alert("Submission error"); }
    }).catch(()=> alert("Submission error"));
});
