class Flower {
    constructor(position, innerDiam, outerDiam, petals, ctx) {
        this.position = position
        this.innerDiam = innerDiam
        this.outerDiam = outerDiam
        this.petals = petals
        this.ctx = ctx
        this.ctrlPoints = this.generateCtrlPoints()
    }
    generateCtrlPoints() {
        let points = []
        this.innerRatio = 0.4 //ratio of angles between petals and spacing between petals
        this.outerRatio = 0.8

        const angle = 2 * Math.PI / this.petals

        for (let i = 0; i < this.petals; i++) {
            const d = (1 + this.innerRatio) * angle / 2
            const innerPoint1 = { x: this.position.x + Math.cos(angle * i - d) * this.innerDiam / 2, y: this.position.y + Math.sin(angle * i - d) * this.innerDiam / 2 }
            const innerPoint4 = { x: this.position.x + Math.cos(angle * i + d) * this.innerDiam / 2, y: this.position.y + Math.sin(angle * i + d) * this.innerDiam / 2 }

            const d2 = this.outerRatio * angle / 2
            const outerPoint2 = { x: this.position.x + Math.cos(angle * i - d2) * this.outerDiam / 2, y: this.position.y + Math.sin(angle * i - d2) * this.outerDiam / 2 }
            const outerPoint3 = { x: this.position.x + Math.cos(angle * i + d2) * this.outerDiam / 2, y: this.position.y + Math.sin(angle * i + d2) * this.outerDiam / 2 }

            points.push(innerPoint1, outerPoint2, outerPoint3, innerPoint4)
        }
        return points
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.ctrlPoints[0].x, this.ctrlPoints[0].y)

        let lastCp = this.ctrlPoints[this.ctrlPoints.length - 1]
        let firstCp = this.ctrlPoints[0]
        let midX = (lastCp.x + firstCp.x) / 2
        let midY = (lastCp.y + firstCp.y) / 2
        this.ctx.quadraticCurveTo(lastCp.x, lastCp.y, midX, midY)

        for (let i = 0; i < this.ctrlPoints.length - 1; i++) {
            let cp1 = this.ctrlPoints[i]
            let cp2 = this.ctrlPoints[i + 1]
            let midX = (cp1.x + cp2.x) / 2
            let midY = (cp1.y + cp2.y) / 2
            this.ctx.quadraticCurveTo(cp1.x, cp1.y, midX, midY)
        }
        midX = (lastCp.x + firstCp.x) / 2
        midY = (lastCp.y + firstCp.y) / 2

        this.ctx.quadraticCurveTo(lastCp.x, lastCp.y, midX, midY)
        this.ctx.stroke()
    }
}















/*
let ammonite = []

//setup()
const n = 1000
    for (let i = 0; i < n; i++) {
        const angle = 10 * i * Math.PI * 2 / n
        const start = { x: window.innerWidth / 2 + Math.cos(angle) * window.innerWidth * 0.002 * i, y: window.innerHeight / 2 + Math.sin(angle) * window.innerWidth * 0.002 * i }
        const length = Math.random() * window.innerWidth * 0.15 + window.innerWidth * 0.2 * i / 100
        const speed = Math.random() * 0.02 + 0.01
        const numPoints = Math.floor(Math.random() * 15 + 3)
        const curly = 0.3
        ammonite.push(new Stringy(context, start, angle, length, speed, numPoints, curly))
    }

    //draw()
        for (let i = 0; i < ammonite.length; i++) {
        ammonite[i].update()
        ammonite[i].draw()
    }
    // mouseMove(e)
        for (let i = 0; i < ammonite.length; i++) {
        ammonite[i].changeCurliness(e)
    }
        
        */

