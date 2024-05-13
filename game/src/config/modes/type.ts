export enum Resource {
  Wood = 'wood',
  Brick = 'brick',
  Stone = 'stone',
  Wheat = 'wheat',
  Sheep = 'sheep',
  Dessert = 'dessert',
  Ocean = 'ocean',
}

export type PointSetup = {
  [key: number]: {
    amount: number
    position: {
      x: number
      y: number
    }
  }
}

export type ResourceSetup = {
  [key in Resource]: {
    amount: number
    position: {
      x: number
      y: number
    }
  }
}

export type Layout = number[][][]

export type Setup = {
  resources: ResourceSetup
  points: PointSetup
  layout: Layout
}
