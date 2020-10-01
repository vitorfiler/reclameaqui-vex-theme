import { ControlaArquivoXml } from './../../_models/controla-arquivo-xml';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { fadeInUp400ms } from './../../../@vex/animations/fade-in-up.animation';
import { stagger40ms } from './../../../@vex/animations/stagger.animation';
import { Router } from '@angular/router';
import { CommomService } from './../../services/commom.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Parceiro } from './../../_models/parceiro';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-parceiros',
  templateUrl: './parceiros.component.html',
  styleUrls: ['./parceiros.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class ParceirosComponent implements OnInit {

  listPartner: Parceiro[] = [];

  displayedColumns = ['Id', 'Nome', 'Editar Parceiro', 'Tag Simples', 'Tag Destaque', 'Tag Superdestaque', 'Nome do Arquivo XML', 'Editar XML'];
  displayedColumns2 = ['Nome', 'Flag Arquivo XML', 'Data Solicitação', 'Mensagem'];
  dataSource: MatTableDataSource<Parceiro>;
  dataSource2: MatTableDataSource<ControlaArquivoXml>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private commomService: CommomService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPartners();
    this.getControlaArquivoXML();
  }

  cadastro(){
    this.router.navigate(['/cad-parceiro']);
  }

  cadastroXML(){
    this.router.navigate(['/cad-xml']);
  }

  editarParceiro(ref: string){
    window.localStorage.setItem('idParceiro', JSON.stringify(ref));
    this.router.navigate(['/cad-parceiro'])
  }

  async editarXML(ref: string){

    let listXMLs = await this.getXmlSync();
    let xmlValidate = listXMLs.find(xml => xml.parceiroId == ref);

    if (xmlValidate){
      window.localStorage.setItem('idParceiro', JSON.stringify(ref));
      this.router.navigate(['/cad-xml'])
    }
    else { this.snackBar.open(MessagesSnackBar.SEM_XML, 'Fechar', { duration: 4000 }); }
      
  }

  getPartners(){
    this.commomService.get(`${environment.parceiros.url}`)
      .subscribe(response =>{
        this.listPartner = response.body;

        this.dataSource = new MatTableDataSource(this.listPartner);
        this.dataSource.paginator = this.paginator;
      });
  }

  getControlaArquivoXML(){
    this.commomService.get(`${environment.parceiros.urlControlaArquivoXML}`)
      .subscribe(response =>{
        let listControlaXml: ControlaArquivoXml[] = response.body;

        listControlaXml.forEach(controlaXml => {
          controlaXml.nomeParceiro = controlaXml.oParceiro.nome;
          controlaXml.dataSolicitacao = this.commomService.dateFormat(controlaXml.dataSolicitacao);
        });

        this.dataSource2 = new MatTableDataSource(listControlaXml);
        this.dataSource2.paginator = this.paginator;
      });
  }

  getXmlSync(): any{        
    return new Promise(resolve => {
      this.commomService.getPromisse(`${environment.parceiros.urlXml}`)
      .then(response => {
         resolve(response.body); });
    });
  }
}
