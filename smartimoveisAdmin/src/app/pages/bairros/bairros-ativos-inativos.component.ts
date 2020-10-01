import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommomService } from 'src/app/services/commom.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { Bairro } from 'src/app/_models/bairros';
import { Router } from '@angular/router';



@Component({
  selector: 'vex-bairros-ativos',
  templateUrl: './bairros-ativos-inativos.component.html',
  styleUrls: ['./bairros-ativos-inativos.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class BairrosAtivosInativosComponent implements OnInit {

  listTable: any[] = [];
  preencheTable: Bairro[] = []
  isTabelaBairro = true;
  isFormCadastroBairro: Boolean = false;
  personalInfoComplete = true;

  displayedColumns = ['Nome', 'Acoes'];
  dataSource: MatTableDataSource<Bairro>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  formDadosBairro: FormGroup;
  formDadosReclamacao: FormGroup;
  constructor(private fb: FormBuilder,private router: Router, private commomService: CommomService) { }

  ngOnInit(): void {
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
     } 

    this.formDadosBairro = this.fb.group({
      titulo: ['', Validators.required]
    });
    this.getBairros();
  }
  formCadastro(){
    this.isTabelaBairro = false
    this.isFormCadastroBairro = true
  }
  
  cadastrarBairro(){
    this.isFormCadastroBairro = false
    this.isTabelaBairro = true

  }
  getBairros(){
    let flagAtivo = 0;
    let url = window.location.href.substring(22);
    if(url == 'bairros-ativos'){
      flagAtivo = 1;
    }else{
      flagAtivo = 0;
    }
    // this.commomService.getBairros(`${environment.urlBairros}`, flagAtivo)
    //   .subscribe(response =>{
    //     this.listTable = response.body.bairros;
    //     this.montarTabela(this.listTable);
    //   });
  }

  montarTabela(list: any[]){
    for (let i = 0; i < list[0].nome.length; i++) {
      let edificiosCondominios = new Bairro();
      edificiosCondominios.nome = list[0].nome[i]
      this.preencheTable.push(edificiosCondominios)
    }
    this.dataSource = new MatTableDataSource(this.preencheTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
