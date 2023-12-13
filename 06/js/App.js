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
        this.visualizer = new Visualizer(this.ctx, this.audioTool)
        this.bands1 = new Bands(this.ctx)
        this.bands2 = new Bands(this.ctx)

        this.isolations = []

        document.addEventListener('click', (e) => {
            this.audioTool.play(e)
        })
        this.draw()
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.fillStyle = 'rgba(255, 1)'
        this.ctx.fillRect(0, 0, this.width, this.height)


        
        // this.audioTool.updateFrequency()
        
        // if (this.audioTool.audioContext) {
        //     this.bands1.update(this.audioTool.dataFrequency)
        //     this.bands1.display()
        // }

        this.audioTool.updateWaveForm()
        const dataWave = this.audioTool.dataWave

        if (this.audioTool.audioContext) {
            this.bands1.update(dataWave)
            this.bands1.display()

            for(let i = 0; i < this.isolations.length; i++) {
                this.isolations[i].display()
            }

            let n = 50
            // if n is in this.audioTool.dataWave
            for (let i = 0; i < dataWave.length; i++) {
                if (dataWave[i] == n) {
                    let barHeight = this.height / dataWave.length
                    this.isolations.push(new Isolation(0, i * barHeight,this.width, this.ctx))
                }
            }
        }


        this.audioTool.updateFrequency()
        const dataFrequency = this.audioTool.dataFrequency
        if (this.audioTool.audioContext) {
            let m = 128
            // if m is in this.audioTool.dataFrequency
            for (let i = 0; i < dataFrequency.length; i++) {
                if (dataFrequency[i] == m) {
                    let divider = i / dataFrequency.length
                    this.bands1.changeDivider(divider)
                }
            }
        }

        // this.audioTool.updateFloatFrequency()
        // if (this.audioTool.audioContext) {
        // }

        // this.ctx.save()
        // this.ctx.translate(0, -this.height * 0.75)
        // this.visualizer.drawWaveForm()
        // this.ctx.translate(0, this.height * 0.25)
        // this.visualizer.drawFrequency()
        // this.ctx.translate(0, this.height * 0.25)
        // this.visualizer.drawFloatFrequency()
        // this.ctx.restore()
        requestAnimationFrame(this.draw.bind(this))
    }
}

window.onload = () => {
    const app = new App()
}
