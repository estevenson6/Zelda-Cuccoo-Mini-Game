class Game {
    constructor() {
        this.player = null;
        this.obstacleArrCucoos = [];
        this.obstacleArrRupees = [];
        this.scoreCount = 0;
        this.rupeesScoreCount = 0;
        this.intervalId1 = null;
        this.intervalId2 = null;
        this.intervalId3 = null;
        this.intervalId4 = null;
        this.mainMusic = new Audio('./sounds/02 - Main Theme.mp3');
    }

    startButton() {
        const startButton = document.createElement('button');
        startButton.setAttribute('id', 'start-button')
        startButton.innerText = 'Start';
        startButton.is = 'mainButton'
        startButton.addEventListener('click', () => {
            this.start()
            startButton.style.display = 'none';
        })
        const Parent = document.getElementById("board");
        Parent.appendChild(startButton);
    }

    start() {
        this.player = new Player;
        this.attachEventListeners();

        this.intervalId1 = setInterval(() => {
            const newObstacleCucoo = new Obstacle();
            this.obstacleArrCucoos.push(newObstacleCucoo)
        }, 1200);

        this.intervalId2 = setInterval(() => {
            this.obstacleArrCucoos.forEach((obstacleInstance, index) => {
                obstacleInstance.moveDown()
                this.detectCollisionCucoo(obstacleInstance, index)
                this.removeObstacleCucoo(obstacleInstance)
            });
        }, 50)

        this.intervalId3 = setInterval(() => {
            const newObstacleRupee = new Rupees();
            this.obstacleArrRupees.push(newObstacleRupee)
        }, 1800);

        this.intervalId4 = setInterval(() => {
            this.obstacleArrRupees.forEach((obstacleInstance, index) => {
                obstacleInstance.moveDown()
                this.detectCollisionRupee(obstacleInstance, index)
                this.removeObstacleRupee(obstacleInstance)
            });
        }, 50)
       this.mainMusic.play();
       this.mainMusic.volume = 0.4;
    }

    scoreCounterCucoo() {
        document.getElementById('score');
        this.scoreCount++
        score.textContent = `Cuccos ${this.scoreCount}`
    }

    scoreCounterRupee() {
        document.getElementById('rupeesScore');
        this.rupeesScoreCount++
        rupeesScore.textContent = `Rupees ${this.rupeesScoreCount}`
        console.log(this.rupeesScoreCount)
    }

    detectCollisionCucoo(obstacleInstance, index) {
        if (
            obstacleInstance.positionX < this.player.positionX + this.player.width &&
            obstacleInstance.positionX + obstacleInstance.width > this.player.positionX &&
            obstacleInstance.positionY < this.player.positionY + this.player.height &&
            obstacleInstance.height + obstacleInstance.positionY > this.player.positionY) {
            obstacleInstance.domElement.remove();
            this.obstacleArrCucoos.splice(index, 1)
            this.scoreCounterCucoo();
            this.gameover();
            const cuccoSound = new Audio('./sounds/cucco.mp3');
            cuccoSound.volume = 0.3;
            cuccoSound.play();
        }
    }

    detectCollisionRupee(obstacleInstance, index) {
        if (
            obstacleInstance.positionX < this.player.positionX + this.player.width &&
            obstacleInstance.positionX + obstacleInstance.width > this.player.positionX &&
            obstacleInstance.positionY < this.player.positionY + this.player.height &&
            obstacleInstance.height + obstacleInstance.positionY > this.player.positionY) {
            obstacleInstance.domElement.remove();
            this.obstacleArrRupees.splice(index, 1);
            this.scoreCounterRupee();
            this.win();
            const rupeeSound = new Audio ('./sounds/Rupee.mp3');
            rupeeSound.volume = 0.3;
            rupeeSound.play();
        }
    }

    removeObstacleCucoo(obstacleInstance) {
        if (obstacleInstance.positionY < 10) {
            obstacleInstance.domElement.remove();
            this.obstacleArrCucoos.shift(obstacleInstance)
        }
    }

    removeObstacleRupee(obstacleInstance) {
        if (obstacleInstance.positionY < 10) {
            obstacleInstance.domElement.remove();
            this.obstacleArrRupees.shift(obstacleInstance)
        }
    }

    gameoverMessage() {
        const gameoverMessage = document.createElement('p');
        gameoverMessage.setAttribute('id', 'gameover');
        gameoverMessage.innerText = "You've killed too many chickens. They revolt and hunt you down. You're dead..."
        const Parent = document.getElementById("board");
        Parent.appendChild(gameoverMessage);
        const gameoverSound = new Audio('./sounds/86 - Game Over.mp3');
        this.mainMusic.pause();
        gameoverSound.play();
        gameoverSound.volume = 0.4;
        this.retryButton()
    }

    retryButton() {
        const retryButton = document.createElement('button');
        retryButton.setAttribute('id', 'retry-button')
        retryButton.innerText = 'Try Again?';
        retryButton.is = 'retryButton'
        const Parent = document.getElementById("board");
        Parent.appendChild(retryButton);
        retryButton.addEventListener('click', () => {
            window.location.reload(true);
        })
    }

    stopGame() {
        clearInterval(this.intervalId1);
        clearInterval(this.intervalId2);
        clearInterval(this.intervalId3);
        clearInterval(this.intervalId4);
    }

    gameover() {
        if (this.scoreCount === 5) {
            this.stopGame();
            this.gameoverMessage();
        }
    }

    winMessage() {
        const winMessage = document.createElement('div');
        winMessage.setAttribute('id', 'win-message');
        winMessage.innerText = "You've won the Giant's Wallet! Congratulations...Now stop killing chickens and go save Hyrule!"
        const Parent = document.getElementById("board");
        Parent.appendChild(winMessage);
    }

    win() {
        if (this.rupeesScoreCount === 10){
            this.stopGame();
            this.winMessage();
            this.retryButton();
            const victorySound = new Audio('./sounds/Victory.mp3');
            victorySound.volume = 0.3;
            this.mainMusic.pause();
            victorySound.play();
        }
    }

    attachEventListeners() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                game.player.moveLeft()
            }
            else if (e.key === "ArrowRight") {
                game.player.moveRight()
            }
        })
    }
}

