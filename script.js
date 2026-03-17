// script.js – полная версия (без жидкости)
document.addEventListener('DOMContentLoaded', () => {
  // ========== ПРЕЛОАДЕР ==========
  const preloader = document.getElementById('preloader');
  const loaderName = document.getElementById('loaderName');
  const loaderSubtitle = document.getElementById('loaderSubtitle');
  const cursor = document.querySelector('.loader-cursor');

  const nameText = 'MonLogistics Trans Service';
  const subtitleText = 'Транспортно — Логистическая компания';

  function typeText(container, text, speed, callback) {
    let index = 0;
    if (cursor.parentNode !== container) {
      container.appendChild(cursor);
    }
    function type() {
      if (index < text.length) {
        const char = text[index];
        const span = document.createElement('span');
        span.className = 'letter' + (char === ' ' ? ' space' : '');
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = char;
        }
        container.insertBefore(span, cursor);
        setTimeout(() => {
          span.classList.add('visible');
        }, 10);
        index++;
        setTimeout(type, speed + Math.random() * 30 - 15);
      } else {
        if (callback) callback();
      }
    }
    type();
  }

  if (preloader && loaderName && loaderSubtitle && cursor) {
    loaderName.innerHTML = '';
    loaderSubtitle.innerHTML = '';

    typeText(loaderName, nameText, 80, () => {
      setTimeout(() => {
        typeText(loaderSubtitle, subtitleText, 40, () => {
          setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
              if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
            }, 500);
          }, 800);
        });
      }, 400);
    });
  }

  // ========== БУРГЕР-МЕНЮ ==========
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');
  if (burger && mobileMenu && closeBtn) {
    burger.addEventListener('click', () => mobileMenu.classList.add('active'));
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });
  }

  // ========== АККОРДЕОН ==========
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ========== МОДАЛЬНОЕ ОКНО ==========
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const progressBarFill = document.getElementById('progressBarFill');
  
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');
  const step5 = document.getElementById('step5');
  
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const serviceSelect = document.getElementById('serviceSelect');
  const messageInput = document.getElementById('messageInput');
  const summaryList = document.getElementById('summaryList');
  
  const next1 = document.getElementById('next1');
  const next2 = document.getElementById('next2');
  const next3 = document.getElementById('next3');
  const next4 = document.getElementById('next4');
  const submitForm = document.getElementById('submitForm');

  let currentStep = 1;

  function showStep(step) {
    step1.style.display = 'none';
    step2.style.display = 'none';
    step3.style.display = 'none';
    step4.style.display = 'none';
    step5.style.display = 'none';
    
    if (step === 1) step1.style.display = 'block';
    if (step === 2) step2.style.display = 'block';
    if (step === 3) step3.style.display = 'block';
    if (step === 4) step4.style.display = 'block';
    if (step === 5) step5.style.display = 'block';
    
    progressBarFill.style.width = (step * 20) + '%';
    currentStep = step;
  }

  function openModal() {
    modalOverlay.classList.add('active');
    nameInput.value = '';
    emailInput.value = '';
    serviceSelect.value = '';
    messageInput.value = '';
    showStep(1);
  }

  document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  if (next1) {
    next1.addEventListener('click', () => {
      if (nameInput.value.trim() !== '') {
        showStep(2);
      } else {
        alert('Пожалуйста, введите имя');
      }
    });
  }

  if (next2) {
    next2.addEventListener('click', () => {
      const email = emailInput.value.trim();
      if (email && email.includes('@')) {
        showStep(3);
      } else {
        alert('Введите корректный email');
      }
    });
  }

  if (next3) {
    next3.addEventListener('click', () => {
      if (serviceSelect.value) {
        showStep(4);
      } else {
        alert('Выберите услугу');
      }
    });
  }

  if (next4) {
    next4.addEventListener('click', () => {
      summaryList.innerHTML = `
        <li><strong>Имя:</strong> ${nameInput.value}</li>
        <li><strong>Email:</strong> ${emailInput.value}</li>
        <li><strong>Услуга:</strong> ${serviceSelect.value}</li>
        <li><strong>Комментарий:</strong> ${messageInput.value || 'не указан'}</li>
      `;
      showStep(5);
    });
  }

  if (submitForm) {
    submitForm.addEventListener('click', () => {
      alert('Спасибо! Ваша заявка отправлена. Наш менеджер свяжется с вами.');
      modalOverlay.classList.remove('active');
      nameInput.value = '';
      emailInput.value = '';
      serviceSelect.value = '';
      messageInput.value = '';
    });
  }

  // ========== ПЛАВНЫЙ СКРОЛЛ ==========
  document.querySelectorAll('a[href^="#"]:not(.modal-trigger)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== СЛАЙДЕР ==========
  if (typeof Swiper !== 'undefined' && document.querySelector('.services-swiper')) {
    new Swiper('.services-swiper', {
      loop: true,
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 60,
        modifier: 1,
        slideShadows: true,
      },
      grabCursor: true,
      parallax: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1000: { slidesPerView: 2, spaceBetween: 0 },
        767: { slidesPerView: 2, spaceBetween: -80 }
      }
    });
  }
});