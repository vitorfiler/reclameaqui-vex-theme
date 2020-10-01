import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from './../../_constants/messagesSnackBar';
import { CommomService } from './../../services/commom.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParceiroCarga } from './../../_models/parceiro-carga';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-parceiros-carga',
  templateUrl: './parceiros-carga.component.html',
  styleUrls: ['./parceiros-carga.component.scss']
})
export class ParceirosCargaComponent implements OnInit {

  listPartner: ParceiroCarga[] = [];

  displayedColumns = ['Id', 'Nome', 'Anuncio Simples', 'Destaque', 'Super Destaque'];
  dataSource: MatTableDataSource<ParceiroCarga>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private commomService: CommomService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners(){
    this.commomService.get(`${environment.parceiros.urlCarga}`)
      .subscribe(response =>{
        this.listPartner = response.body;
        
        this.dataSource = new MatTableDataSource(this.listPartner);
        this.dataSource.paginator = this.paginator;
      });
  }

  atualizar(){

    let request = JSON.parse(JSON.stringify(this.listPartner));
    
    request.forEach(element => { delete element.oParceiro; });

    this.commomService.put(`${environment.parceiros.urlCarga}`, request)
      .subscribe(() =>{
        this.snackBar.open(MessagesSnackBar.EDITADO, 'Fechar', { duration: 4000 });
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(MessagesSnackBar.EDITADO_ERRO, 'Fechar', { duration: 4000 });
      });
  }
}
