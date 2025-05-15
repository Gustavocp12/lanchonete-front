import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Hamburger} from '../../interfaces/hamburger';
import {Item, ItemFlag, ItemType} from '../../interfaces/item';
import {Orders} from '../../interfaces/orders';
import {MaterialModule} from '../../modules/material.module';
import {OrdersService} from '../../services/orders.service';
import {HamburgersService} from '../../services/hamburgers.service';
import {ItemsService} from '../../services/items.service';

@Component({
  selector: 'app-orders',
  imports: [
    NgForOf,
    CurrencyPipe,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orderForm!: FormGroup;
  hamburguerIds: Hamburger[] = [];
  itemIds: Item[] = [];
  additionalItemIds: Item[] = [];
  total = 0;

  constructor(private fb: FormBuilder, private service: OrdersService, private serviceHamburgers: HamburgersService, private serviceItems: ItemsService) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      description: [''],
      date: new Date().toISOString(),
      name: [''],
      address: [''],
      phone: [''],
      hamburguerIds: [[]],
      itemIds: [[]],
      additionalItemIds: [[]],
      observations: ['']
    });

    this.orderForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

    this.initFields();
  }

  initFields(){
    this.serviceItems.findByFlagAndType(2, 1).subscribe( data =>{
        this.additionalItemIds = data;
      }
    );

    this.serviceHamburgers.findAll().subscribe( data =>{
        this.hamburguerIds = data;
      });

    this.serviceItems.findByType(0).subscribe( data =>{
        this.itemIds = data;
    });
  }

  calculateTotal() {
    const hamburgers = this.orderForm.value.hamburguerIds ?? [];
    const drinks = this.orderForm.value.itemIds ?? [];
    const additionalItems = this.orderForm.value.additionalItemIds ?? [];

    const getItemPrice = (id: number, itemList: any[]) => {
      const item = itemList.find(i => i.id === id);
      return item ? item.price : 0;
    };

    const total = [
      ...hamburgers,
      ...drinks,
      ...additionalItems
    ]
      .reduce((sum, id) => {
        return sum + getItemPrice(id, [...this.hamburguerIds, ...this.itemIds, ...this.additionalItemIds]);
      }, 0);

    this.total = total;
  }


  submitOrder() {
    const formValue = this.orderForm.value;

    const payload: Orders = {
      ...formValue,
      observations: this.transformObservations(formValue.observations)
    };

    this.service.registerOrder(payload).subscribe(() => {
      this.orderForm.reset({
        description: '',
        date: new Date().toISOString(),
        name: '',
        address: '',
        phone: '',
        hamburguerIds: [],
        itemIds: [],
        additionalItemIds: [],
        observations: ''
      });
      this.initFields();
    });
  }

  private transformObservations(input: string | string[]): string[] {
    if (Array.isArray(input)) return input;
    if (!input) return [];
    return input
      .split('\n')
      .map(obs => obs.trim())
      .filter(obs => obs.length > 0);
  }
}
