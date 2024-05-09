import { Scene } from 'phaser'
import { HexagonStateKey } from '../state'
const { objects, colorOrigin } = HexagonStateKey

class Hexagon {
  scene: Scene

  constructor(scene: Scene) {
    this.scene = scene
  }

  public draw(centerX: number, centerY: number, radius: number) {
    const points = Hexagon.getPoints(centerX, centerY, radius)
    let color = new Phaser.Display.Color()
    color.random(50)

    // the points you provide are relative to the origin of the polygon,
    //not the scene. This means if you specify the origin at (0, 0), the polygon will draw starting from (0, 0) and extend to the coordinates defined in your points array.
    const dropZone = this.scene.add
      .polygon(0, 0, points)
      .setOrigin(0, 0)
      .setFillStyle(color.color)
      .setData(colorOrigin, color.color)

      .setInteractive(new Phaser.Geom.Polygon(points), Phaser.Geom.Polygon.Contains, true)
    dropZone.setData(objects, [])
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

export default Hexagon
