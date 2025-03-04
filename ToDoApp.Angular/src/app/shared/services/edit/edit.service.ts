import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task/task.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

   taskSubject = new BehaviorSubject<Task>({
    title:'',
    description:'',
    createdDate : new Date(),
    editedDate : new Date(),
    isCompleted: false,
    userId : 0,
    id :0,
    priority :0,
    dueDate: new Date(),
    assignUser:'',
    isEditActive : false,
    parentTaskId : 0
  });
   dataObj = this.taskSubject.asObservable();  
  // private dataObs$  = new Subject();

    updateData(task: Task) {
        this.taskSubject.next(task);
    }

    taskUpdated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  }
