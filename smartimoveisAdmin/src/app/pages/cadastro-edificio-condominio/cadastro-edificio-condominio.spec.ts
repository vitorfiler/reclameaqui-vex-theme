import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdificioCondominioComponent } from './cadastro-edificio-condominio.component';

describe('FaqComponent', () => {
  let component: CadastroEdificioCondominioComponent;
  let fixture: ComponentFixture<CadastroEdificioCondominioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroEdificioCondominioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEdificioCondominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
