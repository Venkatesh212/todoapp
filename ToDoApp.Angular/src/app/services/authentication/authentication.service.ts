import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { CookieService } from '../../shared/services/cookie/cookie.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  cookieService = inject(CookieService);
  httpClient = inject(HttpClient);
  apiUrl= environment.apiUrl+'/Authentication';
  login(data: User) {
    this.cookieService.set('userName',data.userName);
    return this.httpClient.post(`https://localhost:7193/api/Authentication/login`, data);
  }
  register(data : User){
    return this.httpClient.post(this.apiUrl,data);
  }
}
