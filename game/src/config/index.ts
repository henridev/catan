import { Types } from 'phaser'
import { Boot } from '../scenes/Boot'
import { Game as MainGame } from '../scenes/Game'
import { GameOver } from '../scenes/GameOver'
import { MainMenu } from '../scenes/MainMenu'
import { Preloader } from '../scenes/Preloader'
import { Options } from '../scenes/Options'
import { HEIGHT, WIDTH } from './constants'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver, Options],
}

export default config
