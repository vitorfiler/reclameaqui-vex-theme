import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImoveisAtivosInativosComponent } from './imoveis-ativos-inativos.component';

describe('ImoveisAtivosInativosComponent', () => {
  let component: ImoveisAtivosInativosComponent;
  let fixture: ComponentFixture<ImoveisAtivosInativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImoveisAtivosInativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImoveisAtivosInativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
