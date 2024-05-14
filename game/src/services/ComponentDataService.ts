import Resource from '../components/resource'
import Point from '../components/point'
import Tile from '../components/tile'

export class ComoponentDataService<T> {
  component: Point | Resource | Tile

  constructor(component: Point | Resource | Tile) {
    this.component = component
  }

  setDataTyped(state: T) {
    this.component.setData(state)
    return this
  }

  setDataByKey<K extends keyof T>(key: K, value: T[K]): this {
    this.component.setData(key as string, value)
    return this
  }

  getDataTyped<K extends keyof T>(key: K) {
    return this.component.getData(key as string) as T[K]
  }
}
