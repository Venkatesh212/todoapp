import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../../shared/components/task/task.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [CommonModule,TaskComponent,FilterComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {
  day = new Date();
  @Input() tasks :Task[] = [];

  constructor(private taskService : TaskService){
    this.getData();
  }
  getData(){
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data.filter(e=> e.isCompleted == false );
    });
  }

  applyFilters(tasks : Task[])
  {
    this.tasks = tasks;
  }
  resetFilters(tasks:Task[]){
    this.tasks = tasks;
  }
  sortFilter(tasks : Task[]){
    this.tasks = tasks;
  }
}
