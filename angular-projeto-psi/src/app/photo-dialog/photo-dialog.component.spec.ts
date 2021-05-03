import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDialogComponent } from './photo-dialog.component';

describe('PhotoDialogComponent', () => {
  let component: PhotoDialogComponent;
  let fixture: ComponentFixture<PhotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
