export default class Grid {
    constructor(ctx, finger) {
        console.log('Grid')
        this.ctx = ctx
        this.finger = finger
        this.draw(this.finger)
    }
    draw(finger) {
        const n = 7
        const gridWidth = window.innerWidth / n
        const gridHeight = window.innerHeight / n

        if (finger.x === null || finger.y === null) {
            return
        }

        const x = Math.floor((finger.x * window.innerWidth) / gridWidth)
        const y = Math.floor((finger.y * window.innerHeight) / gridHeight)
        const indexFinger = y * n + x


        this.ctx.strokeStyle = 'black'
        this.ctx.fillStyle = 'red'

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                this.ctx.beginPath()
                this.ctx.rect(j * gridWidth, i * gridHeight, gridWidth, gridHeight)
                this.ctx.stroke()
                this.ctx.closePath()

                if (i * n + j === indexFinger) {
                    this.ctx.fill()
                } 
            }
        }
    }
}