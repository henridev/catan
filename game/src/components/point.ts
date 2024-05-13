import { GameObjects } from 'phaser'

class Point extends GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    radius: number,
    numberText: number,
    children?: GameObjects.GameObject[],
  ) {
    const graphics = scene.add.graphics({ fillStyle: { color: 0xffdaa0 } })
    graphics.fillCircle(0, 0, radius)
    const text = scene.add
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

    super(scene, x, y, children ?? [graphics, text])

    this.setSize(radius * 2, radius * 2)
      .setInteractive() // Set size of container to encapsulate the circle
      .setData({ isInDropZone: false, origin: { x, y }, type: 'point' })
      .setDepth(10)
    // .setAlpha(0.5)

    this.scene.input.setDraggable(this)
    scene.add.existing(this)
  }
}

export default Point
