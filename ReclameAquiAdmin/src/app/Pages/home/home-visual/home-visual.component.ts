import { Component, OnInit } from '@angular/core';
import { FriendSuggestion } from '../home.component';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { friendSuggestions } from 'src/app/_models/friend-suggestions';
import { MatTableDataSource } from '@angular/material/table';
import { Reclamacao, ReclamacaoTabela, ReclamacaoFeedEmpresa } from 'src/app/_models/reclamacao';
import { bodyReclamacao } from 'src/app/_models/mock-reclamacao-empresa';
import { reclamacoes } from 'src/app/_models/mock-tabela';

import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import bullhorn from '@iconify/icons-fa-solid/bullhorn';
import block from '@iconify/icons-ic/block';
import check from '@iconify/icons-fa-solid/check';
import acBalance from '@iconify/icons-ic/data-usage';
import key from '@iconify/icons-fa-solid/key';
import power from '@iconify/icons-fa-solid/power-off';
import message from '@iconify/icons-ic/message';
import icAddAPhoto from '@iconify/icons-ic/twotone-add-a-photo';
import icPhotoFilter from '@iconify/icons-ic/twotone-photo-filter';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icKeyboardArrowRight from '@iconify/icons-ic/twotone-keyboard-arrow-right';
import apple from '@iconify/icons-logos/apple';
import aws from '@iconify/icons-logos/aws';
import discord from '@iconify/icons-logos/discord';
import github from '@iconify/icons-logos/github-icon';
import { CommomService } from 'src/app/services/commom.service';
import { RankingHome } from 'src/app/_models/ranking-home';
import { windowCount } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventEmitterService } from '../../_arquitetura/event/event.service';

@Component({
  selector: 'vex-home-visual',
  templateUrl: './home-visual.component.html',
  styleUrls: ['./home-visual.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class HomeVisualComponent implements OnInit {

  github = github;
  message = message
  power = power
  key = key
  acBalance = acBalance
  suggestions = friendSuggestions;
  check = check
  icWork = icWork;
  block = block
  // icPhone = icPhone; 

  discord = discord
  aws = aws;
  apple = apple
  bullhorn = bullhorn
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  icAddAPhoto = icAddAPhoto;
  icPhotoFilter = icPhotoFilter;
  icAttachFile = icAttachFile;
  icKeyboardArrowRight = icKeyboardArrowRight;
  flagTrocarEmail: Boolean = false
  flagTrocarSenha: Boolean = false
  flagDadosPessoais: boolean = true;
  flagReclamacoes: Boolean = false
  vazio: Boolean = false
  tituloReclamacoes: string = "Todas as Reclamações";
  urlUltimasReclamacoes: string = '/Reclamacao'
  rankings: any[] = []
  ranking1: any[] = []
  ranking2: any[] = []
  displayedColumns: string[] = [
    "Status",
    "Id",
    "Data",
    "Empresa",
    "Reclamacao"
  ];

  listTable: any[] = [];
  preencheTable: ReclamacaoFeedEmpresa[] = [];

  constructor(private commomService: CommomService) { 
    Object.assign(this, { bodyReclamacao })
  }

  ngOnInit(): void {
    window.localStorage.removeItem('idBusca') 
    EventEmitterService.get('atualizaReclamacao').subscribe(() => this.getReclamacoes());
    this.getReclamacoes();
  }

  logout(){
    this.commomService.logout()
  }

  getReclamacoes(){
    if(!window.localStorage.getItem('idBusca')){
      this.commomService.get(this.urlUltimasReclamacoes).subscribe(response =>{
        this.listTable = response.body.reclamacoes;
        
        this.montaTela();
        this.rankings = this.getRankings();
        this.montaRankings();
      })
    }else{
      let id = window.localStorage.getItem('idBusca')
      this.commomService.getReclamacoesEmpresa(`${environment.reclamacoesEmpresa}`, id, "0")
        .subscribe(response =>{
          this.listTable = response.body.reclamacoes;
          if(!this.listTable[0].nomeReclamante.length){
            return this.vazio = true
          } 
          this.vazio = false
          this.montaTela();
          this.rankings = this.getRankings();
          this.montaRankings();
        })
    }
  }

  montaRankings(){
      for (let i = 0; i < this.rankings[3].nome.length; i++) {
        let ranking = new RankingHome();
        ranking.NomeEmpresa = this.rankings[3].nome[i];
        ranking.Foto = this.rankings[3].fotoEmpresa[i];
        this.ranking1.push(ranking)
      }
      for (let i = 0; i < this.rankings[5].nome.length; i++) {
        let ranking = new RankingHome();
        ranking.NomeEmpresa = this.rankings[5].nome[i];
        ranking.Foto = this.rankings[5].fotoEmpresa[i];
        this.ranking2.push(ranking)
      }
      
  }
  getRankings(){
    var rankings = localStorage.getItem("Rankings");
    if (rankings != null) return JSON.parse(rankings);
  }
  montaTela() {
    this.preencheTable = []
    for (let i = 0; i < this.listTable[0].statusId.length; i++) {
      let table = new ReclamacaoFeedEmpresa();
      if(this.listTable[0].tituloReclamacao){
        table.Titulo = this.listTable[0].tituloReclamacao[i]
      }else{
        table.Titulo = this.listTable[0].titulo[i]
      }
      table.DsStatus = this.listTable[0].status[i]
      table.StatusId = this.listTable[0].statusId[i]
      table.StatusCor = this.listTable[0].statusCor[i]
      table.TempoDecorrido = this.listTable[0].tempoDecorrido[i]
      table.Body = this.listTable[0].body[i]
      table.NomeReclamante = this.listTable[0].nomeReclamante[i]
      table.Foto = this.listTable[0].urlFoto[i]
      
       this.preencheTable.push(table);
    }
  }
}
