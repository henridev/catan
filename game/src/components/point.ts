import { Scene } from 'phaser'

class Point {
  scene: Scene

  constructor(scene: Scene) {
    this.scene = scene
  }

  public draw(x: number, y: number, radius: number, numberText: number) {
    const graphics = this.scene.add.graphics({ fillStyle: { color: 0xff0000 } })
    graphics.fillCircle(0, 0, radius)
    const text = this.scene.add
      .text(0, 0, numberText.toString(), {
        fontFamily: 'Arial Black',
        fontSize: 26,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5, 0.5)
      .removeInteractive()

    const container = this.scene.add.container(x, y, [graphics, text])

    container
      .setSize(radius * 2, radius * 2)
      .setInteractive() // Set size of container to encapsulate the circle
      .setData({ isInDropZone: false, origin: { x, y }, type: 'point' })
      .setDepth(10)

    // Add drag functionality
    this.scene.input.setDraggable(container)
  }
}

export default Point
