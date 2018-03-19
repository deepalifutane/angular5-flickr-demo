import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageContainerComponent } from './image-container.component';
import { FlickrService } from './../../services/flickr.service';
import { HttpModule } from '@angular/http';

describe('ImageContainerComponent', () => {
  let component: ImageContainerComponent;
  let fixture: ComponentFixture<ImageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageContainerComponent ],
      imports: [ HttpModule ],
      providers: [ FlickrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have getPhotos', () => {
    expect(component.getPhotoList).toBeTruthy();
  });

  it('should have pause', () => {
    expect(component.pause).toBeTruthy();
  });

  it('should have slideShow', () => {
    expect(component.slideShow).toBeTruthy();
  });

  it('should have toggleHighlight', () => {
    expect(component.toggleHighlight).toBeTruthy();
  });

  it('should have highlightedDiv', () => {
    expect(component.highlightedDiv).toBe(0);
  });

  it('should have photoURLList', () => {
    expect(component.photoURLList.length).toBe(0);
  });

  it('photoURLList should return empty list by default', () => {
    expect(component.getPhotoList([]).length).toBe(0);
  });

  it('photoURLList should return list of urls', () => {
    expect(component.getPhotoList([
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
      }]).length).toBe(1);
  });

   it('photoURLList should return valid urls', () => {
    expect(component.getPhotoList([
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
      }])[0]).toBe('https://farm5.staticflickr.com/4619/39665568314_9cd7b3c605.jpg');
  });

  it('toggleHighlight should set to same number passed if it lies between 0 to 4 ', () => {
    const factoryTest = [ 0, 1, 2, 3, 4];
     for (let i = 0; i < factoryTest.length; i++) {
       component.toggleHighlight(factoryTest[i]);
        expect(component.highlightedDiv).toBe(factoryTest[i]);
    }
  });

  it('toggleHighlight should set to 4 if it lies less than 0', () => {
    component.toggleHighlight(-1);
    expect(component.highlightedDiv).toBe(4);
  });

   it('toggleHighlight should set to 0 if it is greater than 4', () => {
    component.toggleHighlight(5);
    expect(component.highlightedDiv).toBe(0);
  });
   it('pause should set resumeSlideShow to false', () => {
    expect(component.resumeSlideShow).toBe(false);
  });

  it('should have subscription object', () => {
    expect(component.subscription).toBeUndefined();
  });
});
