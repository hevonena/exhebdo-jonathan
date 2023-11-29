function createCanvas(w, h) {
    var canvas = document.createElement('canvas')
    context = canvas.getContext('2d')
    canvas.width = w
    canvas.height = h
    document.body.appendChild(canvas)
}

function initCamera() {
    video = document.createElement("video");
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
  
    navigator.getMedia(
      {
        video: { width: window.innerWidth, height: window.innerHeight},
        audio: false,
      },
      (stream) => {
        video.srcObject = stream
        video.play()
      },
      (error) => {
        console.log(error)
      }
    )
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

function triangle(x, y,s) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + s, y)
    context.lineTo(x + s / 2, y - s)
    context.fill()
    context.closePath()
}