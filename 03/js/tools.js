function createCanvas(w, h) {
    var canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    context = canvas.getContext("2d")
    document.body.appendChild(canvas)
}

window.onresize = function () {
    width = window.innerWidth
    height = window.innerHeight
    context.canvas.width = width
    context.canvas.height = height
    newTiles()
}
