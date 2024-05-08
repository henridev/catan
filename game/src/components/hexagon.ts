import { Scene, GameObjects } from 'phaser'

class Hexagon {
  scene: Scene

  constructor(scene: Scene) {
    this.scene = scene
  }

  public draw(centerX: number, centerY: number, radius: number) {
    const points = this.getPoints(centerX, centerY, radius)

    const graphics = this.scene.add.graphics({
      lineStyle: { width: 5, color: 0xf999 },
      fillStyle: { color: 0x99dd, alpha: 1 },
    })
    graphics.beginPath()
    graphics.moveTo(points[0].x, points[0].y)
    points.forEach((point) => {
      graphics.lineTo(point.x, point.y)
    })
    graphics.closePath()
    graphics.strokePath()

    var color = new Phaser.Display.Color()
    color.random(50)

    const hexagonShape = new Phaser.Geom.Polygon(points)
    graphics.setInteractive(hexagonShape, Phaser.Geom.Polygon.Contains)

    const dropZone = this.scene.add
      .polygon(0, 0, points)
      // the points you provide are relative to the origin of the polygon,
      //not the scene. This means if you specify the origin at (0, 0), the polygon will draw starting from (0, 0) and extend to the coordinates defined in your points array.
      .setOrigin(0, 0)
      .setFillStyle(color.color)
      .setInteractive(new Phaser.Geom.Polygon(points), Phaser.Geom.Polygon.Contains, true)
    dropZone.setData('objects', [])
    // dropzone.setPosition(centerX, centerY)

    this.setInputEvents(centerX, centerY, graphics, points)
  }

  private getPoints(x: number, y: number, radius: number) {
    let points = []
    for (let i = 0; i < 6; i++) {
      const degrees = 60 * i - 30 // move from -30, 30, 90, 150, 210, 270
      let angle = Phaser.Math.DegToRad(degrees)
      points.push({
        x: x + radius * Math.cos(angle), // adjacent side / hypotenuse scale 1
        y: y + radius * Math.sin(angle), // opposite side / hypotenuse scale 1
      })
    }
    return points
  }

  private setInputEvents(
    centerX: number,
    centerY: number,
    graphics: GameObjects.Graphics,
    points: {
      x: number
      y: number
    }[],
  ) {
    this.scene.input.on(
      'dragstart',
      (_: any, gameObject: GameObjects.Image) => {
        gameObject.setAlpha(0.5)
        this.scene.children.bringToTop(gameObject)
      },
      this,
    )

    // Add event handlers for drag and drop

    this.scene.input.on('dragenter', (pointer: any, gameObject: any, dropZone: any) => {
      graphics.clear()
      graphics.lineStyle(2, 0xffff00)
      graphics.fillStyle(0xffff00, 1)
      graphics.fillPoints(points, true)
      graphics.strokePoints(points, true)
    })

    this.scene.input.on('dragleave', (pointer: any, gameObject: GameObjects.Image, dropZone: any) => {
      graphics.clear()
      graphics.lineStyle(2, 0xffffff)
      graphics.fillStyle(0x099099, 1)
      graphics.fillPoints(points, true)
      graphics.strokePoints(points, true)
      const index = dropZone.getData('objects').indexOf(gameObject)
      console.log({ index, obj: dropZone.getData('objects') })
      if (index > -1) {
        dropZone.getData('objects').splice(index, 1) // Remove from dropzone
      }
      console.log({ obj: dropZone.getData('objects') })

      gameObject.setData('isInDropZone', false)
    })

    this.scene.input.on('drop', (_: any, gameObject: GameObjects.Image, dropZone: GameObjects.Polygon) => {
      if (dropZone.getData('objects').length > 0) return
      dropZone.getData('objects').push(gameObject) // Add to dropzone
      gameObject.setData('isInDropZone', true)
      const xs = dropZone.pathData.filter((_, i) => (i & 1) === 0)
      const x = (Math.max(...xs) + Math.min(...xs)) / 2
      const ys = dropZone.pathData.filter((_, i) => (i & 1) !== 0)
      const y = (Math.max(...ys) + Math.min(...ys)) / 2
      gameObject.x = x
      gameObject.y = y + 4
    })

    this.scene.input.on('dragend', (_: any, gameObject: GameObjects.Image, __: any) => {
      gameObject.setAlpha(1)
      if (gameObject.getData('isInDropZone')) return
      gameObject.setPosition(gameObject.getData('origin')?.x, gameObject.getData('origin')?.y) // Reset position if not in dropzone
    })
  }
}

export default Hexagon
