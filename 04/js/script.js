let context

const start = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
let angle = 0
const length = 200
const speed = 0.02
const numPoints = 10
const curly = 0.3
let stringy



function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    stringy = new Stringy(context, start, angle, length, speed, numPoints, curly);
    addEventListener('mousemove', mouseMove)
    draw()
}

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.fillStyle = '#000'

    stringy.update()
    stringy.draw()
    //stringy.displayControlPoints()
    requestAnimationFrame(draw)
}

function mouseMove(e) {
    stringy.changeCurliness(e)

}

window.onload = function () {
    setup()
}