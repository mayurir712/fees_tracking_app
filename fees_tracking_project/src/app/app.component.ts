import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterComponent } from './pages/master/master/master.component';
import { LoginComponent } from './pages/master/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MasterComponent, LoginComponent, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fees_tracking_project';
}
