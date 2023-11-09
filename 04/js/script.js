let context

let furrBall = []



function setup() {
    createCanvas(window.innerWidth, window.innerHeight)

    const n = 1000
    for (let i = 0; i < n; i++) {
        const angle = 10 * i * Math.PI * 2 / n
        const start = { x: window.innerWidth / 2 + Math.cos(angle) * window.innerWidth * 0.002 * i, y: window.innerHeight / 2 + Math.sin(angle) * window.innerWidth * 0.002 * i }
        const length = Math.random() * window.innerWidth * 0.15 + window.innerWidth * 0.2 * i / 100
        const speed = Math.random() * 0.02 + 0.01
        const numPoints = Math.floor(Math.random() * 15 + 3)
        const curly = 0.3
        furrBall.push(new Stringy(context, start, angle, length, speed, numPoints, curly))
    }
    addEventListener('mousemove', mouseMove)
    draw()
}

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.fillStyle = '#000'

    for (let i = 0; i < furrBall.length; i++) {
        furrBall[i].update()
        furrBall[i].draw()
    }

    requestAnimationFrame(draw)
}

function mouseMove(e) {
    for (let i = 0; i < furrBall.length; i++) {
        furrBall[i].changeCurliness(e)
    }
}

window.onload = function () {
    setup()
}