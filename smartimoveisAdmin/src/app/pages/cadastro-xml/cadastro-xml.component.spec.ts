import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroXmlComponent } from './cadastro-xml.component';

describe('CadastroXmlComponent', () => {
  let component: CadastroXmlComponent;
  let fixture: ComponentFixture<CadastroXmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroXmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
