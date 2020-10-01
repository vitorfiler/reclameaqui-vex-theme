import { Component, OnInit } from '@angular/core';
import { Link } from 'src/@vex/interfaces/link.interface';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { trackByRoute } from 'src/@vex/utils/track-by';
import icSearch from '@iconify/icons-ic/twotone-search';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/_models/empresa';
import { Reclamacao } from 'src/app/_models/reclamacao';
import { CommomService } from 'src/app/services/commom.service';
import { environment } from 'src/environments/environment';
import { HomeVisualComponent } from './home-visual/home-visual.component';
import { EventEmitterService } from '../_arquitetura/event/event.service';

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

@Component({
  selector: 'vex-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    scaleIn400ms,
    stagger40ms,
    fadeInUp400ms,
    fadeInRight400ms
  ]

})
export class HomeComponent implements OnInit {

  links: Link[] = [
  ];
  userName: string = this.getUser();
  idSelectEmp = 0;
  nomeEmpresa = '';
  
  private Home: HomeVisualComponent;

  myControl = new FormControl();
  formSelectEmp: FormGroup;
  filteredOptions: Observable<Empresa[]>;
  reclamacaoSave = new Reclamacao();
  empresas = this.getEmpresas();
  constructor(private fb: FormBuilder, private commomService: CommomService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.formSelectEmp = this.fb.group({
      selectEmp: ['', Validators.required]
    });
  }

  private _filter(value: string): Empresa[] {
    if (value == undefined) return this.empresas;
    return this.empresas.filter(x => x.nome.toLowerCase().includes(value.toLowerCase()));
  }

  getEmpresas() {
    var empresas = localStorage.getItem("empresas");
    if (empresas != null) return JSON.parse(empresas);
  }

  empresaSubmit() {
    this.idSelectEmp = this.reclamacaoSave.EmpresaId;
    window.localStorage.setItem('idBusca',this.idSelectEmp.toString())
    this.nomeEmpresa = this.getNomeEmpresa();
    EventEmitterService.get('atualizaReclamacao').emit();
  }

  getNomeEmpresa() {
    if (this.idSelectEmp == 0) {
      return '';
    }
    else {
      var emp = this._filterById(this.idSelectEmp);
      return emp[0].nome;
    }
  }

  private _filterById(value: number): Empresa {
    return this.empresas.filter(x => x.id == value);
  }

  icSearch = icSearch;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;

  trackByRoute = trackByRoute;
  getUser(){
    var nome = localStorage.getItem('usuarioLogado');
    if (nome == null) {
        return "";
    }
    return nome.replace('"', '').replace('"', '');
  }

}
