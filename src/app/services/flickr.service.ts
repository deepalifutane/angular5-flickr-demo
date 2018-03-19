import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FlickrService {
  constructor(private http: Http) { }
  fetchPhotoList() {
    const url = 'https://api.flickr.com/services/rest/?' +
                'method=flickr.people.getPhotos' +
                '&user_id=140166608%40N07' +
                '&format=json&nojsoncallback=1' +
                '&api_key=c9f3bf59d4c78761b444fd11af5dfe8a';
    return new Promise((res, rej) => {
        this.http.get(url)
            .subscribe((success) => {
                res(success);
            }, (error) => {
                rej(error);
            });
    });
  }
}
