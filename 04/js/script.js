let context
let flower
function setup() {
    createCanvas(window.innerWidth, window.innerHeight)

    let petals = 5
    //curveEditor = new CurveEditor(context)
    flower = new Flower({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 100, 600, petals, context)

    addEventListener('mousemove', mouseMove)
    addEventListener('mousedown', mouseDown)
    addEventListener('mouseup', mouseUp)
    addEventListener('keydown', keyDown)
    draw()
}

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.fillStyle = '#000'

    flower.drawStringies()
    //curveEditor.draw()
    requestAnimationFrame(draw)
}

function mouseDown(e) {
    //curveEditor.mouseDown(e)
}

function mouseUp(e) {
    //curveEditor.mouseUp(e)
}

function mouseMove(e) {
    //curveEditor.mouseMove(e)
    flower.mouseMove(e)
}

function keyDown(e) {
    //curveEditor.keyDown(e)
}


window.onload = function () {
    setup()
}