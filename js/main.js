class Game {
    constructor() {
        this.player = null;
        this.obstacleArrCucoos = [];
        this.obstacleArrRupees = [];
        this.scoreCount = 0;
        this.rupeesScoreCount = 0;
        this.intervalId1 = null;
        this.intervalId2 = null;
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
        const playerParent = document.getElementById("board");
        playerParent.appendChild(startButton);
    }

    start() {
        this.player = new Player;
        this.attachEventListeners();

        setInterval(() => {
            const newObstacleCucoo = new Obstacle();
            this.obstacleArrCucoos.push(newObstacleCucoo)
        }, 2000);

        this.intervalId1 = setInterval(() => {
            this.obstacleArrCucoos.forEach((obstacleInstance, index) => {
                obstacleInstance.moveDown()
                this.detectCollisionCucoo(obstacleInstance, index)
                this.removeObstacleCucoo(obstacleInstance)
            });
        }, 50)

        setInterval(() => {
            const newObstacleRupee = new Rupees();
            this.obstacleArrRupees.push(newObstacleRupee)
        }, 2000);

        this.intervalId2 = setInterval(() => {
            this.obstacleArrRupees.forEach((obstacleInstance, index) => {
                obstacleInstance.moveDown()
                this.detectCollisionRupee(obstacleInstance, index)
                this.removeObstacleRupee(obstacleInstance)
            });
        }, 50)
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
        }
    }

    removeObstacleCucoo(obstacleInstance) {
        if (obstacleInstance.positionY < 0) {
            obstacleInstance.domElement.remove();
            this.obstacleArrCucoos.shift(obstacleInstance)
        }
    }

    removeObstacleRupee(obstacleInstance) {
        if (obstacleInstance.positionY < 0) {
            obstacleInstance.domElement.remove();
            this.obstacleArrRupees.shift(obstacleInstance)
        }
    }

    gameoverMessage() {
        const gameoverMessage = document.createElement('p');
        gameoverMessage.setAttribute('id', 'gameover');
        gameoverMessage.innerText = "You've killed too many chickens. They revolt and hunt you down. You're dead..."
        const playerParent = document.getElementById("board");
        playerParent.appendChild(gameoverMessage);
        this.retryButton()
    }

    retryButton() {
        const retryButton = document.createElement('button');
        retryButton.setAttribute('id', 'retry-button')
        retryButton.innerText = 'Try Again?';
        retryButton.is = 'retryButton'
        retryButton.addEventListener('click', () => {
            window.location.reload(true);
        })
        const playerParent = document.getElementById("board");
        playerParent.appendChild(retryButton);
    }

    stopGame() {
        clearInterval(this.intervalId1);
        clearInterval(this.intervalId2);
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
        const playerParent = document.getElementById("board");
        playerParent.appendChild(winMessage);
    }

    win() {
        if (this.rupeesScoreCount === 10){
            this.stopGame();
            this.winMessage();
            this.retryButton();
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
        const playerParent = document.getElementById("board");
        playerParent.appendChild(this.domElement);
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
        if (this.positionX === 100 - this.width) {
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
        this.positionX = this.generateRandomNumber(0, 70); // change to be minus width
        this.positionY = 100;
        this.width = 5;
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

        const playerParent = document.getElementById("board");
        playerParent.appendChild(this.domElement);

    }

    moveDown() {
        this.positionY--
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

class Rupees {
    constructor() {
        this.positionX = this.generateRandomNumber(0, 70); // change to be minus width
        this.positionY = 100;
        this.width = 5;
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

        const playerParent = document.getElementById("board");
        playerParent.appendChild(this.domElement);

    }

    moveDown() {
        this.positionY--
        this.domElement.style.bottom = this.positionY + "vh";
    }


}

const audio = document.getElementById('my-audio');
audio.volume = 0.3;

const game = new Game;
game.startButton()
