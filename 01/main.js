import './style.css'
import 'p5'

const vertices = [
  [0.500, 1.678, 0.000],
  [-1.000, 1.678, 0.000],
  [-1.000, -1.000, 0.000],
  [0.500, -1.000, 0.000],
  [-0.131, 1.244, 0.000],
  [1.369, 1.244, 0.000],
  [1.369, -1.435, 0.000],
  [-0.131, -1.435, 0.000],

  [0.500, 1.678, -1.000],
  [-1.000, 1.678, -1.000],
  [-1.000, -1.000, -1.000],
  [0.500, -1.000, -1.000],
  [-0.131, 1.244, -1.000],
  [1.369, 1.244, -1.000],
  [1.369, -1.435, -1.000],
  [-0.131, -1.435, -1.000],
]
const s = 150
let noiseOffsets = []
const b = 10
const c = 4

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  noFill()
  stroke(255)
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0.1, 5000)

  for (let i = 0; i < vertices.length; i++) {
    noiseOffsets.push([random(0, 1000), random(0, 1000), random(0, 2000)]);
  }
}

window.draw = () => {
  background(0)
  orbitControl()
  rotateX(PI * -0.67)
  rotateY(PI * 0.15)
  rotateZ(PI * -0.06)

  drawLines()
 updateVertices()

}

function drawLines() {
  for (let i = 0; i < vertices.length - 1; i++) {
    if ((i >= 2 && i <= 6) || (i >= 8 && i <= 12)) {
      strokeWeight(b)
    } else {
      strokeWeight(c)
    }
    if (i != 7) {
      line(vertices[i][0] * s, vertices[i][1] * s, vertices[i][2] * s, vertices[i + 1][0] * s, vertices[i + 1][1] * s, vertices[i + 1][2] * s)
    }
  }

  for (let i = 0; i < vertices.length / 2; i++) {
    strokeWeight(c)
    line(vertices[i][0] * s, vertices[i][1] * s, vertices[i][2] * s, vertices[i + 8][0] * s, vertices[i + 8][1] * s, vertices[i + 8][2] * s)
  }
}

function updateVertices() {
  let s = 0.002
  for (let i = 0; i < vertices.length; i++) {
    let dx = map(noise(noiseOffsets[i][0]), 0, 1, -s, s)
    let dy = map(noise(noiseOffsets[i][1]), 0, 1, -s, s)
    let dz = map(noise(noiseOffsets[i][2]), 0, 1, -s, s)

    vertices[i][0] += dx
    vertices[i][1] += dy
    vertices[i][2] += dz

    noiseOffsets[i][0] += 0.01
    noiseOffsets[i][1] += 0.01
    noiseOffsets[i][2] += 0.01
  }
}



window.windowResized = () => {
  resizeCanvas(window.innerWidth, window.innerHeight)
}