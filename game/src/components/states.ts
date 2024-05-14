import Point from './point'
import Resource from './resource'
import Tile from './tile'
import { Resource as ResourceType } from '../config/modes/type'

export interface TileState {
  colorOrigin: number
  resource?: Resource
  point?: Point
}

export interface DragableComponentState {
  tile?: Tile
  isInDropZone: boolean
  origin: { x: number; y: number }
  type?: ResourceType
}
