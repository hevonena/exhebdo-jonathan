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
  context.fillStyle = "rgba(255,255,255,0.08)"
  context.fillRect(0, 0, width, height)
  let nSpiral = 30
  posx = centerX + Math.cos((count * nSpiral) * Math.PI / 180) * (width / 2)
  posy = sawTooth(count*0.02) * height
  let spiralHeight = Math.sin(map(Math.abs(posy-centerY), 0, height, 0, Math.PI))*height/18
  let spiralWidth = easeInOutSine()*width/18
  ellipse(posx, posy, spiralWidth, spiralHeight)
  color += 1
  count += 0.1
  requestAnimationFrame(draw)
}

function mousePressed(e) {
  console.log("mousePressed")
}

window.onload = function () {
  console.log("on est pret")
  setup()
}
