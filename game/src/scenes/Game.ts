import { Scene, GameObjects } from 'phaser'
import { Setup } from '../config/modes/type'
import { OptionMenu } from './Options'
import { setups } from '../config/modes'
import Tile from '../components/tile'
import Scenes from '../config/scene'
import GameMode from '../config/modes/mode'
import Point from '../components/point'
import Resource from '../components/resource'
import { Resource as ResourceType } from '../config/modes/type'

import GameEventManager from '../services/GameEventManager'
import { X_CENTER, Y_CENTER, X_TILE_SPACE, Y_TILE_SPACE, TILE_RADIUS } from '../config/constants'

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  background: GameObjects.Image
  msg_text: GameObjects.Text
  setup: Setup
  coordText: GameObjects.Text
  gameMode: GameMode
  tiles: Tile[] = []
  resources: Resource[] = []
  points: Point[] = []
  randomizeButton: GameObjects.NineSlice
  randomizeButtonText: GameObjects.Text

  constructor() {
    super(Scenes.Game)
  }

  preload() {
    this.load.tilemapTiledJSON
    // Load SVG files; make sure the paths match your project structure
    this.load.image('wood', 'assets/resources/wood.png')
    this.load.image('dessert', 'assets/resources/dessert.png')
    this.load.image('stone', 'assets/resources/stone.png')
    // this.load.image('brick', 'assets/resources/brick.png')
    this.load.image('brick', 'assets/resources/brick.png')
    this.load.image('sheep', 'assets/resources/sheep.png')
    // this.load.image('wheat', 'assets/resources/wheat.png')
    this.load.image('wheat', 'assets/resources/wheat.png')
    this.load.image('ocean', 'assets/resources/ocean.png')

    this.load.atlas('ui', 'assets/ui/nine-slice.png', 'assets/ui/nine-slice.json')
    // this.load.atlas('resources', 'assets/resources/resources.png', 'assets/resources/resourcespng')
  }

  init(data: OptionMenu) {
    // option passed from the options scene
    this.setup = setups[data?.mode ?? GameMode.BASIC]
  }

  create() {
    this.camera = this.cameras.main
    this.drawPointer()
    this.addBoard()
    this.addResources()
    this.addPoints()
    this.createRandomizeButton(X_CENTER * 1, Y_CENTER * 1.7, 'randomize')
    new GameEventManager(this)
  }

  private addBoard() {
    this.setup.layout.forEach((row) =>
      row.forEach(([x, y, isOcean]) => {
        if (isOcean) {
          new Resource(this, X_CENTER + X_TILE_SPACE * x, Y_CENTER + Y_TILE_SPACE * y, ResourceType.Ocean)
        } else {
          this.tiles.push(new Tile(this, X_CENTER + X_TILE_SPACE * x, Y_CENTER + Y_TILE_SPACE * y, TILE_RADIUS))
        }
      }),
    )
  }

  private addResources() {
    Object.entries(this.setup.resources).forEach(([k, v]) => {
      for (let i = 0; i < v.amount; i++) {
        this.resources.push(new Resource(this, v.position.x, v.position.y, k as ResourceType))
      }
    })
  }

  private addPoints() {
    Object.entries(this.setup.points).forEach(([k, { position, amount }]) => {
      for (let i = 0; i < amount; i++) {
        this.points.push(new Point(this, position.x, position.y, TILE_RADIUS * 0.4, k as unknown as number))
      }
    })
  }

  private drawPointer() {
    this.coordText = this.add.text(10, 10, '', {
      font: '16px Arial',
    })
  }

  private createRandomizeButton(x: number, y: number, text: string) {
    this.randomizeButtonText = this.add
      .text(x, y, text, {
        fontFamily: 'Arial Black',
        fontSize: 26,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(2)

    this.randomizeButton = this.add
      .nineslice(this.cameras.main.width / 2, this.cameras.main.height * 0.9, 'ui', 'button-bg', 240, 110, 64, 64)
      .setDepth(1)
      .setInteractive() // Ensure the button is interactive to receive pointer events.

    this.randomizeButtonText.x = this.randomizeButton.x
    this.randomizeButtonText.y = this.randomizeButton.y
  }
}
