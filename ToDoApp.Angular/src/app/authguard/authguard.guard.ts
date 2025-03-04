import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';
import { CookieService } from '../shared/services/cookie/cookie.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  var router = inject(Router);
  var cookieService = inject(CookieService);
  if(cookieService.get('token')!=null){
    return true;
  }
  else{
    router.navigate(['/sign-in']);
      return false;
  }
};

