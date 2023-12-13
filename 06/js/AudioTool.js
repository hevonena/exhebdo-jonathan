class AudioTool {
    constructor() {
        this.audioFile = 'audio/3.mp3'
        this.audio = new Audio(this.audioFile)
        this.isPlaying = false
    }

    initAudioContext() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.initBroadcast()
        this.setupAnalyser()
    }

    initBroadcast() {
        this.source = this.audioContext.createMediaElementSource(this.audio)
    }

    setupAnalyser() {
        this.analyser = this.audioContext.createAnalyser()
        this.source.connect(this.analyser)
        this.analyser.connect(this.audioContext.destination)
        this.analyser.fftSize = 2048
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataFrequency = new Uint8Array(this.bufferLength)
        this.FloatFrequency = new Float32Array(this.bufferLength)
        this.dataWave = new Uint8Array(this.bufferLength)
    }

    updateWaveForm() {
        if (this.audioContext) this.analyser.getByteTimeDomainData(this.dataWave)
    }

    updateFrequency() {
        if (this.audioContext) this.analyser.getByteFrequencyData(this.dataFrequency)
    }

    updateFloatFrequency() {
        if (this.audioContext) this.analyser.getFloatFrequencyData(this.FloatFrequency)
    }

    play(mouse) {
        if(!this.isPlaying) {
            if(!this.audioContext) {
                this.initAudioContext()
            }
            this.audio.play()
            this.isPlaying = true
        
        } else {
            // this.audio.pause()
            // this.isPlaying = false

            let timeToStart = (mouse.clientX / window.innerWidth) * this.audio.duration
            this.audio.currentTime = timeToStart
        }
    }
    setVolume(value) {
        this.audio.volume = value
    }
}