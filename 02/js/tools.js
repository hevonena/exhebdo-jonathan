function createCanvas(w, h) {
    var canvas = document.createElement("canvas")
    context = canvas.getContext("2d")
    // center canvas
    canvas.style.position = "absolute"
    canvas.style.left = window.innerWidth / 2 - w / 2 + "px"
    canvas.style.top = window.innerHeight / 2 - h / 2 + "px"
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    canvas.style.border = "1px solid"
    canvas.style.boxShadow = "0px 0px 120px 0px rgba(0,0,0,0.25)"

    canvas.width = w
    canvas.height = h
    document.body.appendChild(canvas)
}

function circle(x, y, rayon) {
    context.beginPath()
    context.arc(x, y, rayon, 0, 2 * Math.PI, true)
    context.strokeStyle = `hsl(${color}, 50%,50%)`
    context.stroke()
    context.closePath()
}

function ellipse(x, y, rayonX, rayonY) {
    context.beginPath()
    context.ellipse(x, y, rayonX, rayonY, 0, 0, 2 * Math.PI)
    context.strokeStyle = `hsl(${color}, 50%,50%)`
    context.stroke()
    context.closePath()
}

function constrain(val, min, max) {
    return val > max ? max : val < min ? min : val
}

function map(val, min1, max1, min2, max2) {
    return (val - min1) / (max1 - min1) * (max2 - min2) + min2
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeInQuad(x) {
    return x * x;
}

function sawTooth(x) {
    return Math.floor(x) % 2 == 0 ? x - Math.floor(x) : Math.ceil(x) - x
}

function checkAndChangeDirection() {
    const currentInteger = Math.floor(count)

    if (currentInteger !== lastInteger) {
        console.log("change direction" + a)
        a = Math.random() * 360
        
        // Update the 'lastInteger' for the next check
        lastInteger = currentInteger;
    }
}