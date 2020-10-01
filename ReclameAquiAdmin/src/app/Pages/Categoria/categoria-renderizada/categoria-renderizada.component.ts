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
import {MOCK_CATEGORIA} from './fotos-enum'
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { Ranking } from 'src/app/_models/ranking-table';

@Component({
  selector: 'vex-categoria-renderizada',
  templateUrl: './categoria-renderizada.component.html',
  styleUrls: ['./categoria-renderizada.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class CategoriaRenderizadaComponent implements OnInit {
  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;
  angry = angry;
  sad = sad;
  happy = happy;
  url: string = this.getUrl();
  nomeCategoria: string = this.getNomeCategoria();
  // mock: any[] = MOCK_CATEGORIA;
  urlName: string = '/rating';
  preencheRanking1: any[] =[] 
  preencheRanking2: any[] =[] 
  preencheRanking3: any[] =[] 
  rankingsJson: any[] = [];
  urlBarra: string = '';
  preencheTela: any[]=[];
  tela: any[]=[];
  
  constructor(private commomService: CommomService) { 
    Object.assign(this, { MOCK_CATEGORIA })
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getCategoriaAtual();
  }

  getCategoriaAtual(){
    let currentUrl = window.location.href 
    this.urlBarra = currentUrl.substring(22)
    this.getEmpresas(this.urlBarra);
  }
  getPosicaoEmpresa(){
    let id = 1;
    if(this.rankingsJson){
      this.rankingsJson.forEach(element=>{
        for (let i = 0; i < element.posicao.length; i++) {
          let ranking = new Ranking();
          ranking.posicao = element.posicao[i];
          ranking.nome = element.nome[i];
          this['preencheRanking'+id].push(ranking)
        }
        id++
      })
    }
  }

  getEmpresas(categoria: string){
    const body: any = {
      "categoria": categoria
    }
    let idCategoriaFilha = window.localStorage.getItem('idCategoriaFilha')
    
    this.commomService.getRating(this.urlName, idCategoriaFilha).subscribe(response=>{
      
      this.rankingsJson = response.body;
      this.getPosicaoEmpresa();
    })
  }
  
  getCategorias(){
    var categorias = localStorage.getItem("TodasCategorias");
    
    if (categorias != null) return JSON.parse(categorias);
  }

  getNomeCategoria(){
    this.preencheTela = this.getCategorias();
    
    for (let i = 0; i < this.preencheTela.length; i++) {
      for (let index = 0; index < this.preencheTela[i].linha.length; index++) {
        this.preencheTela[i].linha[index]
        let currentUrl =this.preencheTela[i].linha[index].rota
        if(window.location.pathname.includes(currentUrl)){
          return this.preencheTela[i].linha[index].nomeFilha;
          // return this.preencheTela[i].linha[index].cor;
        }
      }
    }
  }

  getUrl(){
    this.preencheTela = this.getCategorias();
    for (let i = 0; i < this.preencheTela.length; i++) {
      for (let index = 0; index < this.preencheTela[i].linha.length; index++) {
        this.preencheTela[i].linha[index]
        let currentUrl =this.preencheTela[i].linha[index].rota
        if(window.location.pathname.includes(currentUrl)){
          this.url = this.preencheTela[i].linha[index].cor;
          return this.preencheTela[i].linha[index].cor;
        }
      }
    }
  return this.url;
  }
}
