import basic from './basic'
import GameMode from './mode'
import { Setup } from './type'

type Modes = {
  [key in GameMode]: Setup
}

export const setups: Modes = {
  [GameMode.BASIC]: basic,
  [GameMode.BASIC_EXPANSION]: basic,
}
