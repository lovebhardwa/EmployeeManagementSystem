import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';







@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 
}
