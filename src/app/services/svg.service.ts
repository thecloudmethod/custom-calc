import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, share } from 'rxjs/operators';

@Injectable()
export class SvgService {
  constructor(private httpService: Http){}

  loadSvg(source: string): any {
    return this.httpService.get(source).pipe(
        map((response: Response) => {
            return response['_body'];
        })
    );
  }
}