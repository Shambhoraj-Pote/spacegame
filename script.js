// Game Variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const spaceshipWidth = 50;
const spaceshipHeight = 50;
let spaceshipX = canvas.width / 2 - spaceshipWidth / 2;
let spaceshipY = canvas.height - spaceshipHeight - 20;
let spaceshipSpeed = 5;

let asteroidSpeed = 2;
let asteroidWidth = 50;
let asteroidHeight = 50;
let asteroids = [];

let score = 0;
let gameOver = false;

// Controls
let leftPressed = false;
let rightPressed = false;

// Key Events
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Start the Game
function startGame() {
  gameOver = false;
  spaceshipX = canvas.width / 2 - spaceshipWidth / 2;
  asteroids = [];
  score = 0;
  document.getElementById("gameOver").style.display = "none";
  update();
}

// Handle Key Down
function keyDownHandler(e) {
  if (e.key === "ArrowLeft") {
    leftPressed = true;
  } else if (e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Enter" && gameOver) {
    startGame();
  }
}

// Handle Key Up
function keyUpHandler(e) {
  if (e.key === "ArrowLeft") {
    leftPressed = false;
  } else if (e.key === "ArrowRight") {
    rightPressed = false;
  }
}

// Spaceship Movement
function moveSpaceship() {
  if (leftPressed && spaceshipX > 0) {
    spaceshipX -= spaceshipSpeed;
  } else if (rightPressed && spaceshipX < canvas.width - spaceshipWidth) {
    spaceshipX += spaceshipSpeed;
  }
}

// Generate Asteroids
function generateAsteroids() {
  if (Math.random() < 0.02) {
    let asteroidX = Math.random() * (canvas.width - asteroidWidth);
    asteroids.push({
      x: asteroidX,
      y: -asteroidHeight,
    });
  }
}

// Move Asteroids
function moveAsteroids() {
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].y += asteroidSpeed;

    // Check for collision with spaceship
    if (
      asteroids[i].x < spaceshipX + spaceshipWidth &&
      asteroids[i].x + asteroidWidth > spaceshipX &&
      asteroids[i].y < spaceshipY + spaceshipHeight &&
      asteroids[i].y + asteroidHeight > spaceshipY
    ) {
      gameOver = true;
      document.getElementById("gameOver").style.display = "block";
    }

    // Remove off-screen asteroids
    if (asteroids[i].y > canvas.height) {
      asteroids.splice(i, 1);
      i--;
      score++;
    }
  }
}

// Draw Everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Spaceship
  ctx.fillStyle = "#00f";
  ctx.fillRect(spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight);

  // Draw Asteroids
  ctx.fillStyle = "#f00";
  for (let i = 0; i < asteroids.length; i++) {
    ctx.fillRect(asteroids[i].x, asteroids[i].y, asteroidWidth, asteroidHeight);
  }

  // Draw Score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// Update Game
function update() {
  if (!gameOver) {
    moveSpaceship();
    generateAsteroids();
    moveAsteroids();
    draw();
    requestAnimationFrame(update);
  }
}

// Start the Game for the first time
startGame();
