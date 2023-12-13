class Visualizer {
    constructor(ctx, audioTool) {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.ctx = ctx
        this.audioTool = audioTool
    }
    drawWaveForm() {
        this.audioTool.updateWaveForm()
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        let barWidth = (this.width / this.audioTool.bufferLength) * 2.5
        let barHeight
        let x = 0
        for (let i = 0; i < this.audioTool.bufferLength; i++) {
            barHeight = this.audioTool.dataWave[i]
            this.ctx.fillRect(x, this.height - barHeight / 2, barWidth, barHeight / 2)
            x += barWidth + 1
        }
    }
    drawFrequency() {
        this.audioTool.updateFrequency()
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        let barWidth = (this.width / this.audioTool.bufferLength) * 2.5
        let barHeight
        let x = 0
        for (let i = 0; i < this.audioTool.bufferLength; i++) {
            barHeight = this.audioTool.dataFrequency[i]
            this.ctx.fillRect(x, this.height - barHeight / 2, barWidth, barHeight / 2)
            x += barWidth + 1
        }
    }
    drawFloatFrequency() {
        this.audioTool.updateFloatFrequency()
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        let barWidth = (this.width / this.audioTool.bufferLength) * 2.5
        let barHeight
        let x = 0
        for (let i = 0; i < this.audioTool.bufferLength; i++) {
            barHeight = -this.audioTool.FloatFrequency[i]
            this.ctx.fillRect(x, this.height - barHeight / 2, barWidth, barHeight / 2)
            x += barWidth + 1
        }
    }
}
        