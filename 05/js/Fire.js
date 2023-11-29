class Fire {
    constructor(x, y, s, color, context) {
        this.position = { x: x, y: y }
        this.size = Math.random() * s
        this.life = 100
        this.color = color
        this.ctx = context
    }
    display() {
        this.ctx.fillStyle = this.color
        circle(this.position.x, this.position.y, this.size)
    }
    update() {
        // move up like fire
        this.position.y -= Math.random() * 10
        // move left or right randomly
        let random = Math.random()
        if (random < 0.5) {
            this.position.x -= Math.random() * 10
        } else {
            this.position.x += Math.random() * 10
        }

        this.life -= 1
        this.size >= 0.1 ? this.size -= 0.1 : this.size = 0.1
        
    }
    isDead() {
        return this.life <= 0
    }
}