class Player {
    constructor() {
        this.positionX = 50;
        this.positionY = 0;
        this.width = 10;
        this.height = 13;
        this.domElement = null;

        this.createDomElement();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        const Parent = document.getElementById("board");
        Parent.appendChild(this.domElement);
    }

    moveLeft() {
        if (this.positionX === 0) {
            return;
        }
        else {
            this.positionX--;
            this.domElement.style.left = this.positionX + "vw";
        }
    }

    moveRight() {
        if (this.positionX === 80 - this.width) {
            return;
        }
        else {
            this.positionX++;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
}


class Obstacle {
    constructor() {
        this.positionX = this.generateRandomNumber(10, 70); // change to be minus width
        this.positionY = 75;
        this.width = 8;
        this.height = 10;
        this.domElement = null;

        this.createDomElement();
    }

    generateRandomNumber(min, max) {
        return (Math.random() * (max - min + 1)) + min;
    }

    createDomElement() {

        this.domElement = document.createElement("div");

        this.domElement.className = "obstacle1";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const Parent = document.getElementById("board");
        Parent.appendChild(this.domElement);

    }

    moveDown() {
        this.positionY--
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

class Rupees {
    constructor() {
        this.positionX = this.generateRandomNumber(10, 70); // change to be minus width
        this.positionY = 75;
        this.width = 7;
        this.height = 10;
        this.domElement = null;

        this.createDomElement();
    }

    generateRandomNumber(min, max) {
        return (Math.random() * (max - min + 1)) + min;
    }

    createDomElement() {

        this.domElement = document.createElement("div");

        this.domElement.className = "rupees";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const Parent = document.getElementById("board");
        Parent.appendChild(this.domElement);

    }

    moveDown() {
        this.positionY--
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

const game = new Game;
game.startButton()
