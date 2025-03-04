import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { AppHeaderComponent } from './shared/components/app-header/app-header.component';
import { ActiveComponent } from './components/active/active.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompletedComponent } from './components/completed/completed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent,RouterOutlet,AppHeaderComponent,SideBarComponent,SignInComponent,SignUpComponent,ActiveComponent,CompletedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
}
