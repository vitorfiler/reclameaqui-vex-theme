import { Router } from '@angular/router';
import { fadeInUp400ms } from './../../../@vex/animations/fade-in-up.animation';
import { stagger40ms } from './../../../@vex/animations/stagger.animation';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommomService } from 'src/app/services/commom.service';
import { MatPaginator } from '@angular/material/paginator';
import { Contato } from './../../_models/contato';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class ContatosComponent implements OnInit {

  formVisualizar: FormGroup;

  listContacts: Contato[] = [];

  displayedColumns = ['Id', 'Nome', 'Status', 'Data de Abertura', 'Visualizar'];
  dataSource: MatTableDataSource<Contato>;

  viewListContacts = false;
  respondido = 'Marcar Respondido';
  disableButton = false;
  contatoAberto: Contato;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private commomService: CommomService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.mountForm();
    this.getContacts();
  }

  mountForm(){
    this.formVisualizar = this.fb.group({
      nome: [{value: '', disabled: true }],
      email: [{value: '', disabled: true }],
      telefone: [{value: '', disabled: true }],
      mensagem: [{value: '', disabled: true }],
      status: [{value: '', disabled: true }],
      dataAbertura: [{value: '', disabled: true }],
    });
  }

  getContacts(){
    this.commomService.get(`${environment.contato.url}`)
      .subscribe(response =>{
        this.listContacts = response.body;

        this.listContacts.map(contato => { return contato.dataAbertura = this.commomService.dateFormat(contato.dataAbertura); });

        this.dataSource = new MatTableDataSource(this.listContacts);
        this.dataSource.paginator = this.paginator;        
      });
  }

  visualizar(contato: Contato){
    this.contatoAberto = contato;

    if(contato.status == 'Aberto'){ 
      contato.status = 'Visualizado';
      let request = { contatoId: contato.id, status: 'Visualizado'};

      this.commomService.put(`${environment.contato.urlAtualizaStatus}`, request).subscribe(()=>{});
    }
    if(contato.status == 'Respondido'){
      this.respondido = 'Já Respondido';
      this.disableButton = true;
    }

    this.viewListContacts = true;

    this.formVisualizar = this.fb.group({
      nome: [{value: contato.nome, disabled: true }],
      email: [{value: contato.email, disabled: true }],
      telefone: [{value: contato.telefone, disabled: true }],
      mensagem: [{value: contato.mensagem, disabled: true }],
      status: [{value: contato.status, disabled: true }],
      dataAbertura: [{value: contato.dataAbertura, disabled: true }],
    });
  }

  setRespondido(){
    this.contatoAberto.status = 'Respondido';
    let request = { contatoId: this.contatoAberto.id, status: 'Respondido'};
    
    this.commomService.put(`${environment.contato.urlAtualizaStatus}`, request).subscribe();
    this.viewListContacts = false;
  }

  cancelar() {
    this.viewListContacts = false;
    this.respondido = 'Marcar Respondido';
    this.disableButton = false;
    delete this.contatoAberto;
  }
}
