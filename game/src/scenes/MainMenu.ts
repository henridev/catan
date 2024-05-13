import { Scene, GameObjects } from 'phaser'
import { OptionMenu } from './Options'
import GameMode from '../config/modes/mode'
import Scenes from '../config/scene'
import { X_CENTER } from '../config/constants'

export class MainMenu extends Scene {
  background: GameObjects.Image
  logo: GameObjects.Image
  title: GameObjects.Text
  menuItems: Array<GameObjects.Text>
  gameMode: GameMode

  constructor() {
    super(Scenes.MainMenu)
  }

  init(data: OptionMenu) {
    // option passed from the options scene
    this.gameMode = data?.mode ?? GameMode.BASIC
  }

  create() {
    this.background = this.add.image(X_CENTER, 384, 'background')
    this.logo = this.add.image(X_CENTER, 300, 'logo')

    this.menuItems = [
      this.createMenuItem(X_CENTER, 450, 'Start Game', () => this.scene.start(Scenes.Game, { mode: this.gameMode })),
      this.createMenuItem(X_CENTER, 500, 'Options', () => this.scene.start(Scenes.Options)),
      this.createMenuItem(X_CENTER, 550, 'Exit', () => this.closeGame()),
    ]
    this.menuItems.forEach((item) => {
      item
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => item.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => item.setStyle({ fill: '#fff' }))
    })
  }

  private createMenuItem(x: number, y: number, text: string, callback: Function): GameObjects.Text {
    return this.add
      .text(x, y, text, {
        fontFamily: 'Arial Black',
        fontSize: 26,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .on('pointerdown', callback)
  }

  private closeGame() {
    // Implement game close functionality, if applicable for your environment
    console.log('Exit game') // Placeholder
  }
}
