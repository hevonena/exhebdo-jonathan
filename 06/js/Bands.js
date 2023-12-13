class Bands {
    constructor(ctx) {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.ctx = ctx
        this.data = []
        this.divider = 1
    }
    display() {
        let barWidth = this.width / this.data.length * this.divider
        let barHeight = this.height
        // no smooth
        this.ctx.imageSmoothingEnabled = false
        for (let i = 0; i < this.data.length; i++) {
            this.ctx.fillStyle = `rgba(${this.data[i] + 20}, ${this.data[i] + 20}, ${this.data[i] + 20}, 120)`
            rect(i * barWidth, 0, barWidth + 10, barHeight, this.ctx)
        }

        //rect(this.width/2, this.height/2, this.width/3, this.height/3, this.ctx)
    }

    update(data) {
        this.data = data
    }

    changeDivider(divider) {
        this.divider = divider
    }

}