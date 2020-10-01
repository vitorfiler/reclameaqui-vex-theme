import { Component, OnInit } from '@angular/core';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: 'vex-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class CadastroCategoriaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
