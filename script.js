// script.js – финальная версия (без жидкости, с новым гамбургером)
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
    if (cursor.parentNode !== container) container.appendChild(cursor);
    function type() {
      if (index < text.length) {
        const char = text[index];
        const span = document.createElement('span');
        span.className = 'letter' + (char === ' ' ? ' space' : '');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        container.insertBefore(span, cursor);
        setTimeout(() => span.classList.add('visible'), 10);
        index++;
        setTimeout(type, speed + Math.random() * 30 - 15);
      } else if (callback) callback();
    }
    type();
  }

  if (preloader && loaderName && loaderSubtitle && cursor) {
    loaderName.innerHTML = loaderSubtitle.innerHTML = '';
    typeText(loaderName, nameText, 80, () => {
      setTimeout(() => {
        typeText(loaderSubtitle, subtitleText, 40, () => {
          setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.parentNode?.removeChild(preloader), 500);
          }, 800);
        });
      }, 400);
    });
  }

  // ========== ГАМБУРГЕР-МЕНЮ (с чекбоксом) ==========
  const checkbox = document.getElementById('checkbox');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');
  const overlay = document.getElementById('menuOverlay');

  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    checkbox.checked = false; // сбрасываем чекбокс
  }

  function openMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    checkbox.checked = true; // устанавливаем чекбокс
  }

  if (checkbox && mobileMenu && closeBtn && overlay) {
    // Открытие/закрытие при клике на гамбургер
    checkbox.addEventListener('change', function(e) {
      if (this.checked) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Закрытие по крестику в меню
    closeBtn.addEventListener('click', closeMenu);

    // Закрытие по клику на оверлей
    overlay.addEventListener('click', closeMenu);

    // Закрытие при клике на ссылку в меню
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ========== АККОРДЕОН ==========
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ========== МОДАЛЬНОЕ ОКНО ==========
  const modal = {
    overlay: document.getElementById('modalOverlay'),
    closeBtn: document.getElementById('modalClose'),
    progress: document.getElementById('progressBarFill'),
    steps: {
      1: document.getElementById('step1'),
      2: document.getElementById('step2'),
      3: document.getElementById('step3'),
      4: document.getElementById('step4'),
      5: document.getElementById('step5')
    },
    inputs: {
      name: document.getElementById('nameInput'),
      email: document.getElementById('emailInput'),
      service: document.getElementById('serviceSelect'),
      message: document.getElementById('messageInput')
    },
    summary: document.getElementById('summaryList'),
    next: [document.getElementById('next1'), document.getElementById('next2'), document.getElementById('next3'), document.getElementById('next4')],
    submit: document.getElementById('submitForm')
  };

  let currentStep = 1;

  function showStep(step) {
    Object.values(modal.steps).forEach(s => s.style.display = 'none');
    modal.steps[step].style.display = 'block';
    modal.progress.style.width = (step * 20) + '%';
    currentStep = step;
  }

  function openModal() {
    modal.overlay.classList.add('active');
    modal.inputs.name.value = '';
    modal.inputs.email.value = '';
    modal.inputs.service.value = '';
    modal.inputs.message.value = '';
    showStep(1);
  }

  document.querySelectorAll('.modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  });

  modal.closeBtn?.addEventListener('click', () => modal.overlay.classList.remove('active'));
  modal.overlay.addEventListener('click', (e) => e.target === modal.overlay && modal.overlay.classList.remove('active'));

  modal.next[0]?.addEventListener('click', () => {
    if (modal.inputs.name.value.trim()) showStep(2); else alert('Введите имя');
  });
  modal.next[1]?.addEventListener('click', () => {
    if (/^\S+@\S+\.\S+$/.test(modal.inputs.email.value.trim())) showStep(3); else alert('Введите корректный email');
  });
  modal.next[2]?.addEventListener('click', () => {
    if (modal.inputs.service.value) showStep(4); else alert('Выберите услугу');
  });
  modal.next[3]?.addEventListener('click', () => {
    modal.summary.innerHTML = `
      <li><strong>Имя:</strong> ${modal.inputs.name.value}</li>
      <li><strong>Email:</strong> ${modal.inputs.email.value}</li>
      <li><strong>Услуга:</strong> ${modal.inputs.service.value}</li>
      <li><strong>Комментарий:</strong> ${modal.inputs.message.value || 'не указан'}</li>
    `;
    showStep(5);
  });

  modal.submit?.addEventListener('click', () => {
    alert('Спасибо! Ваша заявка отправлена.');
    modal.overlay.classList.remove('active');
  });

  // ========== ПЛАВНЫЙ СКРОЛЛ ==========
  document.querySelectorAll('a[href^="#"]:not(.modal-trigger)').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ========== СЛАЙДЕР ==========
  if (typeof Swiper !== 'undefined' && document.querySelector('.services-swiper')) {
    new Swiper('.services-swiper', {
      loop: true, speed: 800, slidesPerView: 1, spaceBetween: 0, centeredSlides: true,
      effect: 'coverflow', coverflowEffect: { rotate: 50, stretch: 0, depth: 60, modifier: 1, slideShadows: true },
      grabCursor: true, parallax: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 1000: { slidesPerView: 2, spaceBetween: 0 }, 767: { slidesPerView: 2, spaceBetween: -80 } }
    });
  }
});