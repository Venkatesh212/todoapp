import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie/cookie.service';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  @Input() presentPage: string = "";
  constructor(private router: Router, private cookieService: CookieService, private taskService: TaskService) {

  }
  ngOnInit() {
    this.getData();
    this.notificationTime();
  }
  private tasks: Task[] = [];
   tasksEndingSoon: Task[] = [];
  signOut() {
    this.cookieService.remove('token');
    this.cookieService.remove('userName');
    this.router.navigate(['/sign-in']);
  }
  public getData() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data.filter(e => e.isCompleted == false);
      this.notificationTime();
    });
  }

  public notifyTask: string[] = [];
  notificationTime() {
    for (var i of this.tasks) {
      var dueDate = new Date(i.dueDate);
      var currentDate = new Date();
      if (dueDate < currentDate) {
        continue;
      }
      var diffInSeconds = Math.floor((dueDate.getTime() - currentDate.getTime()) / 1000);
      var diffInMinutes = Math.floor(diffInSeconds / 60);
      var diffInHours = Math.floor(diffInMinutes / 60);
      if( diffInMinutes < 30){
        var s = i.title + ' is about to end in ' + diffInMinutes +' minutes';
        this.notifyTask.push(s)
      }
      else if( diffInHours < 4){
        var minutes = diffInMinutes%60;
        var s = i.title + ' is about to end in ' + diffInHours +' hours '+ minutes+ ' minutes  ';
        this.notifyTask.push(s)
      }
      else if( diffInHours <= 10 && diffInHours >= 4){
        var minutes = diffInMinutes%60;
        var s = i.title + ' is about to end in ' + diffInHours +' hours  ' + minutes+ ' minutes  ';
        this.notifyTask.push(s)
      }
    }
  } 
}