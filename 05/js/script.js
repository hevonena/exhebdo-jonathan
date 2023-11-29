let context
let grid = []
let fire = []
let video
let s = 10

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    initCamera()

    for (let j = 0; j < window.innerHeight; j += s) {
        for (let i = 0; i < window.innerWidth; i += s) {
            grid.push(new Pix(i, j, s, context))
        }
    }

    addEventListener('click', mousePressed)
    draw()
}

function draw() {
    detectPixels()
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    grid.forEach(pix => {
        pix.display()
    })
    fire.forEach(f => {
        if (f.isDead()) {
            fire.splice(f, 1)
            return
        }
        f.display()
        f.update()
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
    grid.forEach((pix) => {
        let index = (pix.position.y * window.innerWidth + pix.position.x) * 4
        let r = pixels.data[index]
        let g = pixels.data[index + 1]
        let b = pixels.data[index + 2]
        let color = `rgb(${r}, ${g}, ${b})`
        pix.changeColor(color)

        let intensity = 0.2126 * r + 0.7152 * g + 0.0722 * b
        if (intensity < 40 && Math.random() < 0.1) {
            fire.push(new Fire(pix.position.x, pix.position.y, s, color, context))
        }
    })
}

window.onload = function () {
    setup()
}