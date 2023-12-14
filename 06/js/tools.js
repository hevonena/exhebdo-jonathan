function createCanvas(w, h) {
    var canvas = document.createElement('canvas')
    context = canvas.getContext('2d')
    canvas.width = w
    canvas.height = h
    document.body.appendChild(canvas)
}

function rect(x, y, w, h, ctx) {
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.closePath()
}

function circle(x, y, r, ctx) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
}

function triangle(x, y,s, ctx) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + s, y)
    ctx.lineTo(x + s / 2, y - s)
    ctx.fill()
    ctx.closePath()
}

function line(x1, y1, x2, y2, ctx) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}