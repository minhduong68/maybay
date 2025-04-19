
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let spaceship = { x: 400, y: 550, width: 50, height: 50, color: 'white', dx: 0, dy: 0, speed: 5 };
let enemyShip = { x: 400, y: 50, width: 50, height: 50, color: 'red', dx: 2 };

let betAmount = 100;
let score = 0;

function moveSpaceship() {
    spaceship.x += spaceship.dx;
    spaceship.y += spaceship.dy;
    if (spaceship.x < 0) spaceship.x = 0;
    if (spaceship.x + spaceship.width > canvas.width) spaceship.x = canvas.width - spaceship.width;
    if (spaceship.y < 0) spaceship.y = 0;
    if (spaceship.y + spaceship.height > canvas.height) spaceship.y = canvas.height - spaceship.height;
}

function moveEnemyShip() {
    enemyShip.x += enemyShip.dx;
    if (enemyShip.x < 0 || enemyShip.x + enemyShip.width > canvas.width) enemyShip.dx = -enemyShip.dx;
}

function drawSpaceship() {
    ctx.fillStyle = spaceship.color;
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function drawEnemyShip() {
    ctx.fillStyle = enemyShip.color;
    ctx.fillRect(enemyShip.x, enemyShip.y, enemyShip.width, enemyShip.height);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSpaceship();
    moveEnemyShip();
    drawSpaceship();
    drawEnemyShip();
    requestAnimationFrame(updateGame);
}

function changeBet(amount) {
    betAmount = amount;
    document.getElementById('currentBet').innerText = betAmount;
}

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") spaceship.dx = spaceship.speed;
    if (e.key === "ArrowLeft") spaceship.dx = -spaceship.speed;
    if (e.key === "ArrowUp") spaceship.dy = -spaceship.speed;
    if (e.key === "ArrowDown") spaceship.dy = spaceship.speed;
});

document.addEventListener('keyup', (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") spaceship.dx = 0;
    if (e.key === "ArrowUp" || e.key === "ArrowDown") spaceship.dy = 0;
});

updateGame();
