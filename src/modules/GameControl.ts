import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'
class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  directive: string = ''
  isLive: boolean = true

  constructor() {
    this.snake = new Snake(0, 290)
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 1)
    this.init()
  }

  init() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this))
    this.run()
  }

  keyDownHandler(e: KeyboardEvent) {
    this.directive = e.key
  }

  run() {
    let X = this.snake.X
    let Y = this.snake.Y
    switch (this.directive) {
      case 'ArrowUp':
        Y -= 10
        break
      case 'ArrowDown':
        Y += 10
        break
      case 'ArrowLeft':
        X -= 10
        break
      case 'ArrowRight':
        X += 10
        break
    }
    this.checkEat(X, Y)
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e) {
      alert(e.message)
      this.isLive = false
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.snake.addBody()
      this.scorePanel.addScore()
      this.food.change()
    }
  }
}

export default GameControl
