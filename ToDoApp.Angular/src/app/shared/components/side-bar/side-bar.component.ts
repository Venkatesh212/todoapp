
import { Component, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task';
import { CommonModule, formatNumber } from '@angular/common';
import { EditService } from '../../services/edit/edit.service';
import { CookieService } from '../../services/cookie/cookie.service';
import { User, UserData } from '../../../models/user';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Output() presentPage = new EventEmitter<string>();
  taskForm: FormGroup;

 task!: Task;
  ngOnInit(){
    const currentUrl = this.router.url;
    if (currentUrl.includes('/main/completed')) {
      this.isSelected = 'Completed';
    } 
    else if (currentUrl.includes('/main/active')) {
      this.isSelected = 'Active';
    } 
    else {
      this.isSelected = "Dashboard";
    }
    this.getUsers();
    this.getData();
    this.notificationTime();
  }

  constructor(private router : Router,private formBuilder: FormBuilder,private taskServices: TaskService,private editService: EditService,private cookieService: CookieService){
      this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate :[new Date(),Validators.required],
      priority:[0,Validators.required],
      assignUser:['',Validators.required],
      parentTaskId : [0]
    });
    editService.dataObj.subscribe(task=>{
      this.task = task;
      if(task.id != 0){
        this.isUpdateActive = 1;
        this.isModelDisplay  = true;
        this.taskForm.setValue({
          title: task.title,
          description : task.description,
          dueDate : task.dueDate,
          priority : task.priority,
          assignUser : task.assignUser,
          parentTaskId : task.parentTaskId
        })
      }
    });
  }

  getUsers(){
    this.taskServices.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
  isSelected : string = "Dashboard";
  isModelDisplay = false;
  isUpdateActive = 0;
  users!: UserData[];
  onActive(){
    this.isSelected = 'Active';
    this.presentPage.emit('Active');
    this.router.navigate(['main/active']);
  }
  onCompleted(){
    this.isSelected = 'Completed';
    this.presentPage.emit('Completed');
    this.router.navigate(['main/completed']);
  }
  onDashboard(){
    this.isSelected = 'Dashboard';
    this.presentPage.emit('Dashboard');
    this.router.navigate(['main/dashboard']);
  }
  onCancel(){
    this.isUpdateActive = 0;
    this.isModelDisplay = false;
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate :[new Date(),Validators.required],
      priority :[0,Validators.required],
      assignUser:['',Validators.required],
      parentTaskId : [0]
    });
  }
  onShowModal(){
    this.isModelDisplay = true;
  }
  onSubmit(){
    if(this.taskForm.valid){
      this.taskServices.postData(this.taskForm.value).subscribe(
        (data: Task)=>{
        },
      )
      this.taskForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate :[new Date(),Validators.required],
        priority :[0,Validators.required],
        assignUser:['',Validators.required],
        parentTaskId : [0]
      });
      this.isModelDisplay = false;
      this.editService.taskUpdated.next(true);
    }
    else {
      this.taskForm.markAllAsTouched();
    }
  }
  onEditSubmit(){
    if(this.taskForm.valid){
      this.task.title=this.taskForm.value.title;
      this.task.description = this.taskForm.value.description;
      this.task.dueDate = new Date(this.taskForm.value.dueDate);
      this.task.priority = Number(this.taskForm.value.priority);
      this.task.assignUser = this.taskForm.value.assignUser;
      this.task.parentTaskId = (this.taskForm.value.parentTaskId);
      this.taskServices.putData(this.task.id,this.task).subscribe();
      this.isUpdateActive = 0;
      this.isModelDisplay = false;
      this.taskForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate :[new Date(),Validators.required],
        priority :[0,Validators.required],
        assignUser:['',Validators.required],
        parentTaskId : [0]

      });
      this.editService.taskUpdated.next(true);
    }
  }
  signOut(){
     this.cookieService.remove('token');
     this.cookieService.remove('userName');
     this.router.navigate(['/sign-in']);
  }
  onSelectChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'dashboard') {
      this.onDashboard();
    } else if (selectedValue === 'active') {
      this.onActive();
    } else if (selectedValue === 'completed') {
      this.onCompleted();
    }
  }
  public tasks: Task[] = [];
  public getData() {
    this.taskServices.getAllTasks().subscribe(data => {
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
