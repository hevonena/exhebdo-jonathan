import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import EventEmitter from '@onemorestudio/eventemitterjs'


export default class HandDetector extends EventEmitter {
    constructor(videoElement) {
        super()
        console.log('HandDetector')
        this.videoElement = videoElement
        this.videoElement.width = window.innerWidth
        this.videoElement.height = window.innerHeight
        //this.videoElement.style.objectFit = 'cover'
        this.videoElement.oncanplay = () => this.init()
    }

    init() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.finger1 = { x: null, y: null }
        this.finger2 = { x: null, y: null }
        this.createHandLandmarker()
    }

    async createHandLandmarker() {
        const vision = await FilesetResolver.forVisionTasks("./tasks/wasm")
        this._handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "./tasks/hand_landmarker.task",
                delegate: "GPU",
            },
            runningMode: "VIDEO", // this.runningMode,
            numHands: 2,
        })
        this.emit('ready', [])
    }

    detect() {
        let startTimeMs = performance.now()
        const results = this._handLandmarker.detectForVideo(
            this.videoElement,
            startTimeMs
        )
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (results.landmarks.length > 0) {
            results.landmarks.forEach((landmarks) => {
                //drawLandmarks(this.ctx, landmarks, { color: 'red', radius: 5 })
            })

            this.finger1 = results.landmarks[0][8]

            if(results.landmarks.length == 2){
                this.finger2 = results.landmarks[1][8]
            } else {
                this.finger2 = { x: null, y: null }
            }

        } else {
            this.finger1 = { x: null, y: null }
        }
    }
}