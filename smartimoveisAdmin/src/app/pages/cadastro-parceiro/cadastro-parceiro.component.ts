import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommomService } from './../../services/commom.service';
import { Parceiro } from './../../_models/parceiro';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { environment } from 'src/environments/environment';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';

@Component({
  selector: 'vex-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class CadastroParceiroComponent implements OnInit {

  formDataPartner: FormGroup;
  partnerRequest: Parceiro;
  listPartner: Parceiro[] = [];
  idParceiro: string;
  
  register = 'Cadastrar'

  constructor(
    private fb: FormBuilder,
    private commomService: CommomService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

    this.formDataPartner = this.fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      tagSimples: ['', [Validators.required]],
      tagDestaque: ['', [Validators.required]],
      tagSuperDestaque: ['', [Validators.required]],
      nomeArquivoXml: ['', [Validators.required]]
    });

    this.getPartners();
  }

  getPartners(){
    this.commomService.get(`${environment.parceiros.url}`)
      .subscribe(response =>{
        this.listPartner = response.body;

        this.mountPartner();
      });
  }

  mountPartner(){
    
    this.idParceiro = window.localStorage.getItem('idParceiro');
    window.localStorage.removeItem('idParceiro');

    if(this.idParceiro == null || this.idParceiro == ''){
      this.register = 'Cadastrar'

    } else {
      this.register = 'Editar'
      let partnerEdit: Parceiro;

      this.listPartner.forEach(partner => { 
        if(partner.id.toString() == this.idParceiro){ partnerEdit = partner;}
      });

      this.formDataPartner = this.fb.group({
        nome: [partnerEdit.nome, Validators.compose([Validators.required, Validators.minLength(5)])],
        nomeArquivoXml: [partnerEdit.nomeArquivoXml, [Validators.required]],
        tagSimples: [partnerEdit.tagSimples, [Validators.required]],
        tagDestaque: [partnerEdit.tagDestaque, [Validators.required]],
        tagSuperDestaque: [partnerEdit.tagSuperDestaque, [Validators.required]]
      });
    }
  }

  cancelar() {
    this.router.navigate(['/parceiros']);
  }

  registerPartner(){
    this.partnerRequest = this.formDataPartner.value;

    if(this.idParceiro == null || this.idParceiro == ''){      
      this.commomService.post(`${environment.parceiros.url}`, this.partnerRequest)
        .subscribe(() => {
          this.router.navigate(['/parceiros']);
          this.snackBar.open(MessagesSnackBar.CADASTRO, 'Fechar', { duration: 4000 });
          this.formDataPartner.reset();
        },
        (error) => {
          console.log(error.message);
          this.snackBar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 4000 });
        });
    } 
    else {
      this.partnerRequest.id = parseInt(this.idParceiro);
      this.commomService.put(`${environment.parceiros.url}`, this.partnerRequest)
      .subscribe(() => {
        this.formDataPartner.reset();
        this.router.navigate(['/parceiros']);
        this.snackBar.open(MessagesSnackBar.EDITADO, 'Fechar', { duration: 4000 });
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(MessagesSnackBar.EDITADO_ERRO, 'Fechar', { duration: 4000 });
      });
    }
  }

  //resto dos parametros do parceiro
}
