class App {
  constructor() {
    this.height = window.innerHeight
    this.width = window.innerWidth
    this.canvas = document.createElement("canvas")
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext("2d")
    document.body.appendChild(this.canvas)

    this.map = { x: 0, y: 0 } // position du curseur

    // histoire de tester sans le clavier midi
    addEventListener("mousemove", (e) => {
      this.map.x = e.clientX
      this.map.y = e.clientY
    })

    this.animalSounds = []
    this.animalSounds.push(new AnimalSound("sound/Algeria-fennec.mp3", `rgb(${198},${46},${53})`)) // attention à ne pas laisser d'espaces entre les valeurs rgb
    this.animalSounds.push(new AnimalSound("sound/Argentinar-rufus.mp3", `rgb(${57},${160},${221})`)) // sinon la comparaison ne fonctionne pas
    this.animalSounds.push(new AnimalSound("sound/hunduras-macaw.mp3", `rgb(${233},${181},${38})`))
    this.animalSounds.push(new AnimalSound("sound/Uganda-GreyCrownedCrane.mp3", `rgb(${168},${91},${155})`))
    this.animalSounds.push(new AnimalSound("sound/UnitedArabEmirates-ArabianOryx.mp3", `rgb(${170},${199},${100})`))
    this.animalSounds.push(new AnimalSound("sound/UnitedStates-Bison.mp3", `rgb(${56},${78},${152})`))
    this.animalSounds.push(new AnimalSound("sound/Venezuela-VenezuelanTroupial.mp3", `rgb(${128},${36},${85})`))
    this.animalSounds.push(new AnimalSound("sound/Zimbabwe-Bateleur.mp3", `rgb(${63},${160},${131})`))
    this.animalSounds.push(new AnimalSound("sound/India-BengalTiger.mp3", `rgb(${208},${101},${50})`))
    this.animalSounds.push(new AnimalSound("sound/Australia-Koala.mp3", `rgb(${242},${230},${16})`))
    this.animalSounds.push(new AnimalSound("sound/Russia-Bear.mp3", `rgb(${71},${209},${143})`))
    this.animalSounds.push(new AnimalSound("sound/Groenland-PolarBear.mp3", `rgb(${209},${132},${200})`))
    this.animalSounds.push(new AnimalSound("sound/Finland-Swan.mp3", `rgb(${101},${150},${149})`))
    this.animalSounds.push(new AnimalSound("sound/China-RedCrownedCrane.mp3", `rgb(${247},${11},${151})`))
    this.animalSounds.push(new AnimalSound("sound/Brazil-Jaguar.mp3", `rgb(${141},${181},${44})`))
    this.animalSounds.push(new AnimalSound("sound/Canada-Beaver.mp3", `rgb(${120},${96},${178})`))


    this.midiconnection = new MidiConnection()
    this.midiconnection.addEventListener("midi", this.onMidi.bind(this))

    this.grille = []
    this.image = new Image()
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
      const pixels = this.ctx.getImageData(0, 0, this.width, this.height)
      this.data = pixels.data

      for (let j = 0; j < this.height; j += 6) {
        for (let i = 0; i < this.width; i += 6) {
          let circle = new Circle(i, j, 3, this.ctx)
          this.grille.push(circle)
        }
      }

      this.grille.forEach((circle, i) => {
        const x = circle.x
        const y = circle.y
        const percent = this.detectPixels(x, y)
        circle.rayon = percent * 3
      })


      this.draw()
    }
    this.image.src = "image/worldmap.png"
  }

  onMidi(e) {
    //console.log(e);
    e[3] == 1 ? this.map.x = map(e[4], 0, 127, 0, this.width) : this.map.y = map(e[4], 0, 127, this.height, 0)
  }
  draw() {
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.width, this.height)

    this.grille.forEach((circle, i) => {
      circle.draw()
    })

    // HERE! ce log sert à trouver les valeurs rgb des couleurs de l'image
    //console.log(this.pixelColor(this.map.x, this.map.y))
    this.animalSounds.forEach((animal) => {
      if (animal.isMe(this.pixelColor(this.map.x, this.map.y))) {
        animal.play()
      }
    })


    this.ctx.strokeStyle = "red"
    this.ctx.lineWidth = 5
    line(this.map.x, 0, this.map.x, this.height, this.ctx)
    line(0, this.map.y, this.width, this.map.y, this.ctx)
    requestAnimationFrame(this.draw.bind(this))
  }

  detectPixels(x, y) {
    let index = (y * this.width + x) * 4
    let r = this.data[index]
    let g = this.data[index + 1]
    let b = this.data[index + 2]
    let intensity = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return intensity / 255
  }
  pixelColor(x, y) {
    let index = (y * this.width + x) * 4
    let r = this.data[index]
    let g = this.data[index + 1]
    let b = this.data[index + 2]
    const color = `rgb(${r},${g},${b})`
    return color
  }
}


window.onload = function () {
  const app = new App()
}
