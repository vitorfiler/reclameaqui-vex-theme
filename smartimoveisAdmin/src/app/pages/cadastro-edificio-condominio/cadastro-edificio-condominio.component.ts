import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { trackByRoute } from 'src/@vex/utils/track-by';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { environment } from 'src/environments/environment';
import { OrdemFotos } from '../../_models/ordem-fotos';
import { TipoUpload } from 'src/app/_models/tipo-upload';
import { EdificiosCondominios } from 'src/app/_models/edificios-condominios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { Endereco } from 'src/app/_models/endereco';

export interface UserInfo {
  name: string;
  phoneNumber: number;
  email: string;
  address: any;
  zipCode: number;
  cityState: any;
  nameOnCard: string;
  creditCardNumber: number;
  expirationDate: number;
}
@Component({
  selector: 'vex-help-center',
  templateUrl: './cadastro-edificio-condominio.component.html',
  styleUrls: ['./cadastro-edificio-condominio.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class CadastroEdificioCondominioComponent implements OnInit {
  
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  files1: any = [];
  files2: any = [];
  files3: any = [];
  visible = false;
  inputType = 'password';
  reclamacaoId = '';
  nomeEmpresa = '';
  idSelectEmp = 0;
  personalInfoComplete = true;
  addressComplete = false;
  creditCardComplete = false;
  completedOrder = false;
  finish = false
  empresas = this.getEmpresas();
  stepOne = true;
  stepTwo = false;
  stepThree = false;
  myControl = new FormControl();
  formSelectEmp: FormGroup;
  formDadosEdificio: FormGroup;
  formularioOrdem1: FormGroup;
  formularioOrdem2: FormGroup;
  ordemFotos = new OrdemFotos();
  customer = false;
  edicao = false;
  fotosPlantas: Boolean = true;
  fotosAreas: Boolean = true;
  fotosEdificioCondominio: Boolean = true

  ordem0: number;
  ordem1: number;
  ordem2: number;
  ordem3: number;
  ordem4: number;
  ordem5: number;
  ordem6: number;
  ordem7: number;
  ordem8: number;
  ordem9: number;

  nome: string = '';
  numero: string = ''
  zelador: string = ''
  telefone1: string = ''
  telefone2: string = ''
  celular1: string = ''
  celular2: string = ''
  logradouro: string = ''

  listFiles1: any = [];
  listFiles2: any = [];
  listFiles3: any = [];
  listaPlantas: any = [];
  listaAreas: any = [];
  listaFotosImovel: any = [];
  listaOrdem: any = [];
  preencheFotos: OrdemFotos[] = [];
  preencheFotosArea: OrdemFotos[] = [];
  preencheFotosCondominio: OrdemFotos[] = [];
  edificioCondominioEdited: any;
  idEdificioEdited;
  register = 'Cadastrar'
  
  constructor(private cd: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    private commomService: CommomService,
    private snackBar: MatSnackBar) { 
      
    }

  ngOnInit() {
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
     } 
    this.montarFormularioVazio();


    this.formSelectEmp = this.fb.group({
      selectEmp: ['', Validators.required]
    });

    this.idEdificioEdited = window.localStorage.getItem('idEdificio');
    window.localStorage.removeItem('idEdificio')
    if(this.idEdificioEdited == null || this.idEdificioEdited == ''){
      this.montarFormularioVazio();
    }
    else {
      this.register = 'Editar'
      this.buscarFotos();
      this.montarFormularioEditar();
    }
  }

  alterarOrdem(){
  }

  buscarFotos(){
    let idEdificio = this.idEdificioEdited;
    this.commomService.getFotosEdificio(`${environment.urlFotosEdificio}`, idEdificio).subscribe(response =>{
      
      this.listaAreas = response.body.fotosAreaEdificio;            
      this.listaPlantas = response.body.fotosPlantaEdificio;
      this.listaFotosImovel = response.body.fotosEdificio;


      this.montarPlantas(this.listaPlantas);
      this.montarFotosImovel(this.listaFotosImovel);
      this.montarAreas(this.listaAreas);
    });
  }


  montarFotosImovel(list: any){
    if(list.length){      
      for (let i = 0; i < list.length; i++) {
        //if(i==9)break;
        // console.log(list[i].nomeFoto);
        let edificio = new OrdemFotos();
        edificio.id = list[i].id
        edificio.endereco = list[i].caminho
        edificio.ordem = list[i].ordem
        this.preencheFotosCondominio.push(edificio); 
      }          
      this.preencheFotosCondominio = this.preencheFotosCondominio.sort((a,b) => {
        if(a.ordem  > b.ordem){
          return 1;
        }
        if(a.ordem  < b.ordem){
          return -1;
        }
      });
    }else{
      this.fotosEdificioCondominio = false;
    }
  }

  montarPlantas(list: any){
    if(list.length){
      for (let i = 0; i < list.length; i++) {
        //if(i==9)break;
        let planta = new OrdemFotos();
        planta.id = list[i].id
        planta.endereco = list[i].caminho
        planta.ordem = list[i].ordem
        this.preencheFotos.push(planta);
      }  
      this.preencheFotos = this.preencheFotos.sort((a,b) => {
        if(a.ordem  > b.ordem){
          return 1;
        }
        if(a.ordem  < b.ordem){
          return -1;
        }
      });  
    }else{
      this.fotosPlantas = false;
    }
  }

  montarAreas(list: any){
    if(list.length){
      // this.montarOrdens(list);
      for (let i = 0; i < list.length; i++) {
        let planta = new OrdemFotos();
        planta.id = list[i].id
        planta.endereco = list[i].caminho
        planta.ordem = list[i].ordem
        this.preencheFotosArea.push(planta)
      } 
      this.preencheFotosArea = this.preencheFotosArea.sort((a,b) => {
        if(a.ordem  > b.ordem){
          return 1;
        }
        if(a.ordem  < b.ordem){
          return -1;
        }
      });  
    }else{
      this.fotosAreas = false;
    }
  }
  
  montarFormularioVazio(){
    this.formDadosEdificio = this.fb.group({
      idRef: ['', Validators.required],
      nome: ['', Validators.required],
      zelador: ['', Validators.required],
      telefone1: ['', Validators.required],
      telefone2: ['', Validators.required],
      celular1: ['', Validators.required],
      celular2: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      cep: ['', Validators.required],
      complemento: [''],
      latitude: [''],
      longitude: ['']
    });
  }

  montarFormularioEditar(){
    this.edicao = true
    this.commomService.getIdParamsEdificio(`${environment.urlGetDadosEdificioCondominioId}`, this.idEdificioEdited, 'true').subscribe(response=>{
      this.edificioCondominioEdited = response.body;
      this.montarFormulario();
    })
  }

  montarFormulario(){
    this.formDadosEdificio = this.fb.group({
      idRef: [this.edificioCondominioEdited.referencia, Validators.required],
      nome: [this.edificioCondominioEdited.nome, Validators.required],
      zelador: [this.edificioCondominioEdited.zelador, Validators.required],
      telefone1: [this.edificioCondominioEdited.telefone1, Validators.required],
      telefone2: [this.edificioCondominioEdited.telefone2, Validators.required],
      celular1: [this.edificioCondominioEdited.celular1, Validators.required],
      celular2: [this.edificioCondominioEdited.celular2, Validators.required],
      logradouro: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.logradouro ? this.edificioCondominioEdited.oEndereco.logradouro : '', Validators.required],
      numero: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.numero ? this.edificioCondominioEdited.oEndereco.numero : '', Validators.required],
      complemento: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.complemento ? this.edificioCondominioEdited.oEndereco.complemento : ''],
      bairro: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.bairro ? this.edificioCondominioEdited.oEndereco.bairro : '', Validators.required],
      cidade: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.cidade ? this.edificioCondominioEdited.oEndereco.cidade : '', Validators.required],
      uf: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.uf ? this.edificioCondominioEdited.oEndereco.uf : '', Validators.required],
      cep: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.cep ? this.edificioCondominioEdited.oEndereco.cep : '', Validators.required],
      latitude: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.latitude ? this.edificioCondominioEdited.oEndereco.latitude : ''],
      longitude: [this.edificioCondominioEdited.oEndereco && this.edificioCondominioEdited.oEndereco.longitude ? this.edificioCondominioEdited.oEndereco.longitude : '']
    });
  }


  getEmpresas() {
    var empresas = localStorage.getItem("empresas");
    if (empresas != null) return JSON.parse(empresas);
  }

  getNomeEmpresa() {
    // if (this.idSelectEmp == 0) {
    //   return '';
    // }
    // else {
    //   var emp = this._filterById(this.idSelectEmp);
    //   return emp[0].nome;
    // }
  }

  getEmailEmpresa(id) {
    // if (id == 0) {
    //   return '';
    // }
    // else {
    //   var emp = this._filterById(this.idSelectEmp);
    //   return emp[0].email;
    // }
  }

  selecionarEmpresaSubmit() {
    this.personalInfoComplete = true;
    this.addressComplete = false;
    this.stepOne = true;
    this.stepTwo = false;
    this.customer = false;
  }

  envioDados() {
    this.personalInfoComplete = false;
    this.addressComplete = true;
    this.stepTwo = true;
    this.customer = true;
    // this.nomeEmpresa = this.getNomeEmpresa();
  }

  proximo(){
    this.addressComplete = false;
    this.creditCardComplete = true;
    this.stepThree = true;
  }

  realizaUploadFotosOrdem(id: any) {
    var body: any = {}

    this.preencheFotosCondominio.forEach(foto => {
      body = {edficioId: +id, fotoId: foto.id, ordem: +foto.ordem, tipoFoto: 1}
      this.commomService.alteraOrdemFoto("/Edificios/fotos-edificio-ordem", body).then((data)=>{
        console.log(JSON.stringify(data));
      }).catch(() => {
        console.log("error");
      });
    });
    this.preencheFotos.forEach(foto => {
      body = {edficioId: id, FotoId: foto.id, Ordem: +foto.ordem, TipoFoto: 5}
      this.commomService.alteraOrdemFoto("/Edificios/fotos-edificio-ordem", body).then((data)=>{
        console.log(JSON.stringify(data));
      }).catch(() => {
        console.log("error");
      });
    });
    this.preencheFotosArea.forEach(foto => {
      body = {edficioId: id, FotoId: foto.id, Ordem: +foto.ordem, TipoFoto: 4}
      this.commomService.alteraOrdemFoto("/Edificios/fotos-edificio-ordem", body).then((data)=>{
        console.log(JSON.stringify(data));
      }).catch(() => {
        console.log("error");
      });
    });
  }

  
  enviarArquivos(upload1: number, upload2: number, upload3: number, idEdificio) {
    let tipoUpload: number = 0
    for (let i = 1; i < 4; i++) {

      switch(i){
        case 1: tipoUpload = upload1; break;
        case 2: tipoUpload = upload2; break;
        case 3: tipoUpload = upload3; break;
      }
    
      this['listFiles'+ i].forEach((element, index) => {
        
        let fileToUpload = element;
        
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        switch (tipoUpload) {
          case 1: formData.append('TipoUpload', TipoUpload.FotoEdificio.toString()); break;
          case 2: formData.append('TipoUpload', TipoUpload.FotoImovel.toString()); break;
          case 3: formData.append('TipoUpload', TipoUpload.FotoVendedor.toString()); break;
          case 4: formData.append('TipoUpload', TipoUpload.FotoAreaEdificio.toString()); break;
          case 5: formData.append('TipoUpload', TipoUpload.FotoPlantaEdificio.toString()); break;
          case 6: formData.append('TipoUpload', TipoUpload.FotoAreaImovel.toString()); break;
          case 7: formData.append('TipoUpload', TipoUpload.FotoPlantaImovel.toString()); break;
        }
        formData.append('IdReferencia', idEdificio);
        
        setTimeout(() => {
          this.commomService.upload(formData).then(() => {
          }).catch(() => {
            console.log("error");
          });
        }, index * 1500); 

      });      
    }
  }


  finalizarSubmit(uploadArea: number, uploadPlantas: number, uploadFotoEdificio: number) {
    let edificioCondominio = new EdificiosCondominios();
    let endereco = new Endereco();
    // this.edificioCondominio = this.formDadosEdificio.value;

    edificioCondominio.referencia = this.formDadosEdificio.get('idRef').value.toString();
    edificioCondominio.nome = this.formDadosEdificio.get('nome').value;
    edificioCondominio.zelador = this.formDadosEdificio.get('zelador').value;
    edificioCondominio.telefone1 = this.formDadosEdificio.get('telefone1').value;
    edificioCondominio.telefone2 = this.formDadosEdificio.get('telefone2').value;
    edificioCondominio.celular1 = this.formDadosEdificio.get('celular1').value;
    edificioCondominio.celular2 = this.formDadosEdificio.get('celular2').value;
    endereco.logradouro = this.formDadosEdificio.get('logradouro').value;
    endereco.numero = this.formDadosEdificio.get('numero').value;
    endereco.complemento = this.formDadosEdificio.get('complemento').value;
    endereco.bairro = this.formDadosEdificio.get('bairro').value;
    endereco.cidade = this.formDadosEdificio.get('cidade').value;
    endereco.uf = this.formDadosEdificio.get('uf').value;
    endereco.cep = this.formDadosEdificio.get('cep').value;
    endereco.latitude = this.formDadosEdificio.get('latitude').value;
    endereco.longitude = this.formDadosEdificio.get('longitude').value;

    let body: any = edificioCondominio;
    body.oEndereco = endereco;
    body.flagAtivo = true;

    for (let i = 1; i < 4; i++) {
      if(!this['listFiles'+i].length){
        switch (i) {
          case 1: uploadArea = null; break;
          case 2: uploadPlantas = null; break;
          case 3: uploadFotoEdificio = null; break;
        }
      }
    }    
  
    if(this.idEdificioEdited == null || this.idEdificioEdited == '' || !this.idEdificioEdited){
      this.commomService.post(`${environment.urlCadEdificio}`, body)
      .subscribe(response=>{
        this.realizaUploadFotosOrdem(response.body.id);
        this.enviarArquivos(uploadArea, uploadPlantas, uploadFotoEdificio, response.body.id); //aqui vai dar pau
        this.snackBar.open(MessagesSnackBar.CADASTRO, 'Fechar', { duration: 4000 });
        this.router.navigate(['/edificios-condominios']);
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 4000 });
        this.router.navigate(['/cad-edficios-condominios']);

      });
    }     
    else{
      body.oEndereco.id = this.edificioCondominioEdited.enderecoId;
      body.id = parseInt(this.idEdificioEdited);

      this.commomService.put(`${environment.urlCadEdificio}`, body)
      .subscribe(response => {
        this.realizaUploadFotosOrdem(response.body.id);
        this.enviarArquivos(uploadArea, uploadPlantas, uploadFotoEdificio, this.idEdificioEdited);
        this.snackBar.open(MessagesSnackBar.EDITADO, 'Fechar', { duration: 4000 });
        this.router.navigate(['/edificios-condominios']);
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(MessagesSnackBar.EDITADO_ERRO, 'Fechar', { duration: 4000 });
        this.router.navigate(['/cad-edficios-condominios']);

      });
    }
    //submit formulario
  }

  cancelar() {
    this.router.navigate(['/edificios-condominios']);
  }

  retornaStatus(id) {
    switch (id) {
      case 1: return "Aguardando Analise";
      case 2: return "Iniciada";
      case 3: return "Improcedente";
      case 4: return "Respondido";
      case 5: return "Finalizado";
      case 6: return "Cancelada";
    }
  }

  icSearch = icSearch;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;

  togglePassword() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  // trackByRoute = trackByRoute;


  // private _filter(value: string): Empresa[] {
  //   if (value == undefined) return this.empresas;
  //   return this.empresas.filter(x => x.nome.toLowerCase().includes(value.toLowerCase()));
  // }

  // private _filterById(value: number): Empresa {
  //   return this.empresas.filter(x => x.id == value);
  // }

  uploadFile(event, idLista: number) {
    
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      var fileElement = <File>event[index]
        // if(idLista == 3){
          // this['listFiles' + idLista] = []
          // this['files' + idLista] = []
        // }
        this['listFiles' + idLista].push(fileElement);
        this['files' + idLista].push(element.name)

    }
  }
  deleteAttachment(index, idLista: number) {
    this['files' + idLista].splice(index, 1);
    this['listFiles' + idLista].splice(index, 1);
  }

  deleteImage(fotoId, tipoFoto){

    let body = { edficioId: +this.idEdificioEdited, fotoId: fotoId, tipoFoto: tipoFoto }

    this.commomService.deleteFoto(`${environment.urlDeleteFotosEdificio}`, body)
      .subscribe(()=>{
      });

    switch (tipoFoto){
      case 1: 
      this.preencheFotosCondominio = this.preencheFotosCondominio.filter(foto => { 
        return foto.id != parseInt(fotoId);
      }); break;
      case 4: 
      this.preencheFotosArea = this.preencheFotosArea.filter(foto => { 
        return foto.id != parseInt(fotoId);
      }); break;
      case 5: 
      this.preencheFotos = this.preencheFotos.filter(foto => { 
        return foto.id != parseInt(fotoId);
      }); break;
    }      
  }
}

