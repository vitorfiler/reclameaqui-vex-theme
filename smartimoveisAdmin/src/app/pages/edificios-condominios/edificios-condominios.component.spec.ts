import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificiosCondominiosComponent } from './edificios-condominios.component';

describe('EdificiosCondominiosComponent', () => {
  let component: EdificiosCondominiosComponent;
  let fixture: ComponentFixture<EdificiosCondominiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdificiosCondominiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificiosCondominiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
