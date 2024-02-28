/*!
 * Activator.js
 * by Deus Notam
 * Telegram → https://t.me/d3usn0tam
 * Данный скрипт отвечает за проверку успешного подключения.
 */

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999999';
  document.documentElement.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const particles = [];

  let animationStarted = false;

  // Слушаем события нажатия клавиш
  document.addEventListener('keydown', handleKeyDown);

  let pressedKeys = '';

  function handleKeyDown(event) {
    const keyPressed = event.key.toUpperCase();
    pressedKeys += keyPressed;

    // Проверяем последовательность D, 3, U, S
    if (pressedKeys.includes('D3US') && !animationStarted) {
      launchFirework();

      pressedKeys = '';
    }
  }

  // Функция для запуска фейерверка
  function launchFirework() {
    animationStarted = true;

    for (let i = 0; i < 100; i++) {
      particles.push(createParticle());
    }

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      particle.x += particle.speed.x;
      particle.y += particle.speed.y;

      particle.radius -= 0.02;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, Math.max(0, particle.radius), 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      if (particle.radius <= 0 || particle.y > canvas.height) {
        particles.splice(i, 1);
        i--;
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(animateFirework);
    } else {
      animationStarted = false;
    }
  }
