import { GameObjects } from 'phaser'
import { probalities } from '../config/probalities'
import { DragableComponentState } from './states'
import { ComoponentDataService } from '../services/ComponentDataService'

class Point extends GameObjects.Container {
  dataService: ComoponentDataService<DragableComponentState> = new ComoponentDataService(this)

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    radius: number,
    numberText: number,
    children?: GameObjects.GameObject[],
  ) {
    const graphics = Point.createCircle(scene, radius)
    const text = Point.createText(scene, numberText)
    const dotsGraphics = Point.createDots(text, numberText, scene)

    super(scene, x, y, children ?? [graphics, text, dotsGraphics])

    this.setSize(radius * 2, radius * 2)
      .setInteractive()
      .setDepth(10)

    this.dataService.setDataTyped({ isInDropZone: false, origin: { x, y } })

    this.scene.input.setDraggable(this)
    scene.add.existing(this)
  }

  private static createDots(text: GameObjects.Text, numberText: number, scene: Phaser.Scene) {
    const dotsY = text.height / 2 - 3 // 10 pixels below the text
    const dotsRadius = 3 // Radius of the dots
    const dotsSpacing = 3 // Space between the dots
    const dotsCount = probalities[numberText as keyof typeof probalities].number_of_combinations // Number of dots

    const dotsGraphics = scene.add.graphics({ fillStyle: { color: 0xff0000 } })
    for (let i = 0; i < dotsCount; i++) {
      dotsGraphics.fillCircle((i - (dotsCount - 1) / 2) * (2 * dotsRadius + dotsSpacing), dotsY, dotsRadius)
    }
    return dotsGraphics
  }

  private static createText(scene: Phaser.Scene, numberText: number) {
    return scene.add
      .text(0, 0, numberText.toString(), {
        fontFamily: 'Arial Black',
        fontSize: 20,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5, 0.7)
      .removeInteractive()
  }

  private static createCircle(scene: Phaser.Scene, radius: number) {
    const graphics = scene.add.graphics({ fillStyle: { color: 0xffdaa0 } })
    graphics.fillCircle(0, 0, radius)
    return graphics
  }
}

export default Point
