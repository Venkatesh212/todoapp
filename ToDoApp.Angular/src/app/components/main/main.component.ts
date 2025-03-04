import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { ActiveComponent } from '../active/active.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoadingComponent } from '../../shared/components/loading/loading/loading.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DashboardComponent,RouterOutlet,SideBarComponent,AppHeaderComponent,ActiveComponent,LoadingComponent,FilterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor( private router: Router) { }

  ngOnInit() {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/main/completed')) {
      this.presentPage = 'Completed';
    } else if (currentUrl.includes('/main/active')) {
      this.presentPage = 'Active';
    } else {
      this.presentPage = 'Dashboard';
    }
  }
  presentPage : string = "";
  currentPage(name:string){
    this.presentPage = name;
  }

}
