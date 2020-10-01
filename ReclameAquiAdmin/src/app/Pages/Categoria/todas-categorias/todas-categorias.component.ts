import { Component, OnInit } from '@angular/core';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import happy from '@iconify/icons-emojione/beaming-face-with-smiling-eyes';
import angry from '@iconify/icons-emojione/angry-face';
import sad from '@iconify/icons-emojione/sad-but-relieved-face';

import { Router } from '@angular/router';
import { MOCK_CATEGORIA } from '../categoria-renderizada/fotos-enum';
import { CommomService } from 'src/app/services/commom.service';
import { TodasCategorias } from './../../../_models/todas-categorias';
@Component({
  selector: 'vex-todas-categorias',
  templateUrl: './todas-categorias.component.html',
  styleUrls: ['./todas-categorias.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class TodasCategoriasComponent implements OnInit {

  linhas: any[]=[];
  urlName: string = '/todas-categorias'
  preencheTela: any[]=[];
  tela: any[]=[];


  constructor(private commomService: CommomService) {}

  ngOnInit(): void {
    this.getTodasCategorias();
  }

  montarTela(){
    
    this.preencheTela = this.linhas[0]
    for (let i = 0; i < this.preencheTela.length; i++) {
      this.tela.push(this.preencheTela[i].linha);
    }
  }
  
  renderizaRankings(idCategoriaFilha: string){
    window.localStorage.setItem('idCategoriaFilha', idCategoriaFilha);
  }
  
  getTodasCategorias(){
    this.commomService.get(this.urlName).subscribe(response=>{
      
      this.linhas.push(response.body.linhas);
      this.montarTela();
    })

  }
}
