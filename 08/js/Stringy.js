import Easing from './Easing.js'

export default class Stringy {
    constructor(ctx, start, angle, length, speed, numPoints = 3, curly = 0.3) {
        this.ctx = ctx
        this.start = start
        this.angle = angle
        this.length = length
        this.end = { x: start.x + length * Math.cos(angle), y: start.y + length * Math.sin(angle) }
        this.speed = speed
        this.numPoints = numPoints
        this.curly = curly
        this.width = 0.1
        this.controlPoints = this.generateControlPoints()
        this.beginPoints = this.controlPoints.map(cp => ({ ...cp }))
        this.endPoints = this.controlPoints.map(cp => ({ ...cp }))
        this.t = 0
    }

    generateControlPoints() {
        // Clear the previous control points
        let points = []
        const deltaX = (this.end.x - this.start.x) / (this.numPoints + 1)
        const deltaY = (this.end.y - this.start.y) / (this.numPoints + 1)

        for (let i = 1; i <= this.numPoints; i++) {
            // Generate random control points along the path with some "curly" randomness
            const randX = this.start.x + i * deltaX + this.randomFactor()
            const randY = this.start.y + i * deltaY + this.randomFactor()
            points.push({ x: randX, y: randY })
        }
        return points
    }

    displayControlPoints() {
        // Draw the control points
        this.ctx.fillStyle = '#f00'
        for (let i = 0; i < this.controlPoints.length; i++) {
            const cp = this.controlPoints[i]
            this.ctx.beginPath()
            this.ctx.arc(cp.x, cp.y, 5, 0, 2 * Math.PI)
            this.ctx.fill()
        }
    }

    randomFactor() {
        // This function defines how "curly" the control points will be.
        return (Math.random() - 0.5) * this.curly * 100
    }

    draw() {
        if (this.controlPoints.length < 2) {
            console.error('Not enough control points to draw a Bezier curve.')
            return
        }

        this.ctx.lineWidth = this.width
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'

        this.ctx.beginPath()
        this.ctx.moveTo(this.start.x, this.start.y)

        if (this.controlPoints.length === 2) {
            // Draw quadratic Bezier curve
            this.ctx.quadraticCurveTo(
                this.controlPoints[0].x, this.controlPoints[0].y,
                this.end.x, this.end.y
            )
        } else {
            // Draw cubic or higher order Bezier curve
            for (let i = 0; i < this.controlPoints.length - 1; i++) {
                const cp1 = this.controlPoints[i]
                const cp2 = this.controlPoints[i + 1]
                const midX = (cp1.x + cp2.x) / 2
                const midY = (cp1.y + cp2.y) / 2
                this.ctx.quadraticCurveTo(cp1.x, cp1.y, midX, midY)
            }
        }

        this.ctx.stroke()
    }
    update() {
        if (this.t > 1) {
            this.beginPoints = this.endPoints
        }
        if (this.t > 2) {
            this.curly = 0.3
            this.endPoints = this.generateControlPoints()
            this.t = 0
        }
        const easing = Easing.elasticOut(this.t)
        for (let i = 0; i < this.controlPoints.length - 1; i++) {
            const delta = { x: this.endPoints[i].x - this.beginPoints[i].x, y: this.endPoints[i].y - this.beginPoints[i].y }
            this.controlPoints[i] = { x: this.beginPoints[i].x + easing * delta.x, y: this.beginPoints[i].y + easing * delta.y }
        }
        this.t += this.speed
    }


    makeMoreCurly(factor = 1) {
        this.curly += factor
        this.endPoints = this.generateControlPoints()
        this.t = 0
    }

    changeCurliness(finger) {
        if(finger.x === null || finger.y === null) {
            finger.x = - 200
            finger.y = - 200
        }
        let mouse = { x: finger.x * window.innerWidth, y: finger.y * window.innerHeight }
        if (this.t < 1) {
            return
        }
        if (this.dist(mouse.x, mouse.y, this.start.x, this.start.y) > this.length) {
            this.width = 0.1
            return
        }

        const factor = this.map(this.dist(mouse.x, mouse.y, this.start.x, this.start.y), 0, window.innerWidth / 2, 2, 0.01)
        this.width = 6
        this.curly = factor
        this.endPoints = this.generateControlPoints()
        this.t = 0
    }

    dist(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    }

    map(value, start1, stop1, start2, stop2) {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
    }


}

