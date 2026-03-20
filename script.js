// script.js – финальная версия с красным словом Logistics и исправленным слайдером
document.addEventListener('DOMContentLoaded', () => {
  // ========== ПРЕЛОАДЕР ==========
  const preloader = document.getElementById('preloader');
  const loaderName = document.getElementById('loaderName');
  const loaderSubtitle = document.getElementById('loaderSubtitle');
  const cursor = document.querySelector('.loader-cursor');

  const nameText = 'MonLogistics Trans Service';
  const subtitleText = 'Транспортно — Логистическая компания';

  // Функция для печати с возможностью выделения диапазона индексов красным
  function typeText(container, text, speed, callback, highlightRange = null) {
    let index = 0;
    if (cursor.parentNode !== container) container.appendChild(cursor);
    
    function type() {
      if (index < text.length) {
        const char = text[index];
        const span = document.createElement('span');
        span.className = 'letter' + (char === ' ' ? ' space' : '');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        
        // Если задан диапазон и текущий индекс входит в него, добавляем красный класс
        if (highlightRange && index >= highlightRange.start && index <= highlightRange.end) {
          span.classList.add('red-letter');
        }
        
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
    
    // Определяем диапазон индексов для слова "Logistics" в строке "MonLogistics Trans Service"
    // Индексы: 0:M,1:o,2:n,3:L,4:o,5:g,6:i,7:s,8:t,9:i,10:c,11:s,12:пробел,13:T...
    // Значит Logistics с 3 по 11 (включительно)
    const logisticsRange = { start: 3, end: 11 };
    
    typeText(loaderName, nameText, 80, () => {
      setTimeout(() => {
        typeText(loaderSubtitle, subtitleText, 40, () => {
          setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.parentNode?.removeChild(preloader), 500);
          }, 800);
        });
      }, 400);
    }, logisticsRange);
  }

  // ========== ГАМБУРГЕР-МЕНЮ ==========
  const checkbox = document.getElementById('checkbox');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');
  const overlay = document.getElementById('menuOverlay');

  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    checkbox.checked = false;
  }

  function openMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    checkbox.checked = true;
  }

  if (checkbox && mobileMenu && closeBtn && overlay) {
    checkbox.addEventListener('change', function(e) {
      if (this.checked) openMenu(); else closeMenu();
    });
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
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

  // ========== СЛАЙДЕР УСЛУГ (исправленный) ==========
  if (typeof Swiper !== 'undefined' && document.querySelector('.services-swiper')) {
    setTimeout(() => {
      const swiper = new Swiper('.services-swiper', {
        loop: true,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 30,
          stretch: 0,
          depth: 40,
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
          1200: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: -80,
          },
        },
        on: {
          init: function () {
            this.update();
          }
        }
      });
      setTimeout(() => {
        if (swiper) swiper.update();
      }, 100);
    }, 100);
  }
});