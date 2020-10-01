import { ImoveisTable } from './../../_models/imoveis-table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from './../../_constants/messagesSnackBar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommomService } from 'src/app/services/commom.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import icSearch from '@iconify/icons-ic/twotone-search';

@Component({
  selector: 'vex-imoveis-ativos-inativos',
  templateUrl: './imoveis-ativos-inativos.component.html',
  styleUrls: ['./imoveis-ativos-inativos.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class ImoveisAtivosInativosComponent implements OnInit {

  icSearch = icSearch;
  listTable: any[] = [];
  preencheTable: ImoveisTable[] = []

  displayedColumns = ['Id','Fachada', 'Nome', 'Tipo', 'Preco', 'DataAlteracao' ,'Acoes'];
  dataSource: MatTableDataSource<ImoveisTable>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  formDadosBairro: FormGroup;
  formDadosReclamacao: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router, 
    private commomService: CommomService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
     } 

    this.formDadosBairro = this.fb.group({
      titulo: ['', Validators.required],
      preco: ['', Validators.required],
      condominio: ['', Validators.required],
      conteudo: ['', Validators.required]
    });
    this.getImoveis();
  }

  edit(id: string){
    window.localStorage.setItem('idImovel', id);
    this.router.navigate(['/cad-imoveis']);
  }

  
  
  getImoveis(){
    let flagAtivo = false;
    let url = window.location.href.substring(22);
    if(url == 'imoveis-ativos'){
      flagAtivo = true;
    }else{
      flagAtivo = false;
    }
    this.commomService.getImoveis(`${environment.urlImoveis}`, flagAtivo.toString())
      .subscribe(response =>{
        this.listTable = response.body.imoveis;
        this.montarTabela(this.listTable);
      });
  }

  montarTabela(list: any){
    for (let i = 0; i < list.referencia.length; i++) {
      let edificiosCondominios: ImoveisTable = new ImoveisTable();
      edificiosCondominios.id = list.id[i];
      edificiosCondominios.ref = list.referencia[i];
      edificiosCondominios.fotoFachada = list.foto_fachada[i];
      edificiosCondominios.edificioCondominio = list.edificio_condominio[i];
      edificiosCondominios.tipo = list.tipo[i];
      edificiosCondominios.preco = list.preco[i];
      edificiosCondominios.dataAlteracao = this.commomService.dateFormat(list.data_alteracao[i]);
      this.preencheTable.push(edificiosCondominios);
    }
    this.dataSource = new MatTableDataSource(this.preencheTable);
    this.dataSource.paginator = this.paginator;
    
  }

  delete(id: string){
    this.commomService.deleteIdParamsImovel(environment.urlImoveis, id)
    .subscribe(() => {
      this.snackBar.open(MessagesSnackBar.ITEM_REMOVIDO, 'Fechar', { duration: 4000 });
        this.preencheTable = this.preencheTable.filter(imovel => { 
          return imovel.id != parseInt(id);
        });
        this.dataSource = new MatTableDataSource(this.preencheTable);
    },
    (error) => {
      console.log(error.message);
      this.snackBar.open(MessagesSnackBar.ITEM_REMOVIDO_ERRO, 'Fechar', { duration: 4000 });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
