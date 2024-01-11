import Camera from './Camera.js'
import Grid from './Grid.js'
import HandDetector from './HandDetector.js'
import Stringies from './Stringies.js'

//have hairs all over and they ripple when you move your hand

export default class App {
    constructor() {
        console.log('App')
        this.cam = new Camera()
        this.handDetector = new HandDetector(this.cam.video)
        this.handDetector.addEventListener('ready', this.onHandDetectorReady.bind(this))
    }

    onHandDetectorReady(e) {
        console.log('onHandDetectorReady')
        //this.grid = new Grid(this.handDetector.ctx, this.handDetector.finger1)
        this.stringies = new Stringies(this.handDetector.ctx, 7000)
        this.draw()
    }

    draw() {
        this.handDetector.detect()
        //this.grid.draw(this.handDetector.finger1)
        this.stringies.touch(this.handDetector.finger1)
        this.stringies.touch(this.handDetector.finger2)
        this.stringies.update()
        this.stringies.draw()
        requestAnimationFrame(this.draw.bind(this))
    }
}