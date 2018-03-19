import { TestBed, inject } from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';

import { FlickrService } from './flickr.service';
import { HttpModule, ResponseOptions, Response, Http } from '@angular/http';

describe('FlickrService', () => {
 /*  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlickrService],
      imports: [HttpModule]
    });
  });
 */
  let backend: MockBackend = null;
  let subject: FlickrService;
  beforeEach(() => {
     TestBed.configureTestingModule({
      providers: [FlickrService],
      imports: [HttpModule]
    });
    backend = new MockBackend();
    TestBed.compileComponents();
  });

  it('should be created', inject([FlickrService], (service: FlickrService) => {
    expect(service).toBeTruthy();
  }));
  it('should have fetchPhotoList', inject([FlickrService], (service: FlickrService) => {
    expect(service.fetchPhotoList).toBeTruthy();
  }));
  it('fetchPhotoList should call endpoint and return it\'s result',  inject([FlickrService], (service: FlickrService) => {
     backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: [
  {
    'photos': {
      'page': 1,
      'pages': 1,
      'perpage': 100,
      'total': '5',
      'photo': [
        {
          'id': '39665568314',
          'owner': '140166608@N07',
          'secret': '9cd7b3c605',
          'server': '4619',
          'farm': 5,
          'title': 'grand_canal_venice_italy_4k-wide',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        },
        {
          'id': '40376356911',
          'owner': '140166608@N07',
          'secret': '1480b4fbf5',
          'server': '4697',
          'farm': 5,
          'title': '2918504-greece-wallpapers',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        },
        {
          'id': '38565802920',
          'owner': '140166608@N07',
          'secret': '9558a67ded',
          'server': '4659',
          'farm': 5,
          'title': 'eiffel-tower-wallpaper',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        },
        {
          'id': '40376355731',
          'owner': '140166608@N07',
          'secret': '2dcdafb2ca',
          'server': '4701',
          'farm': 5,
          'title': '2918452-greece-wallpapers',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        },
        {
          'id': '39479160035',
          'owner': '140166608@N07',
          'secret': 'f5b3d2f847',
          'server': '4671',
          'farm': 5,
          'title': '2918320-greece-wallpapers',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        }
      ]
    },
    'stat': 'ok'
  }
]
                    }
          )));
      });
    subject
      .fetchPhotoList()
     .then(
    (data) => {
      console.log(data[0]);
      expect(data).toBe(`[
  {
    'photos': {
      'page': 1,
      'pages': 1,
      'perpage': 100,
      'total': '5',
      'photo': [
        {
          'id': '39665568314',
          'owner': '140166608@N07',
          'secret': '9cd7b3c605',
          'server': '4619',
          'farm': 5,
          'title': 'grand_canal_venice_italy_4k-wide',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        },
        {
          'id': '40376356911',
          'owner': '140166608@N07',
          'secret': '1480b4fbf5',
          'server': '4697',
          'farm': 5,
          'title': '2918504-greece-wallpapers',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        },
        {
          'id': '38565802920',
          'owner': '140166608@N07',
          'secret': '9558a67ded',
          'server': '4659',
          'farm': 5,
          'title': 'eiffel-tower-wallpaper',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        },
        {
          'id': '40376355731',
          'owner': '140166608@N07',
          'secret': '2dcdafb2ca',
          'server': '4701',
          'farm': 5,
          'title': '2918452-greece-wallpapers',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        },
        {
          'id': '39479160035',
          'owner': '140166608@N07',
          'secret': 'f5b3d2f847',
          'server': '4671',
          'farm': 5,
          'title': '2918320-greece-wallpapers',
          'ispublic': 1,
          'isfriend': 0,
          'isfamily': 0
        }
      ]
    },
    'stat': 'ok'
  }
]`);
    })
     .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something went wrong' })
    );
  }));
});
