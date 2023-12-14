import { Morpher } from './Morpher.js'

class App {
    constructor() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)

        this.audioTool = new AudioTool()
        //this.visualizer = new Visualizer(this.ctx, this.audioTool)
        this.morpher = new Morpher(this.width / 2, this.height / 2, this.ctx)
        this.zoomies = []
        document.addEventListener('click', (e) => {
            this.audioTool.play(e)
        })
        //this.audioTool.play()

        this.ctx.fillStyle = 'white'
        rect(0, 0, this.width, this.height, this.ctx)
        this.draw()
    }

    draw() {
        //this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        rect(0, 0, this.width, this.height, this.ctx)

        this.audioTool.updateWaveForm()

        const dataWave = this.audioTool.dataWave

        if (this.audioTool.audioContext) {

            this.morpher.update(dataWave)
            for (let i = 0; i < this.zoomies.length; i++) {
                this.zoomies[i].display()
                if (this.zoomies[i].life < 0) this.zoomies.splice(i, 1)
            }

            this.morpher.display()
            let n = 50
            for (let i = 0; i < dataWave.length; i++) {
                if (dataWave[i] == n) {
                    this.zoomies.push(new Zoomies(0, i * this.height / dataWave.length, this.width, this.ctx))
                }
            }

        }
        requestAnimationFrame(this.draw.bind(this))
    }
}

window.onload = () => {
    const app = new App()
}
