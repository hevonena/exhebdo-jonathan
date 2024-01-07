let current = []
let previous = []

let dampening = 0.9

function rippleInit() {
    current = new Array(nx).fill(0).map(n => new Array(ny).fill(0))
    previous = new Array(nx).fill(0).map(n => new Array(ny).fill(0))
    ripple()
}

function mousePressed(informations) {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].isMe(informations.x, informations.y)) {
            //tile[i].rotate()
            previous[tiles[i].gridX][tiles[i].gridY] = 1.5
            break
        }
    }
}

function ripple() {
    for (let i = 1; i < nx - 1; i++) {
        for (let j = 1; j < ny - 1; j++) {
            current[i][j] =
                (previous[i - 1][j] +
                    previous[i + 1][j] +
                    previous[i][j - 1] +
                    previous[i][j + 1])
                / 2 -
                current[i][j]
            current[i][j] = current[i][j] * dampening
            let index = i + j * nx
            if (current[i][j] > 0.1) {
                tiles[index].rotate()
            }

        }
    }

    let temp = previous
    previous = current
    current = temp

    for (let i = 0; i < nx; i++) {
        current[i][0] = 0
        current[i][ny - 1] = 0
    }
    for (let j = 0; j < ny; j++) {
        current[0][j] = 0
        current[nx - 1][j] = 0
    }



    setTimeout(ripple, 100)
}