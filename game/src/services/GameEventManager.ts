import { GameObjects, Input } from 'phaser'
import { Game } from '../scenes/Game'
import { HexagonStateKey, DragableComponentStateKey } from '../state'
const { objects, colorOrigin } = HexagonStateKey
const { isInDropZone, type, origin } = DragableComponentStateKey

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
  }

  handleDrag(_: Input.Pointer, gameObject: GameObjects.Image | GameObjects.Polygon, dragX: number, dragY: number) {
    gameObject.x = dragX
    gameObject.y = dragY
  }

  handlePointerMove(pointer: Input.Pointer) {
    this.scene.coordText.setText(`Pointer X: ${pointer.x}, Pointer Y: ${pointer.y}`)
  }

  handleDragStart(_: Input.Pointer, gameObject: GameObjects.Image) {
    gameObject.setAlpha(0.5)
    this.scene.children.bringToTop(gameObject)
    console.log({ children: this.scene.children })
  }

  handleDragEnter(_: Input.Pointer, __: GameObjects.Image, dropZone: GameObjects.Polygon) {
    dropZone.setFillStyle(0xf5ff)
  }

  handleDragLeave(_: Input.Pointer, gameObject: GameObjects.Image, dropZone: GameObjects.Polygon) {
    console.log('dragleave')
    const index = dropZone.getData(objects).indexOf(gameObject)
    if (index > -1) dropZone.getData(objects).splice(index, 1)
    gameObject.setData(isInDropZone, false)
    dropZone.setFillStyle(dropZone.getData(colorOrigin))
  }

  hanldeDrop(_: Input.Pointer, gameObject: GameObjects.Image, dropZone: GameObjects.Polygon) {
    console.log('hanldeDrop')

    const hasPointsAndResource = dropZone.getData(objects).length >= 2
    if (hasPointsAndResource) return

    const isMissingPointOrResource = dropZone.getData(objects).length === 1
    const isSameType = dropZone.getData(objects)?.[0]?.getData(type) === gameObject.getData(type)
    if (isMissingPointOrResource && isSameType) return

    dropZone.getData(objects).push(gameObject) // Add to dropzone
    gameObject.setData(isInDropZone, true)
    const xs = dropZone.pathData.filter((_, i) => (i & 1) === 0)
    const x = (Math.max(...xs) + Math.min(...xs)) / 2
    const ys = dropZone.pathData.filter((_, i) => (i & 1) !== 0)
    const y = (Math.max(...ys) + Math.min(...ys)) / 2
    gameObject.x = x
    gameObject.y = y + 4
  }

  hanldeDragEnd(_: Input.Pointer, gameObject: GameObjects.Image, __: GameObjects.Polygon) {
    gameObject.setAlpha(1)
    console.log('hanldeDragEnd')

    if (gameObject.getData(isInDropZone)) return
    console.log({ gameObject, origin: gameObject.getData(origin), isinDropzone: gameObject.getData(isInDropZone) })
    gameObject.setPosition(gameObject.getData(origin)?.x, gameObject.getData(origin)?.y) // Reset position if not in dropzone
  }
}

export default GameEventManager
