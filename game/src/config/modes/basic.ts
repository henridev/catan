import { HEIGHT, WIDTH } from '../constants'
import { Setup } from './type'

const basic: Setup = {
  resources: {
    ocean: {
      amount: 0,
      position: {
        x: 0,
        y: 0,
      },
    },
    wood: {
      amount: 4,
      position: {
        x: 100,
        y: HEIGHT * 0.1,
      },
    },
    brick: {
      amount: 3,
      position: {
        x: 100,
        y: HEIGHT * 0.23,
      },
    },
    stone: {
      amount: 3,
      position: {
        x: 100,
        y: HEIGHT * 0.36,
      },
    },
    sheep: {
      amount: 4,
      position: {
        x: 100,
        y: HEIGHT * 0.49,
      },
    },
    wheat: {
      amount: 4,
      position: {
        x: 100,
        y: HEIGHT * 0.62,
      },
    },
    dessert: {
      amount: 1,
      position: {
        x: 100,
        y: HEIGHT * 0.75,
      },
    },
  },
  points: {
    2: { amount: 1, position: { x: WIDTH * 0.9, y: HEIGHT * 0.05 } },
    3: { amount: 2, position: { x: WIDTH * 0.9, y: HEIGHT * 0.1 } },
    4: { amount: 2, position: { x: WIDTH * 0.9, y: HEIGHT * 0.15 } },
    5: { amount: 2, position: { x: WIDTH * 0.9, y: HEIGHT * 0.2 } },
    6: { amount: 2, position: { x: WIDTH * 0.9, y: HEIGHT * 0.25 } },
    8: { amount: 2, position: { x: WIDTH * 0.9, y: HEIGHT * 0.3 } },
    9: { amount: 2, position: { x: WIDTH * 0.9, y: HEIGHT * 0.35 } },
    10: { amount: 2, position: { x: WIDTH * 0.9, y: HEIGHT * 0.4 } },
    11: { amount: 2, position: { x: WIDTH * 0.9, y: HEIGHT * 0.45 } },
    12: { amount: 1, position: { x: WIDTH * 0.9, y: HEIGHT * 0.5 } },
  },
  layout: [
    [
      [-1.5, 3, 1],
      [0.5, 3, 1],
      [-0.5, 3, 1],
      [1.5, 3, 1],
    ],
    [
      [-2, 2, 1],
      [-1, 2],
      [0, 2],
      [1, 2],
      [2, 2, 1],
    ],
    [
      [-2.5, 1, 1],
      [-1.5, 1],
      [-0.5, 1],
      [0.5, 1],
      [1.5, 1],
      [2.5, 1, 1],
    ],
    [
      [-3, 0, 1],
      [-2, 0],
      [-1, 0],
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0, 1],
    ],
    [
      [-2.5, -1, 1],
      [-1.5, -1],
      [-0.5, -1],
      [0.5, -1],
      [1.5, -1],
      [2.5, -1, 1],
    ],
    [
      [-2, -2, 1],
      [-1, -2],
      [0, -2],
      [1, -2],
      [2, -2, 1],
    ],
    [
      [-1.5, -3, 1],
      [0.5, -3, 1],
      [-0.5, -3, 1],
      [1.5, -3, 1],
    ],
  ],
}

export default basic
