import { Component, Input} from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { CommonModule } from '@angular/common';
import { EditService } from '../../shared/services/edit/edit.service';
import { TaskComponent } from '../../shared/components/task/task.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [CommonModule,TaskComponent,FilterComponent],
  templateUrl: './active.component.html',
  styleUrl: './active.component.css'
})
export class ActiveComponent  {
  day = new Date();
  @Input() tasks :Task[] = [];

  constructor(private taskService : TaskService,private editService : EditService){
    this.getData();
  }

  ngOnInit(): void {
    this.editService.taskUpdated.subscribe({
     next: () => {
       this.getData();
     }
    });
    this.editService.taskUpdated.next(false);
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
