import { Scene, GameObjects } from 'phaser'
import { BasicPoint, Setup } from '../config/modes/type'
import { X_CENTER, Y_CENTER } from '../config'
import { OptionMenu } from './Options'
import { setups, points } from '../config/modes'
import HexagonFactory from '../components/hexagon-factory'
import Scenes from '../config/scene'
import GameMode from '../config/modes/mode'
import Point from '../components/point'
import Resource from '../components/resource'

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  background: GameObjects.Image
  msg_text: GameObjects.Text
  setup: Setup
  gamePoints: BasicPoint
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
    this.gamePoints = points[data?.mode ?? GameMode.BASIC]
  }

  create() {
    this.camera = this.cameras.main
    this.setInputEvents()
    this.drawPointer()
    this.addBoard()

    this.addResources()
    this.addPoints()
  }

  private addBoard() {
    const hexFactory = new HexagonFactory(this)
    const radius = 60
    const horizontalSpacing = Math.sqrt(3) * radius // 60 is the radius
    const verticalSpacing = (3 / 2) * radius

    hexFactory.draw(X_CENTER, Y_CENTER, radius)
    hexFactory.draw(X_CENTER + horizontalSpacing, Y_CENTER, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing, Y_CENTER, radius)
    hexFactory.draw(X_CENTER + horizontalSpacing * 2, Y_CENTER, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing * 2, Y_CENTER, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing / 2, Y_CENTER - verticalSpacing, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing / 2, Y_CENTER + verticalSpacing, radius)
    hexFactory.draw(X_CENTER + horizontalSpacing / 2, Y_CENTER - verticalSpacing, radius)
    hexFactory.draw(X_CENTER + horizontalSpacing / 2, Y_CENTER + verticalSpacing, radius)
    hexFactory.draw(X_CENTER + horizontalSpacing / 2 + horizontalSpacing, Y_CENTER - verticalSpacing, radius)
    hexFactory.draw(X_CENTER + horizontalSpacing / 2 + horizontalSpacing, Y_CENTER + verticalSpacing, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing / 2 - horizontalSpacing, Y_CENTER - verticalSpacing, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing / 2 - horizontalSpacing, Y_CENTER + verticalSpacing, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing / 2 + horizontalSpacing / 2, Y_CENTER - verticalSpacing * 2, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing / 2 + horizontalSpacing / 2, Y_CENTER + verticalSpacing * 2, radius)
    hexFactory.draw(X_CENTER + horizontalSpacing / 2 + horizontalSpacing / 2, Y_CENTER - verticalSpacing * 2, radius)
    hexFactory.draw(X_CENTER + horizontalSpacing / 2 + horizontalSpacing / 2, Y_CENTER + verticalSpacing * 2, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing, Y_CENTER + verticalSpacing * 2, radius)
    hexFactory.draw(X_CENTER - horizontalSpacing, Y_CENTER - verticalSpacing * 2, radius)
  }

  private addResources() {
    Object.entries(this.setup).forEach(([k, v]) => {
      for (let i = 0; i < v.amount; i++) {
        Resource.draw(this, v.position.x, v.position.y, k)
      }
    })
  }

  private addPoints() {
    Object.entries(this.gamePoints).forEach(([k, { position, amount }]) => {
      for (let i = 0; i < amount; i++) {
        const gamepoint = new Point(this)
        gamepoint.draw(position.x, position.y, 60 * 0.4, k as unknown as number)
      }
    })
  }

  private drawPointer() {
    this.coordText = this.add.text(10, 10, '', {
      font: '16px Arial',
    })
  }

  private setInputEvents() {
    this.input.on(
      'drag',
      (_: any, gameObject: GameObjects.Image | GameObjects.Polygon, dragX: number, dragY: number) => {
        gameObject.x = dragX
        gameObject.y = dragY
      },
    )

    this.input.on('pointermove', (pointer: { x: any; y: any }) => {
      this.coordText.setText(`Pointer X: ${pointer.x}, Pointer Y: ${pointer.y}`)
    })
  }
}
