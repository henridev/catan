export enum Resource {
  Wood = 'wood',
  Brick = 'brick',
  Stone = 'stone',
  Wheat = 'wheat',
  Sheep = 'sheep',
  Dessert = 'dessert',
}

export type Setup = {
  [key in Resource]: {
    amount: number
    position: {
      x: number
      y: number
    }
  }
}
