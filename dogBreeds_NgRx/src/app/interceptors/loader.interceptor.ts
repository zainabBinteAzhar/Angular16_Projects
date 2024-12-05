import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../shared/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //show loader before request is sent
    this.loaderService.setLoading(true);

    return next.handle(req).pipe(
      //hide loader when request completes or fails
      finalize(() => {
        this.loaderService.setLoading(false);
      })
    );
  }
}
