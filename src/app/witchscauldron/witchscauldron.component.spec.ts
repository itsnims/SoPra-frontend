import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitchscauldronComponent } from './witchscauldron.component';

describe('WitchscauldronComponent', () => {
  let component: WitchscauldronComponent;
  let fixture: ComponentFixture<WitchscauldronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitchscauldronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitchscauldronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
