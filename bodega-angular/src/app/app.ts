import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Reportes } from "./reportes/reportes";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Reportes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bodega-angular');
}
