import { Scene } from 'phaser'
import GameModes from '../config/modes/mode'
import GameMode from '../config/modes/mode'
import Scenes from '../config/scene'
import { X_CENTER } from '../config/constants'

export interface OptionMenu {
  mode: GameMode
}

export class Options extends Scene {
  constructor() {
    super({ key: 'Options' })
  }

  create() {
    // Title for the options menu
    this.add
      .text(X_CENTER, 100, 'Select Game Mode', {
        fontFamily: 'Arial Black',
        fontSize: 26,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)

    // Game mode options
    const gameModes = [GameModes.BASIC, GameModes.BASIC_EXPANSION]
    gameModes.forEach((mode, index) => {
      this.createGameModeButton(X_CENTER, 200 + index * 50, mode, () => {
        this.selectGameMode(mode)
      })
    })
  }

  createGameModeButton(x: number, y: number, text: string, callback: any) {
    const textObject = this.add.text(x, y, text, {
      fontFamily: 'Arial Black',
      fontSize: 26,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center',
    })

    textObject.setOrigin(0.5)
    textObject.setInteractive({ useHandCursor: true })

    textObject.on('pointerdown', callback)
    textObject.on('pointerover', () => textObject.setStyle({ fill: '#f8ff38' }))
    textObject.on('pointerout', () => textObject.setStyle({ fill: '#ffffff' }))
  }

  selectGameMode(mode: GameModes) {
    this.scene.start(Scenes.MainMenu, { mode })
  }
}
