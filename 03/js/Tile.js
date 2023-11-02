class Tile {
    constructor(x, y, w, h, img, gridX, gridY) {
        this.x = x
        this.y = y
        this.width = w
        this.height = h
        this.gridX = gridX
        this.gridY = gridY
        this.img = img
        this.scale = 1.2
        this.rotation = Math.floor(Math.random() * 4) * Math.PI / 2
    }

    display() {
        context.save()
        context.translate(this.x, this.y)
        context.translate(this.width / 2, this.height / 2)
        context.rotate(this.rotation)
        context.scale(this.scale, this.scale)
        context.translate(-this.width / 2, -this.height / 2)
        context.drawImage(this.img, 0, 0, this.width, this.height)
        context.restore()
    }

    isMe(x, y) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
    }

    rotate() {
        this.animateProperty("rotation", this.rotation + Math.PI / 2, 0.2)
    }

    hover() {
        this.animateProperty("scale", 1.5, 0.2)
    }
    unHover() {
        this.animateProperty("scale", 1.2, 0.2)
    }
    animateProperty(propertyName, targetValue, duration) {
        const startTime = performance.now()
        const startValue = this[propertyName]

        const animate = (currentTime) => {
            const elapsedTime = (currentTime - startTime) / 1000
            if (elapsedTime < duration) {
                const progress = this.easeInOutCubic(elapsedTime / duration)
                this[propertyName] = startValue + (targetValue - startValue) * progress
                requestAnimationFrame(animate)
            } else {
                this[propertyName] = targetValue
            }
        }

        requestAnimationFrame(animate);
    }
    easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

}