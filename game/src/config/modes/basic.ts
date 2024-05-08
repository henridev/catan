import { Setup } from './type'

const basic: Setup = {
  wood: {
    amount: 4,
    position: {
      x: 100,
      y: 100,
    },
  },
  brick: {
    amount: 3,
    position: {
      x: 100,
      y: 200,
    },
  },
  stone: {
    amount: 3,
    position: {
      x: 100,
      y: 300,
    },
  },
  sheep: {
    amount: 4,
    position: {
      x: 100,
      y: 400,
    },
  },
  wheat: {
    amount: 4,
    position: {
      x: 100,
      y: 500,
    },
  },
  dessert: {
    amount: 1,
    position: {
      x: 100,
      y: 600,
    },
  },
}

export const basicPoint = {
  2: { amount: 1, position: { x: 900, y: 100 } },
  3: { amount: 2, position: { x: 900, y: 150 } },
  4: { amount: 2, position: { x: 900, y: 200 } },
  5: { amount: 2, position: { x: 900, y: 250 } },
  6: { amount: 2, position: { x: 900, y: 300 } },
  8: { amount: 2, position: { x: 900, y: 350 } },
  9: { amount: 2, position: { x: 900, y: 400 } },
  10: { amount: 2, position: { x: 900, y: 450 } },
  11: { amount: 2, position: { x: 900, y: 500 } },
  12: { amount: 1, position: { x: 900, y: 550 } },
}

export default basic
