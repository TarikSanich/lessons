const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const speedInput = document.getElementById('speed');

const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: gridSize, y: 0 };
let food = generateFood();
let gameInterval;
let speed = 200; // Начальная скорость в миллисекундах
let isPaused = false; // Переменная для отслеживания состояния паузы

function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
  };
}

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function gameLoop() {
  if (isPaused) return; // Пропускаем выполнение, если игра на паузе

  if (checkCollision()) {
    clearInterval(gameInterval);
    alert('Game Over');
    return;
  }

  ctx.clearRect(0, 0, canvasSize, canvasSize);
  moveSnake();
  drawSnake();
  drawFood();
}

function changeDirection(event) {
  const key = event.keyCode;

  switch (key) {
    case 37: // left arrow
      if (direction.x === 0) direction = { x: -gridSize, y: 0 };
      break;
    case 38: // up arrow
      if (direction.y === 0) direction = { x: 0, y: -gridSize };
      break;
    case 39: // right arrow
      if (direction.x === 0) direction = { x: gridSize, y: 0 };
      break;
    case 40: // down arrow
      if (direction.y === 0) direction = { x: 0, y: gridSize };
      break;
    case 32: // space bar
      togglePause(); // Переключаем состояние паузы при нажатии пробела
      break;
  }
}

function increaseSpeed() {
  clearInterval(gameInterval);
  speed = Math.max(50, speed - 5); // Увеличиваем скорость и устанавливаем минимальное значение скорости
  gameInterval = setInterval(gameLoop, speed);
}

function startGame() {
  clearInterval(gameInterval);
  snake = [{ x: gridSize * 5, y: gridSize * 5 }];
  direction = { x: gridSize, y: 0 };
  food = generateFood();
  speed = calculateSpeed(parseInt(speedInput.value));
  isPaused = false; // Сбрасываем состояние паузы
  gameInterval = setInterval(gameLoop, speed);
}

function restartGame() {
  startGame();
}

function calculateSpeed(speedValue) {
  const minSpeed = 50;
  const maxSpeed = 200;
  const maxValue = 10;
  const minValue = 1;

  return maxSpeed - ((speedValue - minValue) / (maxValue - minValue)) * (maxSpeed - minSpeed);
}

function togglePause() {
  isPaused = !isPaused;
}

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
