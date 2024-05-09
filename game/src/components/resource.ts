import { Scene } from 'phaser'

class Resource {
  static draw(scene: Scene, x: number, y: number, imageName: string) {
    const image = scene.add
      .image(x, y, imageName)
      .setInteractive()
      .setData('isInDropZone', false)
      .setData('origin', { x, y })
      .setData('type', 'resource')
    scene.input.setDraggable(image)
  }
}

export default Resource
