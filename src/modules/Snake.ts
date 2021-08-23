class Snake {
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement
  throughMin: number
  throughMax: number

  constructor(throughMin: number, throughMax: number) {
    this.throughMin = throughMin
    this.throughMax = throughMax
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value: number) {
    if (this.X === value) {
      return
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value < this.X) {
        value = this.X + 10
      } else {
        value = this.X - 10
      }
    }
    value = this.isThrough(value)
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }

  set Y(value: number) {
    if (this.Y === value) {
      return
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value < this.Y) {
        value = this.Y + 10
      } else {
        value = this.Y - 10
      }
    }
    value = this.isThrough(value)
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }

  isThrough(value: number) {
    if (value < this.throughMin) {
      return this.throughMax
    } else if (value > this.throughMax) {
      return this.throughMin
    } else {
      return value
    }
  }

  addBody() {
    this.element.insertAdjacentElement('beforeend', document.createElement('div'))
  }

  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop
      ;(this.bodies[i] as HTMLElement).style.left = X + 'px'
      ;(this.bodies[i] as HTMLElement).style.top = Y + 'px'
    }
  }

  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let item = this.bodies[i] as HTMLElement
      if (item.offsetLeft === this.X && item.offsetTop === this.Y) {
        throw new Error('蛇吃到身体了。')
      }
    }
  }
}

export default Snake
