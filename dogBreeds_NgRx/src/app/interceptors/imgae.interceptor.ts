import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        //event instanceof HttpResponse: checks if the current event is an instance of HttpResponse. Only HTTP responses will be modified, not requests or errors. the response that we got from httpClient req( to gte imgs of dogs).
        //req.url.includes('url'): checks if the request URL matches the specific URL for fetching images from the Dog API. if yes! then we will perform action (taking first 5 imgs).
        if (
          event instanceof HttpResponse &&
          req.url.includes('https://api.thedogapi.com/v1/images/search')
        ) {
          // return only first 5 images
          const modifiedBody = event.body.slice(0, 5);
          return event.clone({ body: modifiedBody });
        }
        return event; // if No! returns the original event.
      })
    );
  }
}
