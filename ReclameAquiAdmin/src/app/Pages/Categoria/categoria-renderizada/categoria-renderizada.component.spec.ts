import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaRenderizadaComponent } from './categoria-renderizada.component';

describe('CategoriaRenderizadaComponent', () => {
  let component: CategoriaRenderizadaComponent;
  let fixture: ComponentFixture<CategoriaRenderizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaRenderizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaRenderizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
