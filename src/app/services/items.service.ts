import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Item} from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  public registerItem(item: Item) {
    return this.http.post<Item>(environment.api + 'items', item);
  }

  public findById(id: number) {
    return this.http.get<Item>(environment.api + 'items/' + id);
  }

  public findAll() {
    return this.http.get<Item[]>(environment.api + 'items');
  }

  public findByDescription(description: string) {
    return this.http.get<Item[]>(environment.api + 'items/description/' + description);
  }

  public findByType(type: number) {
    return this.http.get<Item[]>(environment.api + 'items/type/' + type);
  }

  public findByFlagAndType(flag: number, type: number) {
    return this.http.get<Item[]>(environment.api + 'items/flagAndType/' + flag + '/' + type);
  }

  public findByDescriptionOrId(descriptionOrId: string) {
    return this.http.get<Item[]>(environment.api + 'items/descriptionOrId/' + descriptionOrId);
  }

}
