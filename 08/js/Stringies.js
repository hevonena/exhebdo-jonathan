import Stringy from './Stringy.js'

export default class Stringies {
    constructor(ctx, number = 10) {
        this.ctx = ctx
        this.number = number
        this.strings = []
        this.createStrings()
    }
    createStrings() {
        for (let i = 0; i < this.number; i++) {
            const start = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
            const angle = Math.random() * Math.PI * 2
            const length = Math.random() * 100 + 10
            const speed = Math.random() * 0.01 + 0.01
            const numPoints = Math.floor(Math.random() * 4) + 2
            const curly = Math.random() * 0.5 + 0.1
            this.strings.push(new Stringy(this.ctx, start, angle, length, speed, numPoints, curly))
        }
    }
    draw() {
        this.strings.forEach(string => {
            string.draw()
        })
    }
    update() {
        this.strings.forEach(string => {
            string.update()
        })
    }
    touch(finger) {
        this.strings.forEach(string => {
            string.changeCurliness(finger)
        })
    }
}