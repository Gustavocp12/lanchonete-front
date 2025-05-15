import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Hamburger} from '../../interfaces/hamburger';
import {Item} from '../../interfaces/item';
import {NgForOf} from '@angular/common';
import {MaterialModule} from '../../modules/material.module';
import {ItemsService} from '../../services/items.service';
import {HamburgersService} from '../../services/hamburgers.service';

@Component({
  selector: 'app-hamburgers',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MaterialModule
  ],
  templateUrl: './hamburgers.component.html',
  styleUrl: './hamburgers.component.css'
})
export class HamburgersComponent implements OnInit{
  hamburgerForm!: FormGroup;
  ingredients: Item[] = [];

  constructor(private fb: FormBuilder, private serviceItems: ItemsService, private service: HamburgersService) {}

  ngOnInit() {
    this.hamburgerForm = this.fb.group({
      description: [''],
      price: [null],
      itemIds: [[]]
    });
    this.initIngredients();
  }

  initIngredients() {
    this.ingredients = [];

    this.serviceItems.findByType(1).subscribe( data =>{
        this.ingredients = data;
      }
    );
  }

  saveBurger() {
    const newBurger: Hamburger = this.hamburgerForm.value;

    if (newBurger.price === null) {
      newBurger.price = 0;
    }

    this.service.registerHamburger(newBurger).subscribe(() => {
      this.hamburgerForm.reset();
      this.initIngredients();
    });
  }
}
