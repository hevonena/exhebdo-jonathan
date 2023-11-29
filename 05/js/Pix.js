class Pix {
    constructor(x, y, s, context) {
        this.position = { x: x, y: y }
        this.size = s
        this.ctx = context
        this.color = "white"
    }
    display() {
        this.ctx.fillStyle = this.color
        circle(this.position.x, this.position.y, this.size/1.4)
    }
    changeColor(color) {
        this.color = color
    }
}