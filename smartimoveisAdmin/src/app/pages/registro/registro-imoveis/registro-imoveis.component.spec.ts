import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroImoveisComponent } from './registro-imoveis.component';

describe('RegistroImoveisComponent', () => {
  let component: RegistroImoveisComponent;
  let fixture: ComponentFixture<RegistroImoveisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroImoveisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
