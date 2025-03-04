import { Component, Input } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task';
import { EditService } from '../../services/edit/edit.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() isActive :boolean = false;
  @Input() tasks :Task[] = [];
  isChecked= new Map<number,boolean>();
  constructor(private taskService : TaskService, private editService : EditService ){
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
  public getData(){
    this.taskService.getAllTasks().subscribe(data => {
      if(this.isActive == true)
      {
        this.tasks = data.filter(e=> e.isCompleted == false);
      }
      if(this.isActive == false)
      {
        this.tasks = data.filter(e=> e.isCompleted == true);
        this.checkAllCheckBoxes();
      }
    });
  }
  checkAllCheckBoxes(){
    for(let task of this.tasks){
      this.isChecked.set(task.id,true);
    }
  }


  presentToggleId=0;
  isShowTasks = new Map<number, boolean>;
  toggleDisplay(id: number){
    if(this.presentToggleId == 0) {
      this.presentToggleId = id;
      this.isShowTasks.set(id,true);
    }
    else if(this.presentToggleId ==  id){
      if(this.isShowTasks.get(id)== true){
        this.isShowTasks.set(id,false);
      }
      else{
        this.isShowTasks.set(id,true);
      }
    }
    else{
      this.isShowTasks.set(this.presentToggleId,false);
      this.presentToggleId = id;
      this.isShowTasks.set(id,true);
    }
  }

  presentCheckBoxId=0;
  selectCheckBox(id: number){
    if(this.isActive == true){
      if(this.presentCheckBoxId == 0) {
        this.presentCheckBoxId = id;
        this.isChecked.set(id,false);
      }
      else if(this.presentCheckBoxId ==  id){
        if(this.isChecked.get(id)== false){
          this.isChecked.set(id,true);
        }
        else{
          this.isChecked.set(id,false);
        }
      }
      else{
        this.isChecked.set(this.presentCheckBoxId,true);
        this.presentCheckBoxId = id;
        this.isChecked.set(id,false);
      }
    }
    else{
      if(this.presentCheckBoxId == 0) {
        this.presentCheckBoxId = id;
        this.isChecked.set(id,true);
      }
      else if(this.presentCheckBoxId ==  id){
        if(this.isChecked.get(id)== true){
          this.isChecked.set(id,false);
        }
        else{
          this.isChecked.set(id,true);
        }
      }
      else{
        this.isChecked.set(this.presentCheckBoxId,false);
        this.presentCheckBoxId = id;
        this.isChecked.set(id,true);
      }
    }
  }

  markAsCompletedOrActive(task: Task): void {
    if(this.isActive == true){
      task.isCompleted = true;
    }
    else{
      task.isCompleted = false;
    }
    this.taskService.putData(task.id, task).subscribe({
      next : (data:string) => {
        this.getData();
      }
    });
  }
  deleteTask(id : number){
    this.taskService.deleteData(id).subscribe(data=>{
      this.getData();
    });
  }

  editTask(task:Task){
    this.editService.updateData(task);
  }
  getRelativeDate(date: Date){
    var pastDate = new Date(date);
    var currentDate = new Date();
  
    var diffInSeconds = Math.floor((currentDate.getTime()-pastDate.getTime())/1000);
    var diffInMinutes = Math.floor(diffInSeconds/60);
    var diffInHours = Math.floor(diffInMinutes/60);
    var diffInDays = Math.floor(diffInHours/24);
  
    if(diffInDays > 0){
      return `${diffInDays} day${diffInDays>1 ?'s':''} ago`;
    }
    else if(diffInHours > 0){
      return `${diffInHours} hour${diffInHours>1 ?'s':''} ago`;
    }
    else if(diffInMinutes > 0){
      return `${diffInMinutes} minute${diffInMinutes >1 ?'s':''} ago`;
    }
    return `${diffInSeconds} second${diffInSeconds>1 ?'s':''} ago`;
  }
  getEndDate(date: Date){
    var dueDate = new Date(date);
    var currentDate = new Date();
    if(dueDate < currentDate){
      return 'DueDate is already completed';
    }
    var diffInSeconds = Math.floor((dueDate.getTime()-currentDate.getTime())/1000);
    var diffInMinutes = Math.floor(diffInSeconds/60);
    var diffInHours = Math.floor(diffInMinutes/60);
    var diffInDays = Math.floor(diffInHours/24);
  
    if(diffInDays > 0){
      return `More ${diffInDays} day${diffInDays>1 ?'s':''} left to complete`;
    }
    else if(diffInHours > 0){
      return `More ${diffInHours} hour${diffInHours>1 ?'s':''} left to complete`;
    }
    else if(diffInMinutes > 0){
      return `More ${diffInMinutes} minute${diffInMinutes >1 ?'s':''} left to complete`;
    }
    return `More ${diffInSeconds} second${diffInSeconds>1 ?'s':''} left to complete`;
  }
  taskPriority(priority : number){
    if(priority == 0 ){
      return "Low";
    }
    else if(priority == 1 ){
      return "Medium";
    }
    return "High";
  }
  getSubTasks( id : number){
    var subTasks : string[]=[];
    for(var task of this.tasks){
      if ( task.id == id  ){
        continue;
      }
      if( task.parentTaskId == id ){
        subTasks.push(task.title);
      }

    }
    return subTasks.toString();
  }
  

}
