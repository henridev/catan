import basic from './basic'

enum GameMode {
  BASIC = 'BASIC',
  BASIC_EXPANSION = 'BASIC EXPANSION',
}

export const Modes = {
  [GameMode.BASIC]: basic,
}

export default GameMode
