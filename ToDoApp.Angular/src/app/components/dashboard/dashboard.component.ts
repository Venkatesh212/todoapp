import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { CookieService } from '../../shared/services/cookie/cookie.service';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { EditService } from '../../shared/services/edit/edit.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() tasks: Task[] = [];
  activePercentage: number = 0;
  completedPercentage: number = 0;
  userName: string;
  day = new Date();
  isDeleteActive = false;
  constructor(private taskService: TaskService, private cookieService: CookieService, private editService: EditService) {
    this.getData();
    this.userName = cookieService.get('userName');
  }
  ngOnInit(): void {
    this.editService.taskUpdated.subscribe({
      next: () => {
        this.getData();
      }
    });
  }
  public getData() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
      this.completedPercentage = (this.tasks.filter(e => e.isCompleted == true).length) / (this.tasks.length) * 100;
      this.activePercentage = 100 - this.completedPercentage;
    });
  }
  public deleteAllTasks() {
    for (let task of this.tasks) {
      this.taskService.deleteData(task.id).subscribe(data => { this.getData(); });
    }
    this.isDeleteActive = false;
  }
  public deleteTasks() {
    this.isDeleteActive = true;
  }
  public cancelDeleteTasks() {
    this.isDeleteActive = false;
  }
  markAsCompleted(task: Task): void {
    task.isCompleted = true;
    this.taskService.putData(task.id, task).subscribe(() => {
      this.getData();
    });
  }
  markAsActive(task: Task): void {
    task.isCompleted = false;
    this.taskService.putData(task.id, task).subscribe(() => {
      this.getData();
    });
  }
  applyFilters(tasks: Task[]) {
    this.tasks = tasks;
  }
  resetFilters(tasks: Task[]) {
    this.tasks = tasks;
  }
  sortFilter(tasks: Task[]) {
    this.tasks = tasks;
  }
}
