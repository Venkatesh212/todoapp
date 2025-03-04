import { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from '../shared/services/cookie/cookie.service';
import { inject } from '@angular/core';
import { LoaderService } from '../shared/services/loader/loader.service';
import { finalize } from 'rxjs';
var totalRequests = 0;
export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  var cookieService = inject(CookieService);
  const loaderService = inject(LoaderService);
  const authToken = cookieService.get('token');
      totalRequests++;
      loaderService.setLoading(true);
      const reqWithHeader = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next(reqWithHeader).pipe(
        finalize(() => {
          totalRequests--;
          if (totalRequests == 0) {
            loaderService.setLoading(false);
          }
        })
      );
};
