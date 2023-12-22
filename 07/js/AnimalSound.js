class AnimalSound {
    constructor(animal, color) {
        this.name = animal
        this.audio = new Audio(animal)
        this.isPlaying = false
        this.color = color
        this.size = 10
        this.audio.addEventListener("ended", () => {
            this.isPlaying = false
        })
    }
    isMe(color) {
        if (this.color == color) {
            return true
        } else {
            return false
        }
    }

    play() {
        if (this.isPlaying) return
        console.log(this.name);
        this.audio.play()
        this.isPlaying = true
    }

    setVolume(value) {
        this.audio.volume = value
    }
}