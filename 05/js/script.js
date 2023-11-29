let context
let grid = []
let video

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    initCamera()

    let s = 30
    for (let j = 0; j < window.innerHeight; j += s) {
        for (let i = 0; i < window.innerWidth; i += s) {
            grid.push(new Boid(i, j, s / 2, context))
        }
    }

    addEventListener('click', mousePressed)
    draw()
}

function draw() {
    detectPixels()
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    grid.forEach(boid => {
        boid.update(grid)
        boid.flock(grid)
        boid.display()
    })
    requestAnimationFrame(draw)
}

function mousePressed(e) {
    console.log('mousePressed', e)
}

function detectPixels() {
    let pixels = null
    context.drawImage(video, 0, 0)
    pixels = context.getImageData(0, 0, window.innerWidth, window.innerHeight)
    grid.forEach((boid) => {
        let index = (boid.origin.y * window.innerWidth + boid.origin.x) * 4
        let r = pixels.data[index]
        let g = pixels.data[index + 1]
        let b = pixels.data[index + 2]
        boid.changeColor(r, g, b)
    })
}

window.onload = function () {
    setup()
}