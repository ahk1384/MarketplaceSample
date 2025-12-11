import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Item } from "../../models/item.model";
import { Router } from "@angular/router";
import { ActiveUserService } from '../user-section/service/active-user/active-user.service';
import { UserService } from "../../services/user.service";

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
  constructor(
    private activeUserService: ActiveUserService,
    private router: Router,
    private user: UserService
  ) {}

  public getName(): string | null {
    const user = this.activeUserService.currentUser;
    return user ? user.name : null;
  }

  public getCredit(): number | null {
    const user = this.activeUserService.currentUser;
    if (user) {
      return user.credit ?? null;
    }
    return null;
  }

  public logout(): void {
    this.activeUserService.clearUser();
    this.router.navigate(['/login']);
  }

  public userPage(): void {
    this.router.navigate(['/user']);
  }

  items: Item[] = [
    { id: '1', name: 'Item One', price: 29.99 },
    { id: '2', name: 'Item Two', price: 49.99 },
    { id: '3', name: 'Item Three', price: 19.99 }
  ];

  result: string = '';

  public BuyItem(item: Item): void {
    const currentUser = this.activeUserService.currentUser;

    if (!currentUser) {
      this.result = 'No user logged in.';
      return;
    }

    if (typeof currentUser.credit !== 'number' || currentUser.credit < item.price) {
      this.result = 'Insufficient credit.';
      return;
    }

    currentUser.credit = Math.round((currentUser.credit - item.price) * 100) / 100;

    this.activeUserService.setUser(currentUser);

    this.user.updateUserCredit(currentUser.id, currentUser.credit);

    this.RemoveItem(item);
    this.result = `Purchased: ${item.name} for $${item.price}. Remaining credit: $${currentUser.credit}`;
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

  public AddItem(name: string, price: number): void {
    if (!name || price <= 0) {
      this.result = 'Invalid item name or price.';
      return;
    }
    const newItem: Item = {
      id: (this.items.length + 1).toString(),
      name: name,
      price: price
    };
    this.items.push(newItem);
    this.result = `Added: ${newItem.name} for $${newItem.price}`;
  }
}
