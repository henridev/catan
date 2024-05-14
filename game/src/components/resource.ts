import { GameObjects } from 'phaser'
import { Resource as ResourceType } from '../config/modes/type'
import { ComoponentDataService } from '../services/ComponentDataService'
import { DragableComponentState } from './states'

class Resource extends GameObjects.Image {
  dataService: ComoponentDataService<DragableComponentState> = new ComoponentDataService(this)

  constructor(scene: Phaser.Scene, x: number, y: number, texture: ResourceType, frame?: string | number) {
    super(scene, x, y, texture, frame)
    this.dataService.setDataTyped({ isInDropZone: false, origin: { x, y }, type: texture })
    this.setInteractive().setScale(0.41)
    this.scene.input.setDraggable(this)
    scene.add.existing(this)
  }
}

export default Resource
