import { GameObjects, Input } from 'phaser'
import { Game } from '../scenes/Game'
import { Resource as ResourceType } from '../config/modes/type'
import { shuffleArray } from '../utils/object-utils'
import Tile from '../components/tile'
import Resource from '../components/resource'
import Point from '../components/point'

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
    if (gameObject.dataService.getDataTyped('isInDropZone')) {
    }
  }

  private handleDragEnter(_: Input.Pointer, gameObject: Resource | Point, dropZone: Tile) {
    dropZone.setFillStyle(0xf5ff)
    // gameObject.dataService.setDataByKey('tile', dropZone)
  }

  private handleDragLeave(_: Input.Pointer, gameObject: Resource | Point, dropZone: Tile) {
    // gameObject.dataService.setDataByKey('tile', undefined)
    dropZone.setFillStyle(dropZone.dataService.getDataTyped('colorOrigin'))
    gameObject.dataService.setDataByKey('isInDropZone', false)
  }

  private hanldeDrop(_: Input.Pointer, gameObject: Resource | Point, dropZone: Tile, isRandomizer?: boolean) {
    const resource = dropZone.dataService.getDataTyped('resource')
    // const point = dropZone.dataService.getDataTyped('point')

    const isPointOnDessert = resource?.data?.values.type === ResourceType.Dessert && gameObject instanceof Point
    if (isPointOnDessert) return

    if (gameObject instanceof Resource) {
      if (
        gameObject.dataService.getDataTyped('type') === ResourceType.Dessert &&
        dropZone.dataService.getDataTyped('point')
      ) {
        return
      }
      const oldTile = gameObject.dataService.getDataTyped('tile')
      const targetResource = dropZone.dataService.getDataTyped('resource')
      console.log({ dropZone, oldTile })
      if (oldTile && targetResource) dropZone.dataService.getDataTyped('resource')?.setToDropZone(oldTile)
      if (!oldTile && targetResource) {
        console.log('resource to origin')
        targetResource.setToOrigin()
      }
      gameObject.setToDropZone(dropZone)
    }
    if (gameObject instanceof Point) {
      console.log('set point')
      const oldTile = gameObject.dataService.getDataTyped('tile')
      const targetPoint = dropZone.dataService.getDataTyped('point')
      if (oldTile) dropZone.dataService.getDataTyped('point')?.setToDropZone(oldTile)
      if (!oldTile && targetPoint) targetPoint.setToOrigin()
      gameObject.setToDropZone(dropZone)
    }
  }

  private hanldeDragEnd(_: Input.Pointer, gameObject: Resource | Point, __: Tile) {
    console.log('hanldeDragEnd')

    gameObject.setAlpha(1)

    if (gameObject.dataService.getDataTyped('isInDropZone')) {
      gameObject.setDepth(1)
      return
    }

    console.log('set to origin')

    gameObject.setToOrigin()
  }

  private handleRandomize() {
    shuffleArray(this.scene.resources)
    this.scene.resources.forEach((resource, i) => {
      const dropZone = this.scene.tiles[i]
      resource.setToDropZone(dropZone)
    })

    const tileCopy = [...this.scene.tiles].filter((tile) => {
      const type = tile.dataService.getDataTyped('resource')?.dataService.getDataTyped('type')!
      return type !== ResourceType.Dessert
    })

    shuffleArray(this.scene.points)
    this.scene.points.forEach((point, i) => {
      console.log('random point')
      const dropZone = tileCopy[i]
      point.setToDropZone(dropZone)
    })
  }
}

export default GameEventManager
