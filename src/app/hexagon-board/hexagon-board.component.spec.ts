import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexagonBoardComponent } from './hexagon-board.component';

describe('HexagonBoardComponent', () => {
  let component: HexagonBoardComponent;
  let fixture: ComponentFixture<HexagonBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexagonBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexagonBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
