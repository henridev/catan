import { GameObjects } from 'phaser'
import { Resource as ResourceType } from '../config/modes/type'
import { ComoponentDataService } from '../services/ComponentDataService'
import { DragableComponentState } from './states'
import Tile from './tile'

class Resource extends GameObjects.Image {
  dataService: ComoponentDataService<DragableComponentState> = new ComoponentDataService(this)

  constructor(scene: Phaser.Scene, x: number, y: number, texture: ResourceType, frame?: string | number) {
    super(scene, x, y, texture, frame)
    this.dataService.setDataTyped({ isInDropZone: false, origin: { x, y }, type: texture })
    this.setInteractive().setScale(0.41)
    this.scene.input.setDraggable(this)
    scene.add.existing(this)
  }

  setToDropZone(dropzone: Tile) {
    this.x = dropzone.getCenterTile().x
    this.y = dropzone.getCenterTile().y - 2
    this.dataService.setDataByKey('tile', dropzone)
    this.dataService.setDataByKey('isInDropZone', true)
    dropzone.dataService.setDataByKey('resource', this)
    dropzone.dataService.getDataTyped('point')?.setDepth(2)
    this.setDepth(1)
  }

  setToOrigin() {
    const { x, y } = this.dataService.getDataTyped('origin')
    this.setPosition(x, y)
    this.dataService.getDataTyped('tile')?.dataService.setDataByKey('resource', undefined)
    this.dataService.setDataByKey('tile', undefined)
  }
}

export default Resource
