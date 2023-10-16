let centerX, centerY
const width = 800
const height = 800
let context
let color = 0
let count = 0

function setup() {
  console.log("setup")
  createCanvas(width, height)
  centerX = width / 2
  centerY = height / 2

  // document.addEventListener("click", mousePressed)
  draw()
}

function draw() {
  // context.clearRect(0, 0, width, height)
  context.fillStyle = "rgba(255,255,255,0.04)"
  context.fillRect(0, 0, width, height)
  const posx = sawTooth(count) * width
  const posy = sawTooth(count) * height
  const spiralWidth = Math.sqrt(Math.pow(width / 2, 2) - Math.pow(Math.abs(posy - centerY), 2))
  const spiralHeight = Math.abs(Math.sin(map(posy, 0, height, 0, Math.PI))) * 100

  ellipse(centerX, posy, spiralWidth, spiralHeight)
  ellipse(posx, centerY, spiralHeight, spiralWidth)
  color += 1
  count += 0.021
  requestAnimationFrame(draw)
}

function mousePressed(e) {
  console.log("mousePressed")
}

window.onload = function () {
  console.log("on est pret")
  setup()
}
