class Boid {
    constructor(x, y, s, ctx) {
        this.position = { x, y }
        this.origin = { x, y }
        this.size = s
        this.color = "black"
        this.ctx = ctx
        this.velocity = { x: Math.random() - 0.5, y: Math.random() - 0.5 }
        this.acceleration = { x: 0, y: 0 }
        this.maxSpeed = 2
        this.maxForce = 0.4
    }

    changeColor(r, g, b) {
        this.intensity = 0.2126 * r + 0.7152 * g + 0.0722 * b / 255
        this.color = `rgb(${r}, ${g}, ${b})`
    }

    display() {
        this.ctx.fillStyle = this.color
        circle(this.position.x, this.position.y, this.size / 1.5)
    }

    // Update the boid's position and velocity
    update() {
        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y
        this.velocity.x = Math.max(Math.min(this.velocity.x, this.maxSpeed), -this.maxSpeed)
        this.velocity.y = Math.max(Math.min(this.velocity.y, this.maxSpeed), -this.maxSpeed)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.edges(window.innerWidth, window.innerHeight)

        // Reset acceleration to 0 each frame
        this.acceleration.x = 0
        this.acceleration.y = 0
    }

    // Apply a force to the boid
    applyForce(force) {
        this.acceleration.x += force.x
        this.acceleration.y += force.y
    }

    // Method to calculate and apply the three behaviors
    flock(boids) {
        let separation = this.separate(boids, this.size * 2)   // Method to be implemented
        let alignment = this.align(boids, this.size * 2)       // Method to be implemented
        let cohesion = this.cohere(boids, this.size)       // Method to be implemented

        this.applyForce(separation)
        this.applyForce(alignment)
        this.applyForce(cohesion)
    }

    separate(boids, desiredSeparation = 25) {

        let steer = { x: 0, y: 0 }
        let count = 0

        boids.forEach(other => {
            let intensityDifference = Math.abs(this.intensity - other.intensity)
            let d = this.distance(this.position, other.position)
            if ((d > 0) && (d < desiredSeparation)) {
                let diff = { x: this.position.x - other.position.x, y: this.position.y - other.position.y }
                steer.x += diff.x / d
                steer.y += diff.y / d
                count++
            }
        })

        if (count > 0) {
            steer.x /= count
            steer.y /= count
        }

        if (this.magnitude(steer) > 0) {
            steer = this.setMagnitude(steer, this.maxSpeed)
            steer.x -= this.velocity.x
            steer.y -= this.velocity.y
            steer = this.limit(steer, this.maxForce)
        }

        return steer
    }

    align(boids, neighborDist = 50) {
        let sum = { x: 0, y: 0 }
        let count = 0

        boids.forEach(other => {
            let intensityDifference = Math.abs(this.intensity - other.intensity)
            let d = this.distance(this.position, other.position)
            if ((d > 0) && (d < neighborDist)) {
                sum.x += other.velocity.x 
                sum.y += other.velocity.y 
                count++
            }
        })

        if (count > 0) {
            sum.x /= count
            sum.y /= count
            sum = this.setMagnitude(sum, this.maxSpeed)
            let steer = { x: sum.x - this.velocity.x, y: sum.y - this.velocity.y }
            return this.limit(steer, this.maxForce)
        } else {
            return { x: 0, y: 0 }
        }
    }

    cohere(boids, neighborDist = 50) {
        let sum = { x: 0, y: 0 }
        let count = 0

        boids.forEach(other => {
            let intensityDifference = Math.abs(this.intensity - other.intensity)
            let d = this.distance(this.position, other.position)
            if ((d > 0) && (d < neighborDist)) {
                sum.x += other.position.x * intensityDifference
                sum.y += other.position.y * intensityDifference
                count++
            }
        })

        if (count > 0) {
            sum.x /= count
            sum.y /= count
            return this.seek(sum)
        } else {
            return { x: 0, y: 0 }
        }
    }

    edges(width, height) {
        if (this.position.x > width || this.position.x < 0) {
            this.velocity.x *= -1
        }
        if (this.position.y > height || this.position.y < 0) {
            this.velocity.y *= -1
        }
    }

    wrapEdges(width, height) {
        if (this.position.x > width) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = width
        }

        if (this.position.y > height) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = height
        }
    }

    // Additional utility methods
    distance(v1, v2) {
        let dx = v1.x - v2.x
        let dy = v1.y - v2.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    magnitude(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
    }

    setMagnitude(vector, mag) {
        let norm = this.magnitude(vector)
        return norm !== 0 ? { x: vector.x * mag / norm, y: vector.y * mag / norm } : { x: 0, y: 0 }
    }

    limit(vector, max) {
        if (this.magnitude(vector) > max) {
            return this.setMagnitude(vector, max)
        }
        return vector
    }

    seek(target) {
        let desired = { x: target.x - this.position.x, y: target.y - this.position.y }
        desired = this.setMagnitude(desired, this.maxSpeed)
        let steer = { x: desired.x - this.velocity.x, y: desired.y - this.velocity.y }
        return this.limit(steer, this.maxForce)
    }
}
