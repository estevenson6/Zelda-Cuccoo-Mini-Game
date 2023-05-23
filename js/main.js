class Game {
    constructor() {
        this.player = null;
        this.obstaclesArr = [];
        this.scoreCount = 0
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
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle)
        }, 2000);

        setInterval(() => {
            this.obstaclesArr.forEach((obstacleInstance, index) => {
                obstacleInstance.moveDown()
                this.detectCollision(obstacleInstance, index)
                this.removeObstacle(obstacleInstance)
            });
        }, 60)
        }

        scoreCounter() {
            document.getElementById('score');
            this.scoreCount++
            score.textContent = `Cuccos ${this.scoreCount}`
        }

    detectCollision(obstacleInstance, index) {
        if (
            obstacleInstance.positionX < this.player.positionX + this.player.width &&
            obstacleInstance.positionX + obstacleInstance.width > this.player.positionX &&
            obstacleInstance.positionY < this.player.positionY + this.player.height &&
            obstacleInstance.height + obstacleInstance.positionY > this.player.positionY) {
            obstacleInstance.domElement.remove();
            this.obstaclesArr.splice(index, 1)
            this.scoreCounter();
        }
        
    }

    removeObstacle(obstacleInstance) {
        if (obstacleInstance.positionY < 0 ) {
            obstacleInstance.domElement.remove()
            this.obstaclesArr.shift(obstacleInstance);
        }
    }
    attachEventListeners() {
        {
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

const audio = document.getElementById('my-audio');
audio.volume = 0.3;

const game = new Game;
game.startButton()

