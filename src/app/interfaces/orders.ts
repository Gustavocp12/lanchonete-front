import {Hamburger} from './hamburger';
import {Item} from './item';

export interface Orders {
  id: number;
  date: string;
  description: string;
  name: string;
  address: string;
  phone: string;
  items: Item[];
  additionalItems: Item[];
  hamburguers: Hamburger[];
  observations: string[];
  total: number;
}
