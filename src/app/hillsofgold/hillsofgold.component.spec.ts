import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HillsofgoldComponent } from './hillsofgold.component';

describe('HillsofgoldComponent', () => {
  let component: HillsofgoldComponent;
  let fixture: ComponentFixture<HillsofgoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HillsofgoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HillsofgoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
