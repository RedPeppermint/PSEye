import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotopageComponent } from './photopage.component';

describe('PhotopageComponent', () => {
  let component: PhotopageComponent;
  let fixture: ComponentFixture<PhotopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotopageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
