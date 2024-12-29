const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;

// Función para el salto del dinosaurio/pingüino
function jump() {
  if (isJumping) return;
  isJumping = true;

  let upInterval = setInterval(() => {
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    if (dinoBottom >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
        if (dinoBottom <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        dino.style.bottom = `${dinoBottom - 5}px`;
      }, 20);
    } else {
      dino.style.bottom = `${dinoBottom + 5}px`;
    }
  }, 20);
}

// Detectar colisiones
function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    dinoRect.left < obstacleRect.right &&
    dinoRect.right > obstacleRect.left &&
    dinoRect.bottom > obstacleRect.top
  ) {
    // Detener el juego si hay colisión
    alert(`¡Perdiste! Puntaje final: ${score}`);
    score = 0;
    scoreDisplay.textContent = `Puntaje: ${score}`;
    obstacle.style.animation = 'none'; // Detén la animación
    obstacle.offsetHeight; // Forzar reflow
    obstacle.style.animation = 'move 2s linear infinite'; // Reinicia la animación
  }
}

// Incrementar el puntaje
function updateScore() {
  setInterval(() => {
    score++;
    scoreDisplay.textContent = `Puntaje: ${score}`;
  }, 1000);
}

// Verificar colisiones periódicamente
function startCollisionCheck() {
  setInterval(checkCollision, 10);
}

// Escuchar eventos de teclado y táctiles
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
});

dino.addEventListener('touchstart', jump); // Evento táctil para móviles

// Inicializar el juego
updateScore();
startCollisionCheck();
