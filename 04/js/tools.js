function createCanvas(w, h) {
    var canvas = document.createElement('canvas')
    context = canvas.getContext('2d')
    canvas.width = w
    canvas.height = h
    document.body.appendChild(canvas)
}

function rect(x, y, w, h) {
    context.beginPath()
    context.rect(x, y, w, h)
    context.fill()
    context.closePath()
}

function circle(x, y, r) {
    context.beginPath()
    context.arc(x, y, r, 0, Math.PI * 2, true)
    context.fill()
    context.closePath()
}

function triangle(x, y, s) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + s, y)
    context.lineTo(x + s / 2, y - s)
    context.fill()
    context.closePath()
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}