import basic, { basicPoint } from './basic'
import GameMode from './mode'
import { BasicPoint, Setup } from './type'

type Modes = {
  [key in GameMode]: Setup
}

type Point = {
  [key in GameMode]: BasicPoint
}

export const setups: Modes = {
  [GameMode.BASIC]: basic,
  [GameMode.BASIC_EXPANSION]: basic,
}

export const points: Point = {
  [GameMode.BASIC]: basicPoint,
  [GameMode.BASIC_EXPANSION]: basicPoint,
}
