import { Component, OnInit } from '@angular/core';
import { Link } from 'src/@vex/interfaces/link.interface';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

@Component({
  selector: 'vex-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class SocialComponent implements OnInit {

  links: Link[] = [
  ];
  userName: string = this.getUser();
  constructor() { }

  ngOnInit() {
  }

  getUser(){
    var nome = localStorage.getItem('usuarioLogado');
    if (nome == null) {
      var nomeEmpe = localStorage.getItem('usuarioLogadoEmpresa');
      if (nomeEmpe == null){
        return "";
      }
      return nomeEmpe.replace('"', '').replace('"', '');
    }
    return nome.replace('"', '').replace('"', '');
  }
}
