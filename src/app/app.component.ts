import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotFoundComponent } from "./views/not-found/not-found.component";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(){
    console.log(environment) //$ ng s --configuration=development ou $ ng s --configuration=production
  }

}
