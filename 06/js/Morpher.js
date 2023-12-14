import { SpringNumber, SpringVector } from './spring.js';
// Morpher class definition here
export { Morpher };

class Morpher {
    constructor(x, y, ctx) {
        this.position = {x: x, y: y}
        this.sides = 8
        this.strokeColorRandom = {r: Math.round(Math.random() * 1024), g: Math.round(Math.random() * 1024) , b: Math.round(Math.random() * 1024)}
        this.fillColorRandom = {r: Math.round(Math.random() * 1024), g: Math.round(Math.random() * 1024) , b: Math.round(Math.random() * 1024)}
        this.sizeRandom = Math.round(Math.random() * 1024)
        this.lineWidthRandom = Math.round(Math.random() * 1024)
        this.strokeColor = `rgb(${this.strokeColorRandom.r}, ${this.strokeColorRandom.g}, ${this.strokeColorRandom.b})`
        this.fillColor = `rgb(${this.fillColorRandom.r}, ${this.fillColorRandom.g}, ${this.fillColorRandom.b})`
        //this.lineWidth = 50
        this.lineWidth = new SpringNumber({
            position: 50, // start position
            frequency: 5, // oscillations per second (approximate)
            halfLife: 0.4 // time until amplitude is halved
        })
        this.size = 200
        this.ctx = ctx
        this.treshold = 210
    }
    display() {
        this.ctx.save()
        this.ctx.imageSmoothingEnabled = false
        this.ctx.translate(this.position.x, this.position.y)
        this.ctx.rotate(Math.PI / 2)
        this.ctx.strokeStyle = this.strokeColor
        this.ctx.fillStyle = this.fillColor
        this.ctx.lineWidth = this.lineWidth.position
        this.ctx.beginPath()
        for (let i = 0; i < this.sides; i++) {
            this.ctx.rotate(Math.PI * 2 / this.sides)
            this.ctx.lineTo(this.size, 0)
        }
        this.ctx.closePath()
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.restore()
    }
    update(data) {
        let count = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i] > this.treshold) {
                count++
            }
        }
        this.sides = count

        this.size = map(data[this.sizeRandom], 0, 255, 0, window.innerHeight)
        //this.lineWidth = data[this.lineWidthRandom] / 2
        this.lineWidth.target = data[this.lineWidthRandom] / 2
        this.lineWidth.step(1 / 60)

        this.fillColor = `rgb(${data[this.fillColorRandom.r]}, ${data[this.fillColorRandom.g]}, ${data[this.fillColorRandom.b]})`
        this.strokeColor = `rgb(${data[this.strokeColorRandom.r]}, ${data[this.strokeColorRandom.g]}, ${data[this.strokeColorRandom.b]})`
        
        //this.position.x = map(data[512], 0, 255, 0, window.innerWidth)
    }
}