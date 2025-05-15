import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Orders} from '../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public registerOrder(order: Orders) {
    return this.http.post<Orders>(environment.api + 'orders', order);
  }

}
