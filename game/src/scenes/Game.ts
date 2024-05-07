import { Scene } from 'phaser'
import basic from '../config/basic'

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  background: Phaser.GameObjects.Image
  msg_text: Phaser.GameObjects.Text
  simple = basic
  coordText: Phaser.GameObjects.Text

  constructor() {
    super('Game')
  }

  preload() {
    // Load SVG files; make sure the paths match your project structure
    this.load.svg('wood', 'assets/resources/wood.svg')
    this.load.svg('stone', 'assets/resources/stone.svg')
    this.load.svg('brick', 'assets/resources/brick.svg')
    this.load.svg('sheep', 'assets/resources/sheep.svg')
    this.load.svg('wheat', 'assets/resources/wheat.svg')
  }

  create() {
    this.camera = this.cameras.main
    this.createHexagon(400, 400, 100)
    this.addResources()

    // this.addDropZone()

    // this.camera.setBackgroundColor(0x00ff00)

    // this.background = this.add.image(512, 384, 'background')
    // this.background.setAlpha(0.5)

    // this.msg_text = this.add.text(
    //   512,
    //   384,
    //   'Make something fun!\nand share it with us:\nsupport@phaser.io',
    //   {
    //     fontFamily: 'Arial Black',
    //     fontSize: 38,
    //     color: '#ffffff',
    //     stroke: '#000000',
    //     strokeThickness: 8,
    //     align: 'center',
    //   },
    // )
    // this.msg_text.setOrigin(0.5)

    // this.input.once('pointerdown', () => {
    //   this.scene.start('GameOver')
    // })
  }

  private addResources() {
    Object.entries(this.simple).forEach(([k, v]) => {
      for (let i = 0; i < v.amount; i++) {
        const image = this.add
          .image(v.position.x, v.position.y, k)
          .setInteractive()
        this.input.setDraggable(image)
      }
    })
  }

  private getHexagonPoints(x: number, y: number, radius: number) {
    let points = []
    for (let i = 0; i < 6; i++) {
      let angle = Phaser.Math.DegToRad(60 * i - 30) // -30 to rotate hexagon to flat top
      points.push({
        x: x + radius * Math.cos(angle),
        y: y + radius * Math.sin(angle),
      })
    }
    console.log({ points })
    return points
  }

  private createHexagon(centerX: number, centerY: number, radius: number) {
    // Get points for the hexagon
    const hexagonPoints = this.getHexagonPoints(centerX, centerY, radius)

    // Draw hexagon for visual reference
    const graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0xffffff },
      fillStyle: { color: 0x99dd, alpha: 1 },
    })
    graphics.beginPath()
    graphics.moveTo(hexagonPoints[0].x, hexagonPoints[0].y)
    hexagonPoints.forEach((point) => {
      graphics.lineTo(point.x, point.y)
    })
    graphics.closePath()
    graphics.strokePath()

    console.log({ hexagonPoints })

    var color = new Phaser.Display.Color()
    color.random(50)

    const hexagonShape = new Phaser.Geom.Polygon(hexagonPoints)
    graphics.setInteractive(hexagonShape, Phaser.Geom.Polygon.Contains)

    // const polygon = new Phaser.Geom.Polygon(hexagonPoints)

    // const zone = this.add.zone(centerX, centerY, 2 * radius, 2 * radius)
    // console.log({ zone, polygon })
    // zone.setDropZone(polygon, Phaser.Geom.Polygon.Contains)

    // const dropZone = this.add
    //   .polygon(centerX, centerY, hexagonPoints)
    //   .setOrigin(0.5)
    //   .setFillStyle(color.color)
    //   .setInteractive(
    //     new Phaser.Geom.Polygon(hexagonPoints),
    //     Phaser.Geom.Polygon.Contains,
    //     true,
    //   )

    // console.log({ zone })
    // this.input.setDraggable(dropZone)

    this.input.on(
      'dragstart',
      (pointer: any, gameObject: Phaser.GameObjects.GameObject) => {
        console.log('dragstart')

        this.children.bringToTop(gameObject)
      },
      this,
    )

    this.input.on(
      'drag',
      (
        pointer: any,
        gameObject: { x: any; y: any },
        dragX: any,
        dragY: any,
      ) => {
        console.log('drag')
        gameObject.x = dragX
        gameObject.y = dragY
        this.coordText.setText(
          `Sprite X: ${gameObject.x}, Sprite Y: ${gameObject.y}`,
        )
      },
    )

    this.input.on('dragenter', (pointer: any, gameObject: any) => {
      console.log('Entered hexagon')

      // graphics.clear()
      // graphics.beginPath()
      // graphics.lineStyle(2, 0x00ffff)
      // graphics.moveTo(hexagonPoints[0].x, hexagonPoints[0].y)
      // hexagonPoints.forEach((point) => {
      //   graphics.lineTo(point.x, point.y)
      // })
      // graphics.closePath()
      // graphics.strokePath()
    })

    this.input.on(
      'dragleave',
      (
        pointer: any,
        _gameObject: any,
        dropZone: {
          x: number
          y: number
          input: { hitArea: { radius: number } }
        },
      ) => {
        console.log('Left hexagon')

        // graphics.clear()
        // graphics.beginPath()
        // graphics.lineStyle(2, 0xffffff)
        // graphics.moveTo(hexagonPoints[0].x, hexagonPoints[0].y)
        // hexagonPoints.forEach((point) => {
        //   graphics.lineTo(point.x, point.y)
        // })
        // graphics.closePath()
        // graphics.strokePath()
      },
    )

    this.input.on(
      'drop',
      (
        pointer: any,
        gameObject: { x: any; y: any; input: { enabled: boolean } },
        dropZone: { x: any; y: any },
      ) => {
        console.log('drop', { dropZone })
        gameObject.x = dropZone.x
        gameObject.y = dropZone.y

        gameObject.input.enabled = false
      },
    )

    this.input.on(
      'dragend',
      (
        pointer: any,
        gameObject: {
          x: any
          input: { dragStartX: any; dragStartY: any }
          y: any
        },
        dropped: any,
      ) => {
        console.log('dropend', { dropped })
        if (!dropped) {
          gameObject.x = gameObject.input.dragStartX
          gameObject.y = gameObject.input.dragStartY
        }
      },
    )

    this.coordText = this.add.text(10, 10, '', {
      font: '16px Arial',
    })

    this.input.on('pointermove', (pointer: { x: any; y: any }) => {
      this.coordText.setText(`Pointer X: ${pointer.x}, Pointer Y: ${pointer.y}`)
    })
  }
}
