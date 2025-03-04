import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() filtersReset = new EventEmitter<Task[]>();
  @Output() filtersApplied = new EventEmitter<Task[]>();
  @Output() sortFilters = new EventEmitter<Task[]>();
  selectedFilter: string = 'ALL';
  @Input() currentPage!: string;
  @ViewChild('selectFilter') selectFilter!: ElementRef<HTMLInputElement>;
  @ViewChild('dateFilter') selectedDate!: ElementRef<HTMLInputElement>;
  @ViewChild ('sortFilter') sortFilter !:ElementRef<HTMLInputElement>;
  tasks: Task[] = [];
  allTasks: Task[] = [];
  constructor(private taskService: TaskService, private router: Router) {}
  ngOnInit() {
    this.getData();
    const currentUrl = this.router.url;
    if (currentUrl.includes('/main/completed')) {
      this.currentPage = 'Completed';
    } else if (currentUrl.includes('/main/active')) {
      this.currentPage = 'Active';
    } else {
      this.currentPage = 'Dashboard';
    }
  }

  applyFilters() {
    var selectedDate = new Date(this.selectedDate.nativeElement.value);
    if (this.currentPage.toString() == 'Dashboard') {
      if (this.selectFilter.nativeElement.value == "active") {
        this.tasks = this.allTasks;
        this.tasks = this.checkDate(selectedDate, this.tasks);
        this.tasks = this.tasks.filter(e => e.isCompleted == false);
      }
      else if (this.selectFilter.nativeElement.value == "completed") {
        this.tasks = this.allTasks;
        this.tasks = this.checkDate(selectedDate, this.tasks);
        this.tasks = this.tasks.filter(e => e.isCompleted == true);
      }
      else if (this.selectFilter.nativeElement.value == "all") {
        this.tasks = this.allTasks;
        this.tasks = this.checkDate(selectedDate, this.tasks);
        this.tasks = this.tasks;
      }
      else{
        this.tasks = this.allTasks;
        this.tasks = this.checkDate(selectedDate, this.tasks);
      }
    }
    else if (this.currentPage == 'Completed') {
      this.tasks = this.tasks.filter(e => e.isCompleted == true);
      this.tasks = this.checkDate(selectedDate, this.tasks);
    }
    else if (this.currentPage == 'Active') {
      this.tasks = this.tasks.filter(e => e.isCompleted == false);
      this.tasks = this.checkDate(selectedDate, this.tasks);
    }
    this.filtersApplied.emit(this.tasks);
  }
  checkDate(selectedDate: Date, tasks: Task[]) {
    if (selectedDate.toString() != 'Invalid Date') {
      tasks = tasks.filter(e => new Date(e.createdDate).getDate() == selectedDate.getDate() && new Date(e.createdDate).getMonth() == selectedDate.getMonth());
    }
    return tasks;
  }
  resetFilters() {
    this.selectedDate.nativeElement.value = 'select';
    this.selectFilter.nativeElement.value = "Select";
    this.sortFilter.nativeElement.value = "Sort";
    this.tasks = this.allTasks.sort((a,b)=> Number(a.isCompleted) - Number(b.isCompleted));
    if (this.currentPage == 'Completed') {
      this.tasks = this.tasks.filter(e => e.isCompleted == true);
    }
    else if (this.currentPage == 'Active') {
      this.tasks = this.tasks.filter(e => e.isCompleted == false);
    }
    this.filtersReset.emit(this.tasks);
  }
  public getData() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
      this.allTasks = data;
      if (this.currentPage == 'Completed') {
        this.tasks = data.filter(e => e.isCompleted == true);
      }
      else if (this.currentPage == 'Active') {
        this.tasks = data.filter(e => e.isCompleted == false);
      }
    });
  }

  currentSort = { ascending: true };

  sortingType = 0;
  sortTasks() {
    if (this.currentPage == 'Dashboard') {
      if (this.sortingType == 0) {
        this.sortingType = 1;
        this.tasks.sort((a, b) => a.title.localeCompare(b.title));
      }
      else if (this.sortingType == 1) {
        this.sortingType = 2;
        this.tasks.sort((a, b) => b.title.localeCompare(a.title));
      }
      else {
        this.sortingType = 1;
        this.tasks.sort((a, b) => a.title.localeCompare(b.title));

      }
    }
    else if(this.currentPage != 'Dashboard'){
      if(this.sortFilter.nativeElement.value == "1" ){
        this.tasks.sort((a,b) => a.priority - b.priority );
      }
      else if(this.sortFilter.nativeElement.value == "2" ){
        this.tasks.sort((a,b) => b.priority - a.priority );
      }
      else if (this.sortFilter.nativeElement.value == "3") {
        this.sortingType = 2;
        this.tasks.sort((a, b) => a.title.localeCompare(b.title));
      }
      else if (this.sortFilter.nativeElement.value == "4") {
        this.sortingType = 2;
        this.tasks.sort((a, b) => b.title.localeCompare(a.title));
      }
      else{
        this.tasks = this.tasks;
      }
    }
    this.sortFilters.emit(this.tasks);
  }

}
