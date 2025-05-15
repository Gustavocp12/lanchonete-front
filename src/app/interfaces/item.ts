export enum ItemType {
  DRINK = 0,
  INGREDIENTS = 1
}

export enum ItemFlag {
  NOTHING = 0,
  SUGAR = 1,
  ADDITIONAL = 2
}

export interface Item {
  id: number;
  type: ItemType;
  description: string;
  price: number;
  flag: ItemFlag;
}
