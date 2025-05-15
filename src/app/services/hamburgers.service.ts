import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hamburger} from '../interfaces/hamburger';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HamburgersService {

  constructor(private http: HttpClient) { }

  public registerHamburger(hamburger: Hamburger) {
    return this.http.post<Hamburger>(environment.api + 'hamburger', hamburger);
  }

  public findById(id: number) {
    return this.http.get<Hamburger>(environment.api + 'hamburger/' + id);
  }

  public findAll() {
    return this.http.get<Hamburger[]>(environment.api + 'hamburger');
  }
}
