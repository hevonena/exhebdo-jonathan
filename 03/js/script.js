let width, height
let context
let tiles = []
let nx = 20
let ny
let tileImg

function setup() {
  width = window.innerWidth
  height = window.innerHeight
  tileImg = new Image()
  tileImg.src = "assets/truchet1.png"
  ny = Math.ceil(height / (width / nx))
  createCanvas(width, height)
  document.addEventListener("click", mousePressed)
  document.addEventListener("mousemove", mouseMove)
  rippleInit()
  newTiles()
  draw()
}

function draw() {
  context.clearRect(0, 0, width, height)
  context.fillStyle = " #ff00ff" // black #000000 pink #ff00ff
  context.fillRect(0, 0, width, height)
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display()
  }
  requestAnimationFrame(draw)
}

function mouseMove(informations) {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].isMe(informations.x, informations.y)) {
      tiles[i].hover()
    } else {
      tiles[i].unHover()
    }
  }
}

window.onload = function () {
  setup()
}

function newTiles() {
  tiles = []
  ny = Math.ceil(height / (width / nx))
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      tiles.push(new Tile(i * width / nx, j * width / nx, width / nx, width / nx, tileImg, i, j))
    }
  }
}

