import { Scene, GameObjects } from 'phaser'
import { Setup } from '../config/modes/type'
import { HEIGHT, WIDTH, X_CENTER, Y_CENTER } from '../config'
import { OptionMenu } from './Options'
import Hexagon from '../components/hexagon'
import Scenes from '../config/scene'
import GameMode from '../config/modes/mode'
import setups from '../config/modes'

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  background: GameObjects.Image
  msg_text: GameObjects.Text
  setup: Setup
  coordText: GameObjects.Text
  gameMode: GameMode

  constructor() {
    super(Scenes.Game)
  }

  preload() {
    // Load SVG files; make sure the paths match your project structure
    this.load.svg('wood', 'assets/resources/wood.svg')
    this.load.svg('dessert', 'assets/resources/dessert.svg')
    this.load.svg('stone', 'assets/resources/stone.svg')
    this.load.svg('brick', 'assets/resources/brick.svg')
    this.load.svg('sheep', 'assets/resources/sheep.svg')
    this.load.svg('wheat', 'assets/resources/wheat.svg')
  }

  init(data: OptionMenu) {
    // option passed from the options scene
    this.setup = setups[data?.mode ?? GameMode.BASIC]
    console.log({ data })
  }

  create() {
    this.camera = this.cameras.main
    this.setInputEvents()
    this.drawPointer()
    const hex = new Hexagon(this)
    const radius = 60
    const horizontalSpacing = Math.sqrt(3) * radius // 60 is the radius
    const verticalSpacing = (3 / 2) * radius
    hex.draw(X_CENTER, Y_CENTER, radius)
    hex.draw(X_CENTER + horizontalSpacing, Y_CENTER, radius)
    hex.draw(X_CENTER - horizontalSpacing, Y_CENTER, radius)
    hex.draw(X_CENTER + horizontalSpacing * 2, Y_CENTER, radius)
    hex.draw(X_CENTER - horizontalSpacing * 2, Y_CENTER, radius)
    hex.draw(X_CENTER - horizontalSpacing / 2, Y_CENTER - verticalSpacing, radius)
    hex.draw(X_CENTER - horizontalSpacing / 2, Y_CENTER + verticalSpacing, radius)
    hex.draw(X_CENTER + horizontalSpacing / 2, Y_CENTER - verticalSpacing, radius)
    hex.draw(X_CENTER + horizontalSpacing / 2, Y_CENTER + verticalSpacing, radius)
    hex.draw(X_CENTER + horizontalSpacing / 2 + horizontalSpacing, Y_CENTER - verticalSpacing, radius)
    hex.draw(X_CENTER + horizontalSpacing / 2 + horizontalSpacing, Y_CENTER + verticalSpacing, radius)
    hex.draw(X_CENTER - horizontalSpacing / 2 - horizontalSpacing, Y_CENTER - verticalSpacing, radius)
    hex.draw(X_CENTER - horizontalSpacing / 2 - horizontalSpacing, Y_CENTER + verticalSpacing, radius)
    hex.draw(X_CENTER - horizontalSpacing / 2 + horizontalSpacing / 2, Y_CENTER - verticalSpacing * 2, radius)
    hex.draw(X_CENTER - horizontalSpacing / 2 + horizontalSpacing / 2, Y_CENTER + verticalSpacing * 2, radius)
    hex.draw(X_CENTER + horizontalSpacing / 2 + horizontalSpacing / 2, Y_CENTER - verticalSpacing * 2, radius)
    hex.draw(X_CENTER + horizontalSpacing / 2 + horizontalSpacing / 2, Y_CENTER + verticalSpacing * 2, radius)
    hex.draw(X_CENTER - horizontalSpacing, Y_CENTER + verticalSpacing * 2, radius)
    hex.draw(X_CENTER - horizontalSpacing, Y_CENTER - verticalSpacing * 2, radius)

    this.addResources()
  }

  private addResources() {
    Object.entries(this.setup).forEach(([k, v]) => {
      for (let i = 0; i < v.amount; i++) {
        const image = this.add
          .image(v.position.x, v.position.y, k)
          .setInteractive()
          .setData('isInDropZone', false)
          .setData('origin', { x: v.position.x, y: v.position.y })
        this.input.setDraggable(image)
      }
    })
  }

  private drawPointer() {
    this.coordText = this.add.text(10, 10, '', {
      font: '16px Arial',
    })

    this.input.on('pointermove', (pointer: { x: any; y: any }) => {
      this.coordText.setText(`Pointer X: ${pointer.x}, Pointer Y: ${pointer.y}`)
    })
  }

  private setInputEvents() {
    this.input.on('drag', (_: any, gameObject: { x: number; y: number }, dragX: number, dragY: number) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })
  }
}
