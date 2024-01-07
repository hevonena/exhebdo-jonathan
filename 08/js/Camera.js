export default class Camera {
    constructor() {
        console.log('Camera')
        this.video = document.createElement('video')
        this.video.width = window.innerWidth
        this.video.height = window.innerHeight
        //this.video.style.transform = "scaleX(-1)"
        document.body.appendChild(this.video)

        this.initWebcam()
    }

    initWebcam() {
        const constraints = {
            video: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                this.video.srcObject = stream
                this.video.play()
            })
            .catch((err) => {
                console.log(err)
            })
    }
}