import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductFormComponent } from "../components/product-form/product-form.component";
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  ReactiveFormsModule, ProductFormComponent,
     ProductListComponent,ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'all-assignment';
}
