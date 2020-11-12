import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LevelClearPage } from './level-clear.page';

describe('LevelClearPage', () => {
  let component: LevelClearPage;
  let fixture: ComponentFixture<LevelClearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelClearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LevelClearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
