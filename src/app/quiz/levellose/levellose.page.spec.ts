import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LevellosePage } from './levellose.page';

describe('LevellosePage', () => {
  let component: LevellosePage;
  let fixture: ComponentFixture<LevellosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevellosePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LevellosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
