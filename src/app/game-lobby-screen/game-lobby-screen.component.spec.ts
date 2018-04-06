import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLobbyScreenComponent } from './game-lobby-screen.component';

describe('GameLobbyScreenComponent', () => {
  let component: GameLobbyScreenComponent;
  let fixture: ComponentFixture<GameLobbyScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLobbyScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLobbyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
