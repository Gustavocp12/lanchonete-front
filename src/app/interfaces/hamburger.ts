import {Item} from './item';


export interface Hamburger {
  id: number;
  description: string;
  price: number;
  items: Item[];
}
