window.addEventListener("DOMContentLoaded", () => {
	let canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");

	const width = 500,
		  height = 500;

	canvas.width = width;
	canvas.height = height;

	let 
		snake = [],
		snakeSize = 10,
		snakeX, snakeY,
		score = 0,
		prevSnakeLength = 1,
		snakeLength = 1,
		snakeColor = "green",
		appleColor = "red",
		appleSize = 5,
		appleX, appleY,
		left, right, up, down,
		gameInterval,
		speed = 100,
		runGame = false;

	function clearCanvas(color="black") {
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function createApple() {
		appleX = getRandomNumber(0, width/10-10, snakeSize);
		appleY = getRandomNumber(0, height/10-10, snakeSize);
		ctx.fillStyle = appleColor;
		ctx.fillRect(appleX, appleY, appleSize, appleSize);
	}

	function drawApple() {
		ctx.fillStyle = appleColor;
		ctx.fillRect(appleX, appleY, appleSize, appleSize);
	}

	function moveSnake() {
		if (up) {
			snakeY -= snakeSize;
		}
		if (down) {
			snakeY += snakeSize;
		}
		if (left) {
			snakeX -= snakeSize;
		}
		if (right) {
			snakeX += snakeSize;
		}
	}

	function gameOver() {
		runGame = false;
		clearInterval(gameInterval);
		clearCanvas("black");
		snake = [],
		snakeX, snakeY,
		score = 0,
		snakeLength = 1,
		prevSnakeLength = 1,
		appleX, appleY,
		left=false, right=false, up=false, down=false,
		gameInterval,
		speed = 100,
		runGame = false;
		clearCanvas("black");
		gameOverText();
		setTimeout(clearCanvas, 2000);
	}

	function drawScore() {
		ctx.fillStyle = "orange";
		ctx.font = "20px sans-serif";
		ctx.fillText(`Score: ${score}`, width-140, 30);
	}

	function gameOverText() {
		ctx.fillStyle = "red";
		ctx.font = "48px sans-serif";
		ctx.fillText(`Game Over`, width/2-144, height/2-24);
	}

	function game() {
		moveSnake();

		snake.push([snakeX, snakeY]);

		if (snake.length > snakeLength) {
			snake = snake.reverse();
			snake.pop();
			snake = snake.reverse();
		}

		if (snakeLength % 10 == 0 && speed > 10 && snakeLength > prevSnakeLength) {
			prevSnakeLength = snakeLength;
			speed -= 1;
			clearInterval(gameInterval);
			gameInterval = setInterval(game, speed);
			console.log(speed);
		}

		if (appleX >= snakeX && appleX <= snakeX+snakeSize && appleY >= snakeY && appleY <= snakeY+snakeSize) {
			createApple();
			snakeLength += 1;
			score += 1;
		}

		if (snakeX < 0 || snakeX > width-snakeSize || snakeY < 0 || snakeY > height-snakeSize) {
			gameOver();
			return 0;
		}

		clearCanvas("black");
		for (i of snake) {
			if (appleX == i[0] && appleY == i[1] && snake[snake.length-1] != i) {
				createApple();
			}
			if (snake[snake.length-1][0] == i[0] && snake[snake.length-1][1] == i[1] && snake[snake.length-1] != i) {
				gameOver();
				return 0;
			} else {
				drawApple();
				drawScore();
				ctx.fillStyle = snakeColor;
				ctx.fillRect(i[0], i[1], snakeSize-2, snakeSize-2);
			}
		}
	}

	function getRandomNumber(min, max, step) {
		let delta = max/step;
		return Math.floor(Math.random() * (max - min + 1) + min) * step;
	}

	clearCanvas("black");

	window.addEventListener("keydown", (e) => {
		if (e.code == "KeyX" && !runGame) {
			runGame = true;

			ctx.fillStyle = snakeColor;
			snakeX = getRandomNumber(0, width/10-10, snakeSize);
			snakeY = getRandomNumber(0, height/10-10, snakeSize);
			ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);

			createApple();
			drawScore();

			gameInterval = setInterval(game, speed);
		}
		if (runGame) {
			if (e.code == "KeyW" && !down) {
				left = right = down = false;
				up = true;
			}
			if (e.code == "KeyS" && !up) {
				left = right = up = false;
				down = true;
			}
			if (e.code == "KeyA" && !right) {
				down = right = up = false;
				left = true;
			}
			if (e.code == "KeyD" && !left) {
				down = left = up = false;
				right = true;
			}
		}
	});


});