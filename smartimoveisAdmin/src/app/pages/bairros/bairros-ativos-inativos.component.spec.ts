import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BairrosAtivosInativosComponent } from './bairros-ativos-inativos.component';

describe('BairrosAtivosComponent', () => {
  let component: BairrosAtivosInativosComponent;
  let fixture: ComponentFixture<BairrosAtivosInativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BairrosAtivosInativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BairrosAtivosInativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
