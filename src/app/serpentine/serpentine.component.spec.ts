import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerpentineComponent } from './serpentine.component';

describe('SerpentineComponent', () => {
  let component: SerpentineComponent;
  let fixture: ComponentFixture<SerpentineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerpentineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerpentineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
