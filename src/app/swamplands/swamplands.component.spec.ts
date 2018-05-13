import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwamplandsComponent } from './swamplands.component';

describe('SwamplandsComponent', () => {
  let component: SwamplandsComponent;
  let fixture: ComponentFixture<SwamplandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwamplandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwamplandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
