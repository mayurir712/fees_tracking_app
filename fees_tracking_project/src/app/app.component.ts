import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterComponent } from './pages/master/master/master.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MasterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fees_tracking_project';
}
