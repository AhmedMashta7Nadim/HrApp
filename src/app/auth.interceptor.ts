import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("auth"); // جلب التوكن من التخزين المحلي
  let authreq = req;

  if (token) {
    authreq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
  }

  return next(authreq);
};
