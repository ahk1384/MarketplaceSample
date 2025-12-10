import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemSectionComponent } from './components/item-section/item-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
