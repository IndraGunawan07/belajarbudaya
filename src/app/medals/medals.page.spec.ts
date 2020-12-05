import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedalsPage } from './medals.page';

describe('MedalsPage', () => {
  let component: MedalsPage;
  let fixture: ComponentFixture<MedalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
