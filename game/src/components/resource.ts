import { GameObjects } from 'phaser'
import { Resource as ResourceType } from '../config/modes/type'

class Resource extends GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: ResourceType, frame?: string | number) {
    super(scene, x, y, texture, frame)
    this.setInteractive().setData({ isInDropZone: false, origin: { x, y }, type: texture }).setScale(0.41)
    this.scene.input.setDraggable(this)
    scene.add.existing(this)
  }
}

export default Resource
