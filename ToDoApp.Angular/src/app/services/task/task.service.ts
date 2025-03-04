import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { environment } from '../../../environments/environment.development'
import { User, UserData } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http = inject(HttpClient)
  // private apiUrl = "http://localhost:5278/api";
  private apiUrl = environment.apiUrl+'/Task';
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  postData(formData: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, formData);
  }
  deleteData(id : number) : Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}?id=${id}`,{responseType:'text' as 'json'});
  }
  getTask(id : number): Observable<Task>{
    return this.http.get<Task>(`${this.apiUrl}?id=${id}`);
  }
  putData(id:number ,formData: Task): Observable<string>{
    return this.http.put<string>(`${this.apiUrl}?id=${id}`, formData, {responseType:'text' as 'json'});
  }
  getAllUsers(): Observable<UserData[]>{
    return this.http.get<UserData[]>(`${this.apiUrl}/Users`);
  }
}
