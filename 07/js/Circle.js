class Circle {
  constructor(x, y, rayon, context) {
    this.x = x
    this.y = y
    this.rayon = rayon
    this.context = context
    this.color = "white"
  }

  changeColor(r, g, b) {
    this.color = `rgb(${r},${g},${b})`
  }

  isInMe(x, y) {
    let d = dist(x, y, this.x, this.y)
    if (d < this.rayon) {
      return true
    } else {
      return false
    }
  }

  draw() {
    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true)
    this.context.fill()
    this.context.closePath()
    this.context.restore()
  }
}
