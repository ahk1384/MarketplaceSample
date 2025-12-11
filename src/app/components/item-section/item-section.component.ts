import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Item } from "../../models/item.model";
import { Router } from "@angular/router";
import { ActiveUserService } from '../user-section/service/active-user/active-user.service';

@Component({
  selector: 'app-item-section',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './item-section.component.html',
  styleUrl: './item-section.component.css'
})
export class ItemSectionComponent {
  constructor(private activeUserService: ActiveUserService, private router: Router) {}

  public logout(): void {
    this.activeUserService.clearUser();
    this.router.navigate(['/login']);
  }
  public userPage() : void{
    this.router.navigate(['/user']);
  }
  items: Item[] = [
    { id: '1', name: 'Item One', price: 29.99 },
    { id: '2', name: 'Item Two', price: 49.99 },
    { id: '3', name: 'Item Three', price: 19.99 }
  ];
  result: string = '';
  public BuyItem(item: Item): void {
    if (this.items.includes(item)) {
      this.RemoveItem(item);
      console.log(`Purchased: ${item.name} for $${item.price}`);
      this.result = `Purchased: ${item.name} for $${item.price}`;
    } else {
      this.result = 'Item not found in the list.';
    }
  }

  public RemoveItem(item: Item): void {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.result = `Removed: ${item.name}`;
    } else {
      this.result = 'Item not found.';
    }
  }
  public AddItem(name:string,price :number ,): void {
    const newItem: Item = {
      id: (this.items.length + 1).toString(),
      name: name,
      price: price
    };
    this.items.push(newItem);
    this.result = `Added: ${newItem.name} for $${newItem.price}`;
  }
}
