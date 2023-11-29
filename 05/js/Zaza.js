class Zaza {
    constructor(x, y, s, context) {
        this.x = x
        this.y = y
        this.origin = { x: x, y: y }
        this.s = s
        this.color = "white"
        //this.intensity = intensity
        this.ctx = context
        this.angle = 0
        this.speed = 0.5
    }
    changeColor(r, g, b) {
        this.color = `rgb(${r}, ${g}, ${b})`
    }
    isMe(x, y) {
        return (x > this.x - this.s && x < this.x + this.s && y > this.y - this.s && y < this.y + this.s)
    }
    move() {
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed
        this.angle += Math.random(Math.PI * 2)
    }
    draw() {
        this.move()
        this.ctx.fillStyle = this.color
        circle(this.x, this.y, this.s * 2)
    }
}