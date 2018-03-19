import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FlickrService } from './../../services/flickr.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-image-container',
    templateUrl: './image-container.component.html',
    styleUrls: ['./image-container.component.css']
})

export class ImageContainerComponent implements OnInit {
    photoURLList = [];
    highlightedDiv: number;
    resumeSlideShow = false;
    public subscription: any;

    /* getPhotoList to form URL of images based upon respone from flickr */
    getPhotoList(photos) {
        for (const key in photos) {
             if (photos.hasOwnProperty(key)) {
                this.photoURLList.push('https://farm' + photos[key].farm +
                                    '.staticflickr.com/' + photos[key].server + '/' +
                                    photos[key].id + '_' + photos[key].secret + '.jpg');
             }
        }
        return this.photoURLList;
    }

    /* toggleHighlight to manage active image selection in carousel */
    toggleHighlight(newValue: number) {
        let resetIndex: number;
        let isReset = false;
        if (newValue === -1) {
            resetIndex = 4;
            isReset = true;
        } else if (newValue === 5) {
            resetIndex = 0;
            isReset = true;
        }
        if (isReset === true) {
            this.highlightedDiv = resetIndex;
        } else {
            if (this.highlightedDiv === newValue) {
                this.highlightedDiv = 0;
            } else {
                this.highlightedDiv = newValue;
            }
        }
    }

    /* pause to pause slide show in carousel */
    pause() {
        this.subscription.unsubscribe();
        this.resumeSlideShow = true;
    }
    /* slideShow to start slide show in carousel */
    slideShow() {
        const source = Observable.timer(200, 1000)
            .take(6);
        this.subscription = Observable.interval(5000).subscribe(val => {
            if (this.resumeSlideShow === true) {
                if (this.highlightedDiv === val) {
                    this.resumeSlideShow = false;
                }
            } else {
                if (val > 5) {
                    this.subscription.unsubscribe();
                    this.slideShow();
                } else {
                    this.toggleHighlight(val);
                }
            }
        });
    }

    constructor(flickrService: FlickrService) {
      /* fetchPhotoList in flickrService to make flickr API call */
      flickrService.fetchPhotoList().then(a => {
            this.getPhotoList(JSON.parse(a['_body']).photos.photo);
        });
        this.toggleHighlight(0);
    }

    ngOnInit() {

    }
}
