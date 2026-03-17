// script.js – полная версия

document.addEventListener('DOMContentLoaded', () => {
  // ========== ПРЕЛОАДЕР С ПЕЧАТАЮЩИМСЯ ТЕКСТОМ ==========
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

  // ========== АККОРДЕОН "КАК СТАТЬ КЛИЕНТОМ" ==========
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
  
  // Шаги
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');
  const step5 = document.getElementById('step5');
  
  // Поля
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const serviceSelect = document.getElementById('serviceSelect');
  const messageInput = document.getElementById('messageInput');
  const summaryList = document.getElementById('summaryList');
  
  // Кнопки навигации
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

  // Функция открытия модального окна (сброс на первый шаг)
  function openModal() {
    modalOverlay.classList.add('active');
    // Сбрасываем поля (опционально)
    nameInput.value = '';
    emailInput.value = '';
    serviceSelect.value = '';
    messageInput.value = '';
    showStep(1);
  }

  // Обработчик для всех элементов с классом modal-trigger
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
      // Составляем сводку
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
      // Очистка полей
      nameInput.value = '';
      emailInput.value = '';
      serviceSelect.value = '';
      messageInput.value = '';
    });
  }

  // ========== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРЕЙ ==========
  document.querySelectorAll('a[href^="#"]:not(.modal-trigger)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== АНИМАЦИЯ ЖИДКОСТИ В ПРЕИМУЩЕСТВАХ ==========
  // Настройки карточек (цвета изменены на бордово-золотую гамму)
  const cards = [
    { id: 'card1', canvasId: 'canvas1', initialLevel: 0.9, color: '#8b1e1e' },
    { id: 'card2', canvasId: 'canvas2', initialLevel: 0.9, color: '#b84a4a' },
    { id: 'card3', canvasId: 'canvas3', initialLevel: 0.9, color: '#d4a00b' },
    { id: 'card4', canvasId: 'canvas4', initialLevel: 0.1, color: '#6d1717' }
  ];

  // Класс для управления жидкостью в одной карточке
  class LiquidCanvas {
    constructor(canvasId, initialLevel, color) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.level = initialLevel; // от 0 до 1
      this.color = color;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.waveOffset = 0;
      this.ripples = []; // для эффекта ряби
      this.draw();
    }

    setLevel(newLevel) {
      this.level = Math.max(0, Math.min(1, newLevel));
    }

    addRipple(x, y) {
      this.ripples.push({ x, y, radius: 5, alpha: 1 });
    }

    draw() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      const liquidY = this.height * (1 - this.level);

      // Рисуем жидкость
      this.ctx.beginPath();
      this.ctx.moveTo(0, liquidY);

      this.waveOffset += 0.02;
      for (let x = 0; x <= this.width; x += 20) {
        const wave = Math.sin(x * 0.02 + this.waveOffset) * 10 * this.level;
        this.ctx.lineTo(x, liquidY + wave);
      }
      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.closePath();

      const gradient = this.ctx.createLinearGradient(0, liquidY, 0, this.height);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(255,255,255,0.3)');
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Блики
      this.ctx.save();
      this.ctx.globalAlpha = 0.2;
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, liquidY - 5, this.width, 5);
      this.ctx.restore();

      // Рябь
      this.ripples.forEach((ripple, index) => {
        this.ctx.beginPath();
        this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = `rgba(255,255,255,${ripple.alpha})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        ripple.radius += 0.5;
        ripple.alpha -= 0.02;
        if (ripple.alpha <= 0) this.ripples.splice(index, 1);
      });

      requestAnimationFrame(() => this.draw());
    }
  }

  // Инициализация жидкостей
  const liquids = cards.map(c => new LiquidCanvas(c.canvasId, c.initialLevel, c.color));

  // Система частиц (капли)
  class Drop {
    constructor(x, y, targetY, color) {
      this.x = x;
      this.y = y;
      this.vy = 2;
      this.radius = 8;
      this.color = color;
      this.targetY = targetY;
    }

    update() {
      this.y += this.vy;
      this.vy += 0.2; // гравитация
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  let drops = [];

  // Генерация капель из верхних карточек
  function generateDrops() {
    for (let i = 0; i < 3; i++) {
      const liquid = liquids[i];
      if (liquid.level > 0.1 && Math.random() < 0.02) {
        const cardElement = document.getElementById(cards[i].id);
        if (!cardElement) continue;
        const rect = cardElement.getBoundingClientRect();
        const dropX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 40;
        const dropY = rect.bottom;
        const targetY = document.getElementById('card4').getBoundingClientRect().top;
        drops.push(new Drop(dropX, dropY, targetY, cards[i].color));
      }
    }
  }

  // Анимация уровней с GSAP (если GSAP загружен)
  if (typeof gsap !== 'undefined' && liquids.every(l => l)) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cards-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 2,
      }
    });

    tl.to(liquids[0], { level: 0.1, duration: 3, ease: 'power1.inOut',
        onUpdate: function() { liquids[0].setLevel(this.targets()[0].level); } }, 0)
      .to(liquids[1], { level: 0.1, duration: 3, ease: 'power1.inOut',
        onUpdate: function() { liquids[1].setLevel(this.targets()[0].level); } }, 0)
      .to(liquids[2], { level: 0.1, duration: 3, ease: 'power1.inOut',
        onUpdate: function() { liquids[2].setLevel(this.targets()[0].level); } }, 0)
      .to(liquids[3], { level: 0.9, duration: 3, ease: 'power1.inOut',
        onUpdate: function() { liquids[3].setLevel(this.targets()[0].level); } }, 0);
  }

  // Canvas для отрисовки капель (поверх всего)
  const dropCanvas = document.createElement('canvas');
  dropCanvas.style.position = 'absolute';
  dropCanvas.style.top = '0';
  dropCanvas.style.left = '0';
  dropCanvas.style.width = '100%';
  dropCanvas.style.height = '100%';
  dropCanvas.style.pointerEvents = 'none';
  dropCanvas.width = window.innerWidth;
  dropCanvas.height = window.innerHeight;
  document.body.appendChild(dropCanvas);
  const dropCtx = dropCanvas.getContext('2d');

  function animateDrops() {
    dropCtx.clearRect(0, 0, dropCanvas.width, dropCanvas.height);
    dropCanvas.style.filter = 'url(#goo)';

    generateDrops();

    drops.forEach((drop, index) => {
      drop.update();
      drop.draw(dropCtx);

      const card4Rect = document.getElementById('card4')?.getBoundingClientRect();
      if (card4Rect && drop.y > card4Rect.top - 20) {
        const relativeX = drop.x - card4Rect.left;
        const relativeY = drop.y - card4Rect.top;
        liquids[3]?.addRipple(relativeX, relativeY);
        drops.splice(index, 1);
      }

      if (drop.y > dropCanvas.height) {
        drops.splice(index, 1);
      }
    });

    requestAnimationFrame(animateDrops);
  }

  animateDrops();

  window.addEventListener('resize', () => {
    dropCanvas.width = window.innerWidth;
    dropCanvas.height = window.innerHeight;
  });

  // ========== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА УСЛУГ ==========
  if (typeof Swiper !== 'undefined' && document.querySelector('.services-swiper')) {
    var servicesSwiper = new Swiper('.services-swiper', {
      init: false,
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
        1000: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        767: {
          slidesPerView: 2,
          spaceBetween: -80
        }
      }
    });
    servicesSwiper.init();
  }
});