import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceirosCargaComponent } from './parceiros-carga.component';

describe('ParceirosCargaComponent', () => {
  let component: ParceirosCargaComponent;
  let fixture: ComponentFixture<ParceirosCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParceirosCargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceirosCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
