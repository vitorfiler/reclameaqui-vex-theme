import { Component, OnInit } from '@angular/core';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';

import happy from '@iconify/icons-emojione/beaming-face-with-smiling-eyes';
import angry from '@iconify/icons-emojione/angry-face';
import sad from '@iconify/icons-emojione/sad-but-relieved-face';

import { Router } from '@angular/router';
import { MELHOR_INDICE_SOLUCAO } from 'src/app/_models/mock-ranking';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { Ranking } from 'src/app/_models/ranking-table';
import { CommomService } from 'src/app/services/commom.service';


@Component({
  selector: 'vex-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class RankingComponent implements OnInit {

  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;
  angry = angry;
  sad = sad;
  happy = happy;
  rankingUrl = '/Rating'

  url: string = ''
  nomeCategoria: string = ''
  mock: any[] = MELHOR_INDICE_SOLUCAO;
  ranking1 = new Ranking();
  posicao: any[]=[];
  nome: any[]=[];
  valor: any[]=[];
  preencheTabela0: any[] = []
  preencheTabela1: any[] = []
  preencheTabela2: any[] = []
  preencheTabela3: any[] = []
  preencheTabela4: any[] = []
  preencheTabela5: any[] = []
  preencheTabela6: any[] = []
  preencheTabela7: any[] = []
  preencheTabela8: any[] = []
  preencheTabela9: any[] = []
  preencheTabela10: any[] = []


  rankings: any[] = [];

  constructor(private commomService: CommomService) { 
    Object.assign(this, { MELHOR_INDICE_SOLUCAO })
  }

  ngOnInit(): void {
    this.getListaRanking();
  }

  getPosicaoEmpresa(){
    let id = 0;
    this.rankings.forEach(element=>{
      
      for (let i = 0; i < element.valor.length; i++) {
        let ranking = new Ranking();
        ranking.posicao = element.posicao[i];
        ranking.nome = element.nome[i];
        ranking.valor = element.valor[i]
        this['preencheTabela'+id].push(ranking)
      }
      id++
    })
  }

  getListaRanking(){
    this.commomService.get(this.rankingUrl).subscribe(response=>{
      this.rankings = response.body.rankings;
      this.getPosicaoEmpresa();
    })
  }
}
