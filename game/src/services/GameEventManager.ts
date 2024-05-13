import { GameObjects, Input } from 'phaser'
import { Game } from '../scenes/Game'
import { TileStateKey, DragableComponentStateKey } from '../state'
import { Resource as ResourceType } from '../config/modes/type'
import { shuffleArray } from '../utils/object-utils'
import Tile from '../components/tile'
import Resource from '../components/resource'
import Point from '../components/point'

const { colorOrigin } = TileStateKey
const { isInDropZone, origin, type } = DragableComponentStateKey

class GameEventManager {
  scene: Game

  constructor(scene: Game) {
    this.scene = scene
    this.setupEventHandlers()
  }

  setupEventHandlers() {
    this.scene.input.on('drag', this.handleDrag.bind(this))
    this.scene.input.on('pointermove', this.handlePointerMove.bind(this))
    this.scene.input.on('dragstart', this.handleDragStart.bind(this))
    this.scene.input.on('dragenter', this.handleDragEnter.bind(this))
    this.scene.input.on('dragleave', this.handleDragLeave.bind(this))
    this.scene.input.on('drop', this.hanldeDrop.bind(this))
    this.scene.input.on('dragend', this.hanldeDragEnd.bind(this))
    this.scene.randomizeButton
      .on('pointerdown', this.handleRandomize.bind(this))
      .on('pointerover', () => this.scene.randomizeButtonText.setStyle({ color: '#ff0' }))
      .on('pointerout', () => this.scene.randomizeButtonText.setStyle({ color: '#fff' }))
  }

  private handleDrag(
    _: Input.Pointer,
    gameObject: GameObjects.Image | GameObjects.Polygon,
    dragX: number,
    dragY: number,
  ) {
    gameObject.x = dragX
    gameObject.y = dragY
  }

  private handlePointerMove(pointer: Input.Pointer) {
    this.scene.coordText.setText(`Pointer X: ${pointer.x}, Pointer Y: ${pointer.y}`)
  }

  private handleDragStart(_: Input.Pointer, gameObject: Resource | Point) {
    gameObject.setAlpha(0.5)
    this.scene.children.bringToTop(gameObject)
    console.log({ children: this.scene.children })
  }

  private handleDragEnter(_: Input.Pointer, __: Resource | Point, dropZone: Tile) {
    dropZone.setFillStyle(0xf5ff)
  }

  private handleDragLeave(_: Input.Pointer, gameObject: Resource | Point, dropZone: Tile) {
    const {
      data: { values },
    } = dropZone

    if (gameObject instanceof Resource) {
      values.resource = undefined
    }
    if (gameObject instanceof Point) {
      values.point = undefined
    }
    gameObject.setData(isInDropZone, false)
    dropZone.setFillStyle(dropZone.getData(colorOrigin))
  }

  private hanldeDrop(_: Input.Pointer, gameObject: Resource | Point, dropZone: Tile) {
    const {
      data: { values },
    } = dropZone

    if (values.resource && values.point) return
    const isAlreadySet =
      (values.resource && gameObject instanceof Resource) || (values.point && gameObject instanceof Point)
    if (isAlreadySet) return
    const isDessert = values?.resource?.data?.values.type === ResourceType.Dessert && gameObject instanceof Point
    if (isDessert) return

    if (gameObject instanceof Resource) {
      values.resource = gameObject
      values?.resource?.setDepth(1)
      values?.point?.setDepth(2)
    }
    if (gameObject instanceof Point) {
      values.point = gameObject
      values?.resource?.setDepth(1)
      values?.point?.setDepth(2)
    }

    gameObject.setData(isInDropZone, true)
    gameObject.x = dropZone.getCenterTile().x
    gameObject.y = dropZone.getCenterTile().y - 3
  }

  private hanldeDragEnd(_: Input.Pointer, gameObject: Resource | Point, __: Tile) {
    gameObject.setAlpha(1)
    console.log('hanldeDragEnd')

    if (gameObject.getData(isInDropZone)) return
    gameObject.setPosition(gameObject.getData(origin)?.x, gameObject.getData(origin)?.y) // Reset position if not in dropzone
  }

  private handleRandomize() {
    // Position the sprite in the center of the drop zone
    console.log({ scene: this.scene.tiles })
    shuffleArray(this.scene.resources)
    this.scene.resources.forEach((resource, i) => {
      resource.setData(isInDropZone, true)
      resource.setDepth(1)

      const dropZone = this.scene.tiles[i]
      const {
        data: { values },
      } = dropZone
      resource.x = dropZone.getCenterTile().x
      resource.y = dropZone.getCenterTile().y - 3
      values.resource = resource
    })
    console.log({ scene: this.scene.tiles })

    const tileCopy = [...this.scene.tiles].filter(
      ({ data: { values } }) => values.resource!.getData(type) !== ResourceType.Dessert,
    )

    shuffleArray(this.scene.points)
    this.scene.points.forEach((point, i) => {
      point.setData(isInDropZone, true)
      point.setDepth(2)

      const dropZone = tileCopy[i]
      const {
        data: { values },
      } = dropZone
      point.x = dropZone.getCenterTile().x
      point.y = dropZone.getCenterTile().y
      values.point = point
    })

    console.log({ scene: this.scene.tiles })
  }
}

export default GameEventManager
