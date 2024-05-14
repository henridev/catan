import { GameObjects } from 'phaser'
import { ComoponentDataService } from '../services/ComponentDataService'
import { TileState } from './states'
import Resource from './resource'
import Point from './point'

class Tile extends GameObjects.Polygon {
  dataService: ComoponentDataService<TileState> = new ComoponentDataService(this)

  constructor(scene: Phaser.Scene, x: number, y: number, radius: number, fillColor?: number, fillAlpha?: number) {
    const points = Tile.getPoints(x, y, radius)
    const color = new Phaser.Display.Color()
    color.random(50)

    super(scene, 0, 0, points, fillColor ?? color.color, fillAlpha)

    this.setOrigin(0, 0).setInteractive(new Phaser.Geom.Polygon(points), Phaser.Geom.Polygon.Contains, true)
    this.dataService.setDataTyped({ colorOrigin: color.color, resource: undefined, point: undefined })

    scene.add.existing(this)
  }

  public getCenterTile() {
    const xs = this.pathData.filter((_, i) => (i & 1) === 0)
    const x = (Math.max(...xs) + Math.min(...xs)) / 2
    const ys = this.pathData.filter((_, i) => (i & 1) !== 0)
    const y = (Math.max(...ys) + Math.min(...ys)) / 2
    return { x, y }
  }

  public inBounds(object: Resource | Point) {
    return Phaser.Geom.Polygon.ContainsPoint(
      new Phaser.Geom.Polygon(this.pathData),
      new Phaser.Geom.Point(object.x, object.y),
    )
  }

  private static getPoints(x: number, y: number, radius: number) {
    let points = []
    for (let i = 0; i < 6; i++) {
      const degrees = 60 * i - 30 // move from -30, 30, 90, 150, 210, 270
      let angle = Phaser.Math.DegToRad(degrees)
      points.push({
        x: x + radius * Math.cos(angle), // adjacent side / hypotenuse scale 1
        y: y + radius * Math.sin(angle), // opposite side / hypotenuse scale 1
      })
    }
    // console.log({ points })
    return points
  }
}

export default Tile
