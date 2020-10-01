import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EdificiosCondominios } from 'src/app/_models/edificios-condominios';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommomService } from 'src/app/services/commom.service';
import { environment } from 'src/environments/environment';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import icSearch from '@iconify/icons-ic/twotone-search';

@Component({
  selector: 'vex-edificios-condominios',
  templateUrl: './edificios-condominios.component.html',
  styleUrls: ['./edificios-condominios.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class EdificiosCondominiosComponent implements OnInit {
  icSearch = icSearch;
  
  listTable: EdificiosCondominios[] = [];
  preencheTable: EdificiosCondominios[] = []
  displayedColumns = ['Nome', 'Endereco', 'Telefone', 'Zelador', 'Acoes'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  formReclamacao: FormGroup
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
     
    this.formReclamacao = this.fb.group({
      resposta: ['', Validators.required]
    });
    this.getEdificiosCondominios();
  }

  cadastro(){
    window.localStorage.removeItem('idEdificio');
    this.router.navigate(['/cad-edficios-condominios']);
  }
  
  editar(id: string){
    window.localStorage.setItem('idEdificio', id);
    this.router.navigate(['/cad-edficios-condominios'])
  }

  delete(id: string){
    this.commomService.deleteIdParamsEdificio(environment.urlCadEdificio, id)
    .subscribe(() => {
      this.snackBar.open(MessagesSnackBar.ITEM_REMOVIDO, 'Fechar', { duration: 4000 });
        this.preencheTable = this.preencheTable.filter(edificioCondominio => { 
          return edificioCondominio.id != parseInt(id);
        });
        this.dataSource = new MatTableDataSource(this.preencheTable);
    },
    (error) => {
      console.log(error.message);
      this.snackBar.open(MessagesSnackBar.ITEM_REMOVIDO_ERRO, 'Fechar', { duration: 4000 });
    });
  }

  getEdificiosCondominios(){
    this.commomService.get(`${environment.urlEdificiosCondominios}`)
      .subscribe(response =>{
        this.listTable = response.body;

        this.montarTabela(this.listTable);
      });
  }

  montarTabela(list: any){      
    for (let i = 0; i < list.nome.length; i++) {
      let dado: any = {};
      dado.id = list.id[i];
      dado.nome = list.nome[i];
      dado.zelador = list.zelador[i];
      dado.referencia = list.referencia[i];
      dado.telefone1 = list.telefone1[i];
      dado.telefone2 = list.telefone2[i];
      dado.celular1 = list.celular1[i];
      dado.celular2 = list.celular2[i];
      dado.endereco = `${list.enderecos[i].logradouro} ${list.enderecos[i].numero}, ${list.enderecos[i].cep}`;
      dado.flagAtivo = list.flagAtivo[i];
      this.preencheTable.push(dado);
    }
    this.dataSource = new MatTableDataSource(this.preencheTable);
    this.dataSource.paginator = this.paginator;
  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
