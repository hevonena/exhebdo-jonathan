class Flower {
    constructor(position, innerDiam, outerDiam, petals, ctx) {
        this.position = position
        this.innerDiam = innerDiam
        this.outerDiam = outerDiam
        this.petals = petals
        this.ctx = ctx
        this.ctrlPoints = this.generateCtrlPoints()
        this.stringies = this.spawnStringies(70, 10, 0.3)
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

    spawnStringies(stringyCount, numPoints, curly) {
        const stringies = []
        const spacing = this.outerDiam / stringyCount

        for (let i = 0; i < this.ctrlPoints.length; i += 4) {
            for (let j = 0; j < stringyCount; j++) {
                const t = j / (stringyCount - 1) // Calculate the interpolation parameter
                const cp1 = this.ctrlPoints[i]
                const cp2 = this.ctrlPoints[i + 1]
                const cp3 = this.ctrlPoints[i + 2]
                const cp4 = this.ctrlPoints[i + 3]

                // Calculate the position of the Stringy object using Bezier interpolation
                const position = this.getPointOnBezierCurve(cp1, cp2, cp3, cp4, t)
                const { dx, dy } = this.getDerivative(cp1, cp2, cp3, cp4, t)
                const angle = Math.atan2(dy, dx) - Math.PI / 2
                const vel = Math.sqrt(dx * dx + dy * dy) * 2
                const stringyLength = map(vel, 500, 1000, this.innerDiam * 0.3, this.outerDiam * 0.3)
                const speed = Math.random() * 0.02 + 0.01
                // Create a new Stringy object and add it to the array
                const stringy1 = new Stringy(this.ctx, position, angle, stringyLength, speed, numPoints, curly)
                const stringy2 = new Stringy(this.ctx, position, angle + Math.PI / 2, stringyLength, speed, numPoints, curly)
                stringies.push(stringy1, stringy2)
            }
        }
        return stringies
    }

    getDerivative(cp1, cp2, cp3, cp4, t) {
        const dx = 3 * (1 - t) * (1 - t) * (cp2.x - cp1.x) +
            6 * (1 - t) * t * (cp3.x - cp2.x) +
            3 * t * t * (cp4.x - cp3.x);
        const dy = 3 * (1 - t) * (1 - t) * (cp2.y - cp1.y) +
            6 * (1 - t) * t * (cp3.y - cp2.y) +
            3 * t * t * (cp4.y - cp3.y);
        return { dx, dy };
    }

    // Helper method to calculate a point on a Bezier curve
    getPointOnBezierCurve(cp1, cp2, cp3, cp4, t) {
        const x = Math.pow(1 - t, 3) * cp1.x +
            3 * Math.pow(1 - t, 2) * t * cp2.x +
            3 * (1 - t) * Math.pow(t, 2) * cp3.x +
            Math.pow(t, 3) * cp4.x
        const y = Math.pow(1 - t, 3) * cp1.y +
            3 * Math.pow(1 - t, 2) * t * cp2.y +
            3 * (1 - t) * Math.pow(t, 2) * cp3.y +
            Math.pow(t, 3) * cp4.y
        return { x, y }
    }

    drawStringies() {
        for (let i = 0; i < this.stringies.length; i++) {
            this.stringies[i].update()
            this.stringies[i].draw()
        }
    }

    mouseMove(e) {
        for (let i = 0; i < this.stringies.length; i++) {
            this.stringies[i].changeCurliness(e)
        }
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

