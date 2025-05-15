import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Item, ItemFlag, ItemType} from '../../interfaces/item';
import {MaterialModule} from '../../modules/material.module';
import {ItemsService} from '../../services/items.service';

@Component({
  selector: 'app-items',
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit{
  itemForm!: FormGroup;
  items: Item[] = [];

  ItemType = ItemType;
  ItemFlag = ItemFlag;
  filteredItems: Item[] = [];

  constructor(private fb: FormBuilder, private service: ItemsService) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      type: [ItemType.DRINK],
      description: [''],
      price: [null],
      flag: [ItemFlag.NOTHING]
    });

    this.initTable();
  }

  initTable(){
    this.service.findAll().subscribe(data => {
      this.items = data;
      this.filteredItems = this.items;
    })
  }

  saveItem() {
    const newItem = this.itemForm.value;

    if (newItem.price === null) {
      newItem.price = 0;
    }

    this.service.registerItem(newItem).subscribe( () => {
      this.itemForm.reset({ type: ItemType.DRINK, flag: ItemFlag.NOTHING });
      this.initTable();
    });
  }

  translateItemType(type: ItemType | string): string {
    if (type === 0 || type === 'DRINK') return 'Bebida';
    if (type === 1 || type === 'INGREDIENTS') return 'Ingrediente';
    return 'Desconhecido';
  }

  translateItemFlag(flag: ItemFlag | string): string {
    if (flag === 0 || flag === 'NOTHING') return 'Nada';
    if (flag === 1 || flag === 'SUGAR') return 'Com Açúcar';
    if (flag === 2 || flag === 'ADDITIONAL') return 'Adicional';
    return 'Desconhecido';
  }



  filter(search: string | null) {
    if (search)
    this.service.findByDescriptionOrId(search).subscribe(data => {
      this.filteredItems = data;
    });

    if (search === null || search === '') {
      this.filteredItems = this.items;
    }
  }
}
