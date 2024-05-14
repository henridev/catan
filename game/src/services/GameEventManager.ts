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
    gameObject.dataService.setDataByKey('origin', { x: gameObject.x, y: gameObject.y })
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

    gameObject.dataService.setDataByKey('isInDropZone', false)
    dropZone.setFillStyle(dropZone.dataService.getDataTyped('colorOrigin'))
  }

  private hanldeDrop(_: Input.Pointer, gameObject: Resource | Point, dropZone: Tile, isRandomizer?: boolean) {
    const resource = dropZone.dataService.getDataTyped('resource')
    const point = dropZone.dataService.getDataTyped('point')

    if (isRandomizer) {
      if (gameObject instanceof Point) {
        dropZone.dataService.setDataByKey('point', gameObject)
        gameObject.dataService.setDataByKey('tile', dropZone)
        gameObject.setDepth(2)
      }
      if (gameObject instanceof Resource) {
        dropZone.dataService.setDataByKey('resource', gameObject)
        gameObject.dataService.setDataByKey('tile', dropZone)
        gameObject.setDepth(1)
      }
      return
    }

    // if (resource && gameObject instanceof Resource) {
    //   const x = resource.x
    //   const y = resource.y
    //   resource.x = gameObject.getData('origin-tile').x
    //   resource.y = gameObject.getData('origin-tile').y
    //   gameObject.x = x
    //   gameObject.y = y
    //   gameObject.setData('origin-tile', { x: gameObject.x, y: gameObject.y })
    //   console.log({ x: resource.x, y: resource.y })
    //   console.log({ x: gameObject.x, y: gameObject.x })
    //   resource.setData('origin-tile', { x: resource.x, y: resource.y })
    //   dropZone.dataService.setDataByKey('resource', gameObject)
    //   gameObject.emit('drop', gameObject, dropZone)
    //   gameObject.setData('isInDropZone', true)
    //   // return
    //   // resource.x = gameObject.x
    //   // resource.y = gameObject.y
    // }

    const isDessert = resource?.data?.values.type === ResourceType.Dessert && gameObject instanceof Point
    if (isDessert) return
    // console.log({ isDessert, isAlreadySet })
    if (gameObject instanceof Resource) {
      dropZone.dataService.setDataByKey('resource', gameObject)
      gameObject.setDepth(1)
      dropZone.dataService.getDataTyped('point')?.setDepth(2)
    }
    if (gameObject instanceof Point) {
      dropZone.dataService.setDataByKey('point', gameObject)
      gameObject.setDepth(2)
      dropZone.dataService.getDataTyped('resource')?.setDepth(1)
    }

    gameObject.dataService.setDataByKey('isInDropZone', true)
    gameObject.x = dropZone.getCenterTile().x
    gameObject.y = dropZone.getCenterTile().y - 3
  }

  private hanldeDragEnd(_: Input.Pointer, gameObject: Resource | Point, __: Tile) {
    gameObject.setAlpha(1)

    if (gameObject.dataService.getDataTyped('isInDropZone')) {
      gameObject.setDepth(1)
      return
    }

    // Reset position if not in dropzone
    const { x, y } = gameObject.dataService.getDataTyped('origin')
    gameObject.setPosition(x, y)
  }

  private handleRandomize() {
    shuffleArray(this.scene.resources)
    this.scene.resources.forEach((resource, i) => {
      const dropZone = this.scene.tiles[i]
      resource.x = dropZone.getCenterTile().x
      resource.y = dropZone.getCenterTile().y - 3
      this.scene.input.emit('drop', '', resource, dropZone, true)
    })

    const tileCopy = [...this.scene.tiles].filter((tile) => {
      const type = tile.dataService.getDataTyped('resource')?.dataService.getDataTyped('type')!
      return type !== ResourceType.Dessert
    })

    shuffleArray(this.scene.points)
    this.scene.points.forEach((point, i) => {
      console.log('random point')
      const dropZone = tileCopy[i]
      point.x = dropZone.getCenterTile().x
      point.y = dropZone.getCenterTile().y
      this.scene.input.emit('drop', '', point, dropZone, true)
    })
  }
}

export default GameEventManager
