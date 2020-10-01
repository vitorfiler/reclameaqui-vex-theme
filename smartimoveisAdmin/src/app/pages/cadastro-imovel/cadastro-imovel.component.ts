import { OrdemFotos } from './../../_models/ordem-fotos';
import { Imovel } from './../../_models/imovel';
import { EdificiosCondominios } from 'src/app/_models/edificios-condominios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { trackByRoute } from 'src/@vex/utils/track-by';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { DadosImovel } from 'src/app/_models/dados-imovel';
import { DadosArquivoImportacao } from 'src/app/_models/dados-arquivo-importacao';
import { Caracteristicas } from 'src/app/_models/checkbox-caracteristicas';
import { environment } from 'src/environments/environment';
import { TipoUpload } from 'src/app/_models/tipo-upload';
import { Endereco } from 'src/app/_models/endereco';
import { FlexFillDirective } from '@angular/flex-layout';

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
  templateUrl: './cadastro-imovel.component.html',
  styleUrls: ['./cadastro-imovel.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class CadastroImovelComponent implements OnInit {
  
  icVisibility = icVisibility;
  files1: any = [];
  files2: any = [];
  files3: any = [];
  files4: any = [];
  visible = false;
  inputType = 'password';
  reclamacaoId = '';
  nomeEmpresa = '';
  idSelectEmp = 0;
  personalInfoComplete = true;
  addressComplete = false;
  creditCardComplete = false;
  screen4 = false;
  completedOrder = false;
  finish = false
  empresas = this.getEmpresas();
  stepOne = true;
  stepTwo = false;
  stepThree = false;
  stepFour = false;
  myControl = new FormControl();
  formSelectEmp: FormGroup;
  formDadosImovel: FormGroup;
  formDadosImovel2: FormGroup;
  formDadosImovel3: FormGroup;
  customer = false;
  dadosImovel = new DadosImovel();
  dadosArquivoImportacao = new DadosArquivoImportacao();
  endereco = new Endereco();
  caracteristicas = new Caracteristicas();
  listFiles1: any = [];
  listFiles2: any = [];
  listFiles3: any = [];
  listFiles4: any = [];
  jsonCadastro1 = {};
  jsonCadastro2 = {};
  jsonCadastro3= {};
  jsonCadastroEndereco= {};
  listEdificiosCondominios = [];
  imovelEdited: Imovel;
  idImovelEdited;
  edificioEdited: any;
  fotosImoveis = true;
  fotosAreas = true;
  fotosPlantas = true;
  preencheFotosImovel: OrdemFotos[] = [];
  preencheAreasImovel: OrdemFotos[] = [];
  preenchePlantasImovel: OrdemFotos[] = [];
  listFotosImovel = [];
  listFotosAreaImovel = [];
  listFotosPlantaImovel = [];
  formularioOrdem1: FormGroup;
  formularioOrdem2: FormGroup;
  formularioOrdem3: FormGroup;
  edicao = false;
  stepFotos = false;
  fotoPrincipal;
  register = 'Cadastrar'
  listTiposImoveis = ['Apartamento', 'Área', 'Casa', 'Casa Condomínio', 'Cobertura', 'Galpão/Barracão', 'Industrial', 'Loja', 'Mobiliado', 'Prédio', 'Rural', 'Sala', 'Sobrado', 'Terreno'];

    
  constructor(private cd: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    private commomService: CommomService,
    private snackBar: MatSnackBar) { }

  async ngOnInit() {
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
    } 
     
    this.montarFormularioVazio();

    this.idImovelEdited = window.localStorage.getItem('idImovel');
    window.localStorage.removeItem('idImovel');

    await this.montaEdificiosSync();

    if(this.idImovelEdited){
      this.register = 'Editar'
      this.buscarFotos();
      this.montarFormularioEditar();
    }
  }
  
  getEdificiosCondominios(): any{
    return new Promise(resolve => {
      this.commomService.getPromisse(`${environment.urlEdificiosCondominios}`)
      .then(response =>{
        resolve(response.body);
      });
    });
  }

  async montaEdificiosSync(){
    let list = await this.getEdificiosCondominios();

    for (let i = 0; i < list.nome.length; i++) {
      let dado: any = new EdificiosCondominios();
      dado.id = list.id[i];
      dado.nome = list.nome[i];
      dado.zelador = list.zelador[i];
      dado.referencia = list.referencia[i];
      dado.telefone1 = list.telefone1[i];
      dado.telefone2 = list.telefone2[i];
      dado.celular1 = list.celular1[i];
      dado.celular2 = list.celular2[i];
      dado.oEndereco = list.enderecos[i];
      delete dado.oEndereco.id;
      dado.flagAtivo = list.flagAtivo[i];
      
      this.listEdificiosCondominios.push(dado);
    }
  }

  montarFormularioEditar(){
    this.edicao = true
    this.commomService.getIdParamsImovel(`${environment.urlGetDadosImoveisId}`, this.idImovelEdited, 'true').subscribe(response=>{

      this.imovelEdited = response.body;

      this.montarFormulario();
    });
  }
  
  montarFormularioVazio(){
    this.formDadosImovel = this.fb.group({
      ref: ['', Validators.required],
      destaque: [''],
      superDestaque: [''],
      tipo: ['', Validators.required],
      edificioSelect: ['', Validators.required],
      preco: ['', Validators.required],
      precoLocacao: ['', Validators.required],
      condominio: ['', Validators.required]
    });
    this.formDadosImovel2 = this.fb.group({
      cep: [''],
      cidade: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      uf: [''],
      latitude: [''],
      longitude: [''],
      descricaoDestaque: [''],
      descricao: ['', Validators.required],
      areaUtil: ['', Validators.required],
      anoConstrucao: [''],
      dormitorios: ['', Validators.required],
      suites: [''],
      banheiros: [''],
      salas: [''],
      vagas: [''],
      elevadores: [''],
      unidadesAndar: [''],
      andar: [''],
    });
    this.formDadosImovel3 = this.fb.group({
      armarioCozinha: [''],
      armarioEmbutido: [''],
      estacionamentoVisitantes: [''],
      piscina: [''],
      depositoSubsolo: [''],
      hidromassagem: [''],
      salaoFestas: [''],
      salaoJogos: [''],
      sauna: [''],
      varanda: [''],
      lavabo: [''],
      closet: [''],
      lareira: [''],
      andarInteiro: [''],
      meioAndar: [''],
      salaAlmoco: [''],
      salaJantar: [''],
      salaIntima: [''],
      quadraPoliesportiva: [''],
      quadraSquash: [''],
      quadraTenis: [''],
      brinquedoteca: [''],
      playground: [''],
      salaGinastica: [''],
      churrasqueira: [''],
      copa: [''],
      dependenciaEmpregados: [''],
      despensa: [''],
      edicula: [''],
      quintal: [''],
    });
  }

  checked: boolean = true;

  changeValue(value) {
      this.checked = !value;
  }

  montarFormulario(){
    let imovel: Imovel = this.imovelEdited

    this.listEdificiosCondominios.forEach(edificio => {
      if(edificio.id == imovel.oEdificio.id){ this.edificioEdited = edificio; }
    });

    this.formDadosImovel = this.fb.group({
      ref: [imovel.referencia, Validators.required],
      destaque: [imovel.flagDestaque],
      superDestaque: [imovel.flagSuperDestaque],
      preco: [imovel.precoVenda, Validators.required],
      precoLocacao: [imovel.precoLocacao, Validators.required],
      edificioSelect: [this.edificioEdited],
      tipo: [imovel.tipo, Validators.required],
      condominio: [imovel.precoCondominio, Validators.required]
    });
    this.formDadosImovel2 = this.fb.group({
      cep: [imovel.oEndereco.cep],
      numero: [imovel.oEndereco.numero],
      cidade: [imovel.oEndereco.cidade],
      logradouro: [imovel.oEndereco.logradouro],
      complemento: [imovel.oEndereco.complemento],
      bairro: [imovel.oEndereco.bairro],
      uf: [imovel.oEndereco.uf],
      latitude: [imovel.oEndereco.latitude],
      longitude: [imovel.oEndereco.longitude],
      descricao: [imovel.descricao],
      areaUtil: [imovel.areaUtil, Validators.required],
      anoConstrucao: [imovel.anoConstrucao],
      dormitorios: [imovel.qtdDormitorios, Validators.required],
      suites: [imovel.qtdSuites],
      banheiros: [imovel.qtdBanheiros],
      salas: [imovel.qtdSalas],
      vagas: [imovel.qtdVagas],
      elevadores: [imovel.qtdElevador],
      unidadesAndar: [imovel.qtdUnidadesAndar],
      andar: [imovel.qtdUnidadesAndar],
    });
    this.formDadosImovel3 = this.fb.group({
      armarioCozinha: [imovel.armarioCozinha],
      armarioEmbutido: [imovel.armarioEmbutido],
      estacionamentoVisitantes: [imovel.estacionamentoVisitantes],
      piscina: [imovel.piscina],
      depositoSubsolo: [imovel.depositoSubsolo],
      hidromassagem: [imovel.hidromassagem],
      salaoFestas: [imovel.salaoFestas],
      salaoJogos: [imovel.salaoJogos],
      sauna: [imovel.sauna],
      varanda: [imovel.varanda],
      lavabo: [imovel.lavabo],
      closet: [imovel.closet],
      lareira: [imovel.lareira],
      andarInteiro: [imovel.andarInteiro],
      meioAndar: [imovel.meioAndar],
      salaAlmoco: [imovel.salaAlmoco],
      salaJantar: [imovel.salaJantar],
      salaIntima: [imovel.salaIntima],
      quadraPoliesportiva: [imovel.quadraPoliesportiva],
      quadraSquash: [imovel.quadraSquash],
      quadraTenis: [imovel.quadraTenis],
      brinquedoteca: [imovel.brinquedoteca],
      playground: [imovel.playground],
      salaGinastica: [imovel.salaGinastica],
      churrasqueira: [imovel.churrasqueira],
      copa: [imovel.copa],
      dependenciaEmpregados: [imovel.dependenciaEmpregados],
      despensa: [imovel.despensa],
      edicula: [imovel.edicula],
      quintal: [imovel.quintal],
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

  empresaSubmit(dadosImovel = new DadosImovel()) {
    let precoVenda = Number(dadosImovel.precoVenda?dadosImovel.precoVenda: 0)
    let precoLocacao = Number(dadosImovel.precoLocacao?dadosImovel.precoLocacao: 0)
    let precoCondominio = Number(dadosImovel.precoCondominio?dadosImovel.precoCondominio: 0)
    let edificio = this.formDadosImovel.get('edificioSelect').value;
    this.jsonCadastro1 = {
      "referencia": dadosImovel.referencia?dadosImovel.referencia: "",
      "flagDestaque": dadosImovel.destaque,
      "flagSuperDestaque": dadosImovel.superDestaque,
      "tipo": dadosImovel.tipo?dadosImovel.tipo: "",
      "nome": edificio.nome,         /////AQUI DEVE SEMRPE TER O NOME DIFRERENTE PARA CADASTRAR
      "edificioId": edificio.id,
      "precoVenda": precoVenda,
      "precoLocacao": precoLocacao,
      "precoCondominio": precoCondominio
    }

    this.personalInfoComplete = false;
    this.addressComplete = true;
    this.stepTwo = true;
    this.customer = true;
  }


  dadosReclamacaoSubmit(dadosArquivoImportacao = new DadosArquivoImportacao(), 
                        endereco = new Endereco(),
                        tipoUpload: number) {
    let areaUtil = Number(dadosArquivoImportacao.areaUtil?dadosArquivoImportacao.areaUtil: 0);                      
    let areaTotal = Number(dadosArquivoImportacao.areaTotal?dadosArquivoImportacao.areaTotal: 0);                      
    let qtdDormitorios = Number(dadosArquivoImportacao.qtdDormitorios?dadosArquivoImportacao.qtdDormitorios: 0);                      
    let qtdSuites = Number(dadosArquivoImportacao.qtdSuites?dadosArquivoImportacao.qtdSuites: 0);                      
    let qtdBanheiros = Number(dadosArquivoImportacao.qtdBanheiros?dadosArquivoImportacao.qtdBanheiros: 0);                      
    let qtdSalas = Number(dadosArquivoImportacao.qtdSalas?dadosArquivoImportacao.qtdSalas: 0);                      
    let qtdVagas = Number(dadosArquivoImportacao.qtdVagas?dadosArquivoImportacao.qtdVagas: 0);                      
    let qtdElevador = Number(dadosArquivoImportacao.qtdElevador?dadosArquivoImportacao.qtdElevador: 0);                      
    let qtdUnidadesAndar = Number(dadosArquivoImportacao.qtdUnidadesAndar?dadosArquivoImportacao.qtdUnidadesAndar: 0);                      
    let anoConstrucao = Number(dadosArquivoImportacao.anoConstrucao?dadosArquivoImportacao.anoConstrucao: 0);   

    this.jsonCadastro2 = {
      "descricao": dadosArquivoImportacao.descricao? dadosArquivoImportacao.descricao: "",
      "areaUtil": areaUtil,
      "areaTotal": areaTotal,
      "qtdDormitorios": qtdDormitorios,
      "qtdBanheiros": qtdBanheiros,
      "qtdSuites": qtdSuites,
      "qtdSalas": qtdSalas,
      "qtdVagas": qtdVagas,
      "qtdElevador": qtdElevador,
      "qtdUnidadesAndar": qtdUnidadesAndar,
      "anoConstrucao": anoConstrucao
    }
    // dadosArquivoImportacao;
    if (endereco.id){
    this.jsonCadastroEndereco =  {"oEndereco": {
        "id": endereco.id,
        "logradouro": endereco.logradouro? endereco.logradouro : "",
        "numero": endereco.numero? endereco.numero : "",
        "complemento": endereco.complemento? endereco.complemento: "",
        "bairro": endereco.bairro? endereco.bairro: "",
        "cidade": endereco.cidade? endereco.cidade: "",
        "uf": endereco.uf? endereco.uf: "",
        "cep": endereco.cep? endereco.cep : "",        
        "latitude": endereco.latitude? endereco.latitude : "",
        "longitude": endereco.longitude? endereco.longitude : ""
      }
    } 
    }
    else{
      this.jsonCadastroEndereco =  {"oEndereco": {
        "logradouro": endereco.logradouro? endereco.logradouro : "",
        "numero": endereco.numero? endereco.numero : "",
        "complemento": endereco.complemento? endereco.complemento: "",
        "bairro": endereco.bairro? endereco.bairro: "",
        "cidade": endereco.cidade? endereco.cidade: "",
        "uf": endereco.uf? endereco.uf: "",
        "cep": endereco.cep? endereco.cep : "",
        "latitude": endereco.latitude? endereco.latitude : "",
        "longitude": endereco.longitude? endereco.longitude : "",
      }
    }
    }
        this.addressComplete = false;
        this.creditCardComplete = true;
        this.stepThree = true;
  }

  proximoStep4(){
    this.creditCardComplete = false;
    this.stepFotos = true;
  }

  buscarFotos(){

    this.commomService.getFotosImovel(`${environment.urlFotosImovel}`, this.idImovelEdited).subscribe(response =>{
      
      this.listFotosImovel = response.body.fotosImovel;            
      this.listFotosAreaImovel = response.body.fotosAreaImovel;
      this.listFotosPlantaImovel = response.body.fotosPlantaImovel;

      if(this.montarFotos(this.listFotosImovel)){
        this.preencheFotosImovel = this.montarFotos(this.listFotosImovel).sort((a,b) => {
          if(a.ordem  > b.ordem){
            return 1;
          }
          if(a.ordem  < b.ordem){
            return -1;
          }
        });

        this.fotoPrincipal = this.preencheFotosImovel[0].endereco;
      }
      else{ this.fotosImoveis = false; }

      if(this.montarFotos(this.listFotosAreaImovel)){
        this.preencheAreasImovel = this.montarFotos(this.listFotosAreaImovel).sort((a,b) => {
          if(a.ordem  > b.ordem){
            return 1;
          }
          if(a.ordem  < b.ordem){
            return -1;
          }
        });
      }
      else{ this.fotosAreas = false; }

      if(this.montarFotos(this.listFotosPlantaImovel)){
        this.preenchePlantasImovel = this.montarFotos(this.listFotosPlantaImovel).sort((a,b) => {
          if(a.ordem  > b.ordem){
            return 1;
          }
          if(a.ordem  < b.ordem){
            return -1;
          }
        });
      }
      else{ this.fotosPlantas = false; }
    });
  }

  montarFotos(list: any): OrdemFotos[]{
    if(list.length){   
      let lsOrdem: OrdemFotos[] = [];
      for (let i = 0; i < list.length; i++) {
        if(i==9)break;
        let ordem = new OrdemFotos();
        ordem.id = list[i].id
        ordem.endereco = list[i].caminho
        ordem.ordem = list[i].ordem
        lsOrdem.push(ordem);
      }
      return lsOrdem;
    }
  }

  realizaUploadFotosOrdem(id: any) {
    var body: any = {}

    this.preencheFotosImovel.forEach(foto => {
      body = {ImovelId: id, FotoId: foto.id, Ordem: +foto.ordem, TipoFoto: 2}
      this.commomService.alteraOrdemFoto("/Imoveis/fotos-imovel-ordem", body).then((data)=>{
        console.log(JSON.stringify(data));
      }).catch(() => {
        console.log("error");
      });
    });
    this.preencheAreasImovel.forEach(foto => {
      body = {ImovelId: id, FotoId: foto.id, Ordem: +foto.ordem, TipoFoto: 6}
      this.commomService.alteraOrdemFoto("/Imoveis/fotos-imovel-ordem", body).then((data)=>{
        console.log(JSON.stringify(data));
      }).catch(() => {
        console.log("error");
      });
    });
    this.preenchePlantasImovel.forEach(foto => {
      body = {ImovelId: id, FotoId: foto.id, Ordem: +foto.ordem, TipoFoto: 7}
      this.commomService.alteraOrdemFoto("/Imoveis/fotos-imovel-ordem", body).then((data)=>{
        console.log(JSON.stringify(data));
      }).catch(() => {
        console.log("error");
      });
    });
  }

  enviarArquivos(upload1: number, upload2: number, upload3: number, upload4: number, idImovel) {
    let tipoUpload = 0
    for (let i = 1; i < 5; i++) {
      switch(i){
        case 1: tipoUpload = upload1; break;
        case 2: tipoUpload = upload2; break;
        case 3: tipoUpload = upload3; break;
        case 4: tipoUpload = upload4; break;        
      }
      //if(this.preencheFotosImovel.length > 0 && tipoUpload == 2 && this['listFiles1'].length > 0){ tipoUpload = 8; }

      this['listFiles'+i].forEach((element, index) => {
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
          case 8: formData.append('TipoUpload', TipoUpload.FotoPrincipalImovelUpdate.toString()); break;
        }
        formData.append('IdReferencia', idImovel);

        setTimeout(() => {
          this.commomService.upload(formData).then(() => {
          }).catch(() => {
            console.log("error");
          });
        }, index * 1500); 

      });
    }
  }

  finalizarSubmit(caracteristicas = new Caracteristicas(), uploadFotoPrincipal: number, uploadPlantas: number, uploadArea: number, uploadFotoImovel: number,) {
    this.jsonCadastro3 = this.formDadosImovel3.value;

    var body: any = {}

    for (let i = 1; i < 5; i++) {
      if(!this['listFiles'+i].length){
        switch (i) {
          case 1: uploadFotoPrincipal = null; break;          
          case 2: uploadPlantas = null; break;
          case 3: uploadArea = null; break;
          case 4: uploadFotoImovel = null; break;
        }
      }
    }    

    if(this.idImovelEdited == null || this.idImovelEdited == '' || !this.idImovelEdited){
      body = {...this.jsonCadastro1, ...this.jsonCadastro2, ...this.jsonCadastro3, ...this.jsonCadastroEndereco};
      body.flagAtivo = true;
       
      this.commomService.post(`${environment.urlCadImoveis}`, body)
      .subscribe(response=>{
        console.log(response);
        this.realizaUploadFotosOrdem(response.body.id);
        this.enviarArquivos(uploadFotoPrincipal, uploadPlantas, uploadArea, uploadFotoImovel, response.body.id);
        this.snackBar.open(MessagesSnackBar.CADASTRO, 'Fechar', { duration: 4000 });
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 4000 });
        this.router.navigate(['/cad-imoveis']);
      })
      .add(()=> {
        this.router.navigate(['/imoveis-ativos']);
      });
    }
    else{
      
      this.atualizaDadosForm1();
      this.atualizaDadosForm2();

      body = {...this.jsonCadastro1, ...this.jsonCadastro2, ...this.jsonCadastro3, ...this.jsonCadastroEndereco};
      body.id = parseInt(this.idImovelEdited);
      body.usuarioAlteracao = true;
      //body.dataAlteracao = this.commomService.dateFormat(new Date());
      body.flagAtivo = true;

      this.commomService.put(`${environment.urlCadImoveis}`, body)
      .subscribe(response=>{
        console.log(response);
        this.realizaUploadFotosOrdem(response.body.id);
        this.enviarArquivos(uploadFotoPrincipal, uploadPlantas, uploadArea, uploadFotoImovel, this.idImovelEdited);
        this.snackBar.open(MessagesSnackBar.EDITADO, 'Fechar', { duration: 4000 });
        this.router.navigate(['/imoveis-ativos']);
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(MessagesSnackBar.EDITADO_ERRO, 'Fechar', { duration: 4000 });
        this.router.navigate(['/cad-imoveis']);
      });
    }

  }
  

  atualizaDadosForm1(){
    let formDados = this.formDadosImovel.value;
    let dadosImovelEdit: DadosImovel = { 
      referencia: formDados.ref,
      destaque: formDados.destaque,
      superDestaque: formDados.superDestaque,
      tipo: formDados.tipo, nome: '', 
      precoVenda: formDados.preco, 
      precoLocacao: formDados.precoLocacao, 
      precoCondominio: formDados.condominio };
    this.empresaSubmit(dadosImovelEdit);
  }

  atualizaDadosForm2(){
    let formDados = this.formDadosImovel2.value;
    let dadosImovelEdit: DadosArquivoImportacao = { 
      descricao: formDados.descricao,
      areaUtil: formDados.areaUtil,
      areaTotal: 0,
      qtdDormitorios: formDados.dormitorios,
      qtdSuites: formDados.suites,
      qtdBanheiros: formDados.banheiros,
      qtdSalas: formDados.salas,
      qtdVagas: formDados.vagas,
      qtdElevador: formDados.elevadores,
      qtdUnidadesAndar: formDados.unidadesAndar,
      anoConstrucao: formDados.anoConstrucao };
    
    let dadosEnderecoEdit: Endereco = {
      id: this.imovelEdited.oEndereco.id,
      logradouro: formDados.logradouro,
      numero: formDados.numero,
      cep: formDados.cep,
      complemento: formDados.complemento,
      bairro: formDados.bairro,
      uf: formDados.uf,
      cidade: formDados.cidade,
      latitude: formDados.latitude,
      longitude: formDados.longitude,
      }

    this.dadosReclamacaoSubmit(dadosImovelEdit, dadosEnderecoEdit, 1);
  }

  cancelar() {
    this.router.navigate(['/imoveis-ativos']);
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

  trackByRoute = trackByRoute;

  uploadFile(event, idLista: number) {
    
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      var fileElement = <File>event[index]
      if(idLista == 1){
        this['listFiles' + idLista] = [];
        this['files' + idLista] = [];
      }
        this['listFiles' + idLista].push(fileElement);
        this['files' + idLista].push(element.name)

    }
  }

  deleteAttachment(index, idLista: number) {
    this['files' + idLista].splice(index, 1);
    this['listFiles' + idLista].splice(index, 1);
  }

  deleteImage(fotoId, tipoFoto){

    let body = { imovelId: +this.idImovelEdited, fotoId: fotoId, tipoFoto: tipoFoto }

    this.commomService.deleteFoto(`${environment.urlDeleteFotosImovel}`, body)
      .subscribe(()=>{
      });

    switch (tipoFoto){
      case 2: 
      this.preencheFotosImovel = this.preencheFotosImovel.filter(foto => { 
        return foto.id != parseInt(fotoId);
      }); break;
      case 6: 
      this.preencheAreasImovel = this.preencheAreasImovel.filter(foto => { 
        return foto.id != parseInt(fotoId);
      }); break;
      case 7: 
      this.preenchePlantasImovel = this.preenchePlantasImovel.filter(foto => { 
        return foto.id != parseInt(fotoId);
      }); break;
    }      
  }
}

