/*!
 * Activator.js
 * by Deus Notam
 * Telegram → https://t.me/d3usn0tam
 * Данный скрипт отвечает за проверку успешного подключения.
 */

// Создаем элемент canvas и добавляем его поверх всего сайта
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none'; // Позволяет элементу canvas игнорировать события мыши и клавиатуры
  canvas.style.zIndex = '999999999'; // Устанавливаем z-index
  document.documentElement.appendChild(canvas);

  // Получаем 2D контекст для рисования
  const ctx = canvas.getContext('2d');

  // Создаем массив для хранения частиц фейерверка
  const particles = [];

  // Флаг для отслеживания запущенной анимации
  let animationStarted = false;

  // Слушаем события нажатия клавиш
  document.addEventListener('keydown', handleKeyDown);

  // Обработка каждого нажатия клавиши
  let pressedKeys = '';

  function handleKeyDown(event) {
    const keyPressed = event.key.toUpperCase();
    pressedKeys += keyPressed;

    // Проверяем последовательность D, 3, U, S
    if (pressedKeys.includes('D3US') && !animationStarted) {
      // Вызываем функцию для запуска фейерверка
      launchFirework();

      // Очищаем последовательность клавиш
      pressedKeys = '';
    }
  }

  // Функция для запуска фейерверка
  function launchFirework() {
    // Устанавливаем флаг, чтобы анимация работала только один раз
    animationStarted = true;

    // Создаем новые частицы и добавляем их в массив
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle());
    }

    // Запускаем анимацию фейерверка
    animateFirework();
  }

  // Функция для создания частицы
  function createParticle() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const color = getRandomColor();
    const radius = Math.random() * 5 + 1;
    const speed = { x: (Math.random() - 0.5) * 8, y: Math.random() * -6 };

    return { x, y, color, radius, speed };
  }

  // Функция для получения случайного цвета
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Функция для анимации фейерверка
  function animateFirework() {
    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Обновляем и рисуем каждую частицу
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      // Обновляем координаты частицы
      particle.x += particle.speed.x;
      particle.y += particle.speed.y;

      // Уменьшаем радиус частицы
      particle.radius -= 0.02;

      // Рисуем частицу
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, Math.max(0, particle.radius), 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Удаляем частицу, если её радиус стал слишком маленьким или она вышла за нижнюю границу
      if (particle.radius <= 0 || particle.y > canvas.height) {
        particles.splice(i, 1);
        i--;
      }
    }

    // Если есть активные частицы, продолжаем анимацию
    if (particles.length > 0) {
      requestAnimationFrame(animateFirework);
    } else {
      // Сбрасываем флаг, чтобы анимация могла быть запущена снова
      animationStarted = false;
    }
  }
