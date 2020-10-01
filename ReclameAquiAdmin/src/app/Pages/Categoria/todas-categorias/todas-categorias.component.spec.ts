import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasCategoriasComponent } from './todas-categorias.component';

describe('TodasCategoriasComponent', () => {
  let component: TodasCategoriasComponent;
  let fixture: ComponentFixture<TodasCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodasCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
