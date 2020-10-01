import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParceiroXml } from './../../_models/parceiro-xml';
import { Parceiro } from './../../_models/parceiro';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { CommomService } from 'src/app/services/commom.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Variaveis } from 'src/app/_models/variaveis';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';

@Component({
  selector: 'vex-cadastro-xml',
  templateUrl: './cadastro-xml.component.html',
  styleUrls: ['./cadastro-xml.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class CadastroXmlComponent implements OnInit {

  listPartner: Parceiro[] = [];
  listVariables: Variaveis[] = [];
  listXMLs: ParceiroXml[] = [];

  displayedColumns = ['Nome', 'Descricao'];
  dataSource: MatTableDataSource<Variaveis>;
  dataSource2: MatTableDataSource<Variaveis>;
  dataSource3: MatTableDataSource<Variaveis>;

  formDataPartnerXML: FormGroup;

  colsBreakpoint: number;
  idParceiro: string;
  idXML: number;
  editedXML: boolean = false;
  xmlEdit: ParceiroXml;
  register = 'Cadastrar'
  partnerEdit: Parceiro;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private commomService: CommomService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.colsBreakpoint = (window.innerWidth < 900) ? 1 : 2;
    this.idParceiro = window.localStorage.getItem('idParceiro');
    window.localStorage.removeItem('idParceiro');
    
    this.formDataPartnerXML = this.fb.group({
      partnerSelect: ['', Validators.required],
      fieldXmlImovelInicio: ['', Validators.required],
      fieldXmlImovelCorpo: ['', Validators.required],
      fieldXmlImovelFim: ['', Validators.required],
      fieldXmlFotosInicio: ['', Validators.required],
      fieldXmlFotosCorpo: ['', Validators.required],
      fieldXmlFotosFim: ['', Validators.required],
      fieldXmlVideosInicio: ['', Validators.required],
      fieldXmlVideosCorpo: ['', Validators.required],
      fieldXmlVideosFim: ['', Validators.required]
    });
    this.getXMLs();
  }


  onResize(event?) {
    this.colsBreakpoint = (event && event.target.innerWidth < 900) ? 1 : 2;
  }

  marginLeftDynamic(){
    return this.colsBreakpoint == 1 ? { marginLeft: '0%'} : { marginLeft: '10%'};
  }

  mountResquest(): ParceiroXml{
    let partnerXmlRequest: ParceiroXml = new ParceiroXml;
    let partner: Parceiro = this.formDataPartnerXML.get('partnerSelect').value;

    partnerXmlRequest.parceiroId = partner.id ? partner.id : parseInt(this.idParceiro);
    partnerXmlRequest.xmlImovelInicio = this.formDataPartnerXML.get('fieldXmlImovelInicio').value;
    partnerXmlRequest.xmlImovelCorpo = this.formDataPartnerXML.get('fieldXmlImovelCorpo').value;
    partnerXmlRequest.xmlImovelFim = this.formDataPartnerXML.get('fieldXmlImovelFim').value;
    partnerXmlRequest.xmlFotosInicio = this.formDataPartnerXML.get('fieldXmlFotosInicio').value;
    partnerXmlRequest.xmlFotosCorpo = this.formDataPartnerXML.get('fieldXmlFotosCorpo').value;
    partnerXmlRequest.xmlFotosFim = this.formDataPartnerXML.get('fieldXmlFotosFim').value;
    partnerXmlRequest.xmlVideosInicio = this.formDataPartnerXML.get('fieldXmlVideosInicio').value;
    partnerXmlRequest.xmlVideosCorpo = this.formDataPartnerXML.get('fieldXmlVideosCorpo').value;
    partnerXmlRequest.xmlVideosFim = this.formDataPartnerXML.get('fieldXmlVideosFim').value;

    return partnerXmlRequest;
  }

  cancelar() {
    this.router.navigate(['/parceiros']);
  }

  registerXML(){
    let request = this.mountResquest();    

    if(this.idParceiro == null || this.idParceiro == '' || !this.idParceiro || this.idXML == null){  
      this.commomService.post(`${environment.parceiros.urlXml}`, request)
        .subscribe(() => {
          this.snackBar.open(MessagesSnackBar.CADASTRO, 'Fechar', { duration: 4000 });
          this.formDataPartnerXML.reset();
        },
        (error) => {
          console.log(error.message);
          this.snackBar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 4000 });
        });
    }
    else {
      request.id = this.idXML;

      this.commomService.put(`${environment.parceiros.urlXml}`, request)
      .subscribe(() => {
        this.formDataPartnerXML.reset();
        this.router.navigate(['/parceiros']);
        this.snackBar.open(MessagesSnackBar.EDITADO, 'Fechar', { duration: 4000 });
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(MessagesSnackBar.EDITADO_ERRO, 'Fechar', { duration: 4000 });
      });
    }
  }

  getXMLs(){
    this.commomService.get(`${environment.parceiros.urlXml}`)
      .subscribe(response =>{
        this.listXMLs = response.body;
        this.getPartners();
        this.getVariables();
      });
  }

  getPartners(){
    this.commomService.get(`${environment.parceiros.url}`)
      .subscribe(response =>{
        this.listPartner = response.body;
        this.mountXML();
      });
  }

  getVariables(){
    this.commomService.get(`${environment.parceiros.urlVariaveisXML}`)
    .subscribe(response =>{
      this.listVariables = response.body;

      this.dataSource = new MatTableDataSource(this.listVariables.reverse());
      this.dataSource.paginator = this.paginator;
    });
  }

  mountXML(){    
    
    if(this.idParceiro == null || this.idParceiro == '' || !this.idParceiro){
      this.register = 'Cadastrar'

    } else {
      this.register = 'Editar'

      this.listXMLs.forEach(xml => { 
        if(xml.parceiroId.toString() == this.idParceiro){ 
          this.xmlEdit = xml; this.idXML = xml.id
          this.editedXML = true;
        }});
      
      this.listPartner.forEach(partner => {
        if(partner.id == this.xmlEdit.parceiroId){ this.partnerEdit = partner; }
      });

      this.formDataPartnerXML = this.fb.group({
        partnerSelect: [this.partnerEdit],
        fieldXmlImovelInicio: [this.xmlEdit.xmlImovelInicio, Validators.required],
        fieldXmlImovelCorpo: [this.xmlEdit.xmlImovelCorpo, Validators.required],
        fieldXmlImovelFim: [this.xmlEdit.xmlImovelFim, Validators.required],
        fieldXmlFotosInicio: [this.xmlEdit.xmlFotosInicio, Validators.required],
        fieldXmlFotosCorpo: [this.xmlEdit.xmlFotosCorpo, Validators.required],
        fieldXmlFotosFim: [this.xmlEdit.xmlFotosFim, Validators.required],
        fieldXmlVideosInicio: [this.xmlEdit.xmlVideosInicio, Validators.required],
        fieldXmlVideosCorpo: [this.xmlEdit.xmlVideosCorpo, Validators.required],
        fieldXmlVideosFim: [this.xmlEdit.xmlVideosFim, Validators.required]
      });
    }
  }

}
