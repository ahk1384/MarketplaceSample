import { Component } from '@angular/core';

@Component({
  selector: 'app-item-section',
  standalone: true,
  imports: [],
  templateUrl: './item-section.component.html',
  styleUrl: './item-section.component.css'
})
export class ItemSectionComponent {
  name = 'Amir';
  age = 20;
  changeName() {
    this.name = "Ali";
  }
}
