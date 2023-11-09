class CurveEditor {
    constructor(ctx) {
        this.ctx = ctx
        this.ctrlPoints = []
        this.selectedPointIndex = -1
        this.radius = 2.5
    }

    draw() {
        this.drawControlPoints()
        if (this.ctrlPoints.length <= 2) return

        this.ctx.beginPath()
        this.ctx.moveTo(this.ctrlPoints[0].x, this.ctrlPoints[0].y)

        for (let i = 0; i < this.ctrlPoints.length - 1; i++) {
            const cp1 = this.ctrlPoints[i]
            const cp2 = this.ctrlPoints[i + 1]
            const midX = (cp1.x + cp2.x) / 2
            const midY = (cp1.y + cp2.y) / 2
            this.ctx.quadraticCurveTo(cp1.x, cp1.y, midX, midY)
        }

        this.ctx.stroke()

    }

    drawControlPoints() {
        if (this.ctrlPoints.length == 0) return
        this.ctx.fillStyle = 'pink'
        for (let i = 0; i < this.ctrlPoints.length; i++) {
            this.ctx.beginPath()
            this.ctx.arc(this.ctrlPoints[i].x, this.ctrlPoints[i].y, 2 * this.radius, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
    mouseDown(e) {
        this.selectedPointIndex = this.ctrlPoints.findIndex(point => Math.hypot(point.x - e.clientX, point.y - e.clientY) < this.radius)
    }

    mouseMove(e) {
        if (this.selectedPointIndex !== -1) {
            this.ctrlPoints[this.selectedPointIndex] = { x: e.clientX, y: e.clientY }
        }
    }

    mouseUp(e) {
        if (this.selectedPointIndex == -1) {
            this.ctrlPoints.push({ x: e.clientX, y: e.clientY })
        } else {
            this.selectedPointIndex = -1
        }
    }

    keyDown(e) {
        if (e.key === 'Backspace') {
            this.ctrlPoints.pop()
        }
    }
}