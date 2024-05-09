import { Scene, GameObjects } from 'phaser'
import { BasicPoint, Setup } from '../config/modes/type'
import { X_CENTER, Y_CENTER } from '../config'
import { OptionMenu } from './Options'
import { setups, points } from '../config/modes'
import Hexagon from '../components/hexagon'
import Scenes from '../config/scene'
import GameMode from '../config/modes/mode'
import Point from '../components/point'
import Resource from '../components/resource'
import GameEventManager from '../services/GameEventManager'

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
    this.drawPointer()
    this.addBoard()
    this.addResources()
    this.addPoints()
    new GameEventManager(this)
  }

  private addBoard() {
    const hexFactory = new Hexagon(this)
    const radius = 60
    const xSpacing = Math.sqrt(3) * radius // 60 is the radius
    const ySpacing = (3 / 2) * radius
    const layout = [
      [
        [-1, 2],
        [0, 2],
        [1, 2],
      ],
      [
        [-1.5, 1],
        [-0.5, 1],
        [0.5, 1],
        [1.5, 1],
      ],
      [
        [-2, 0],
        [-1, 0],
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [-1.5, -1],
        [-0.5, -1],
        [0.5, -1],
        [1.5, -1],
      ],
      [
        [-1, -2],
        [0, -2],
        [1, -2],
      ],
    ]
    layout.forEach((row) =>
      row.forEach(([x, y]) => {
        hexFactory.draw(X_CENTER + xSpacing * x, Y_CENTER + ySpacing * y, radius)
      }),
    )
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
    this.coordText = this.add.text(10, 10, [0, 0], {
      font: '16px Arial',
    })
  }
}
