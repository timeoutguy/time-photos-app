import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = inject(CookieService).get('token');

  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  })

  return next(request);
};
