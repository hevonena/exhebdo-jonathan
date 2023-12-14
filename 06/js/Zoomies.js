class Zoomies {
    constructor(x, y, w, ctx) {
        this.x = x
        this.y = y
        this.width = w
        this.ctx = ctx
        this.life = Math.round(Math.random())* 100 + 10
        this.lifespan = this.life
        this.direction = Math.random() > 0.5 ? 1 : -1
        this.speed = Math.random() * 5 + 1
    }

    display() {
        this.ctx.fillStyle = `rgba(0, 0, 0, ${256 * this.life / this.lifespan})`
        if (this.direction > 0) {
            rect(
                map(this.life, this.lifespan, 0, 0, this.width),
                this.y,
                map(this.life, this.lifespan, 0, this.width, 0),
                map(this.life, this.lifespan, 0, 20, 0),
                this.ctx)
        } else {
            rect(this.x, this.y, map(this.life, this.lifespan, 0, this.width, 0), map(this.life, this.lifespan, 0, 20, 0), this.ctx)
        }
        this.life -= this.speed
    }

}