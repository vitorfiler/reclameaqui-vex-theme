import { CommomService } from 'src/app/services/commom.service';
import { Component, OnInit, Inject } from '@angular/core';

import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import bullhorn from '@iconify/icons-fa-solid/bullhorn';
import block from '@iconify/icons-ic/block';
import check from '@iconify/icons-fa-solid/check';
import acBalance from '@iconify/icons-ic/data-usage';
import key from '@iconify/icons-fa-solid/key';
import power from '@iconify/icons-fa-solid/power-off';
import message from '@iconify/icons-ic/message';
import expand from '@iconify/icons-fa-solid/expand';
import trash from '@iconify/icons-fa-solid/trash';

import icAddAPhoto from '@iconify/icons-ic/twotone-add-a-photo';
import icPhotoFilter from '@iconify/icons-ic/twotone-photo-filter';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icKeyboardArrowRight from '@iconify/icons-ic/twotone-keyboard-arrow-right';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { friendSuggestions } from 'src/app/_models/friend-suggestions';
import { MatTableDataSource } from '@angular/material/table';
import { ReclamacaoTabela, Reclamacao } from 'src/app/_models/reclamacao';
import { reclamacoes } from 'src/app/_models/mock-tabela';
import { Cliente } from 'src/app/_models/cliente';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Resposta } from 'src/app/_models/resposta-response';
import { environment } from 'src/environments/environment';
import { Troca } from 'src/app/_models/troca';
import { ReclamacaoFeedEmpresa } from './../../../_models/reclamacao';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { DOCUMENT } from '@angular/common';
import { Email } from 'src/app/_models/email';
import { TipoUpload } from 'src/app/_models/Enum';
import { ConteudoReclamacao, ConteudoResposta } from 'src/app/_models/conteudoReclamacao';
import { Empresa } from 'src/app/_models/empresa';

@Component({
  selector: 'vex-social-timeline',
  templateUrl: './social-timeline.component.html',
  styleUrls: ['./social-timeline.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class SocialTimelineComponent implements OnInit {

  trash = trash
  expand = expand
  message = message
  power = power
  key = key
  acBalance = acBalance
  suggestions = friendSuggestions;
  check = check
  icWork = icWork;
  block = block
  bullhorn = bullhorn
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  icAddAPhoto = icAddAPhoto;
  icPhotoFilter = icPhotoFilter;
  icAttachFile = icAttachFile;
  icKeyboardArrowRight = icKeyboardArrowRight;

  reclamacaoFiltrada = new ReclamacaoFeedEmpresa();
  cliente = new Cliente();
  clienteAlterado = new Cliente();
  resposta = new Resposta();
  clientId = window.localStorage.getItem('clientId');
  celularMascara: String;

  flagTrocarEmail: Boolean = false;
  flagTrocarSenha: Boolean = false;
  flagDadosPessoais: boolean = false;
  flagReclamacoes: Boolean = true;
  flagExpandirReclamacao: Boolean = false;
  excluir: Boolean = false;
  temEndereco: Boolean = false;
  rating: Boolean = false;
  notaSolucao: Boolean = false;
  flagVoltarFazerNegocio: Boolean = false;

  ratingValue: string;
  notaSolucaoValue: string;
  idFiltrado: number;
  idReclamacaoSelecionada: string;
  urlFoto: string = 'assets/img/profile/profile.jpg'
  tituloReclamacoes: string = "Todas as Reclamações";
  urlReclamacoes: string = '/reclamacoes-consumidor';
  urlCancelarReclamacao: string = '/alteraStatusReclamacao';
  urlCliente: string = '/Cliente'
  urlTrocaSenha: string = '/DadosCadastrais/Password'
  urlTrocaEmail: string = '/DadosCadastrais/Email'
  urlRating: string = '/Rating';

  trocar = new Troca();
  displayedColumns: string[] = [
    "Expandir",
    "Status",
    "Data",
    "Empresa",
    // "Download",
    "Reclamacao",
    "Cancelar"
  ];
  
  ratingSubjects = [
    { name: 'cleanliness' },
  ]
  bodyRating: any = {
    notaRating: null,
    notaSolucao: null,
    flagVoltariaNegocios: null,
    reclamacaoId: null
  }
  
  form: FormGroup;
  formReclamacao: FormGroup;
  formNegocio: FormGroup;
  formEndereco: FormGroup;
  formSenha: FormGroup;
  formEmail: FormGroup;
  dataSource: MatTableDataSource<ReclamacaoTabela>;
  listTable: any[] = [];
  preencheTable: ReclamacaoTabela[] = [];
  listBodyRespostas: any[] = [];
  respostas: Resposta[] = [];
  files: any = [];
  listFiles: any = [];
  fileUrl;

  constructor(private commomService : CommomService,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer) { 
    Object.assign(this, { reclamacoes })

  }
  

  ngOnInit(): void {
    this.form = this.fb.group({
      empresas: new FormControl('Que nota esta empresa merece?', [Validators.required]),
      ratings: this.fb.group({
          cleanliness: [0]
      })
    });
    this.formNegocio = this.fb.group({
      negocios: ['', Validators.required],

    });
    this.formEndereco = this.fb.group({
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      cep: ['', Validators.required],
      celular: [''],
    });
    this.formSenha = this.fb.group({
      // senhaAtual: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, {validator: this.checkPasswords });

    this.formReclamacao = this.fb.group({
      resposta: ['', Validators.required]
    });
    this.formEmail = this.fb.group({
      novoEmail: ['', Validators.required],
      confirmarEmail: ['', Validators.required],
      senhaTrocaEmail: ['', Validators.required],
    }, {validator: this.checkEmails });
    this.getReclamacoes(this.urlReclamacoes, "0");
    // this.dadosPessoais()
  }
  checkPasswords(group: FormGroup) { 
    let senha = group.get('password').value;
    let confirmaSenha = group.get('passwordConfirm').value;
  
    return senha === confirmaSenha ? null : { notSame: true }     
  }
  checkEmails(group: FormGroup) { 
    let senha = group.get('novoEmail').value;
    let confirmaSenha = group.get('confirmarEmail').value;
  
    return senha === confirmaSenha ? null : { notSame: true }     
  }

  downloadArquivo(id: string){
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

    let link = document.createElement("a");
        link.download = "";
        link.href = "";
        link.click();
  }
  notaRating(){
    this.bodyRating.notaRating = this.ratingValue[0];
    this.rating = false
    this.notaSolucao = true
  }
  notaRatingSolucao(){
    let VoltariaFazerNegocio = Boolean(this.flagVoltarFazerNegocio);
    let reclamacaoId = Number(this.idReclamacaoSelecionada)

    this.bodyRating.flagVoltariaNegocios = VoltariaFazerNegocio;
    this.bodyRating.reclamacaoId = reclamacaoId;
    this.bodyRating.notaSolucao = this.notaSolucaoValue[0];
    console.log(this.nomeEmpresa);
    
    this.commomService.post(this.urlRating, this.bodyRating).then(response =>{
      this.commomService.enviarEmailEmpresa(this.retornaStatus(5), this.idReclamacaoSelecionada, this.reclamacaoFiltrada, this.nomeEmpresa);
      this.todasReclamacoes('0')
    }).catch(()=>{
        console.log("error");
    })
  }

  expandirReclamacao(idReclamacao: number){
    
    this.buscarRespostas(idReclamacao);
    this.reclamacaoFiltrada = this.filtraReclamacao(idReclamacao);
    
    this.flagReclamacoes = false
    this.flagExpandirReclamacao = true;
  }

  cancelar(){
    this.flagReclamacoes = true
    this.flagExpandirReclamacao = false;
  }
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      var fileElement = <File>event[index]
      this.listFiles.push(fileElement);
      this.files.push(element.name)
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.listFiles.splice(index, 1);
  }

  finalizarReclamacao(id: number){
    this.idReclamacaoSelecionada = id.toString();
    this.rating = true;
    this.flagExpandirReclamacao = false;
    this.flagReclamacoes = false;
    this.commomService.alterarReclamacao(this.urlCancelarReclamacao, this.idReclamacaoSelecionada, "5").subscribe(response=>{
      this.commomService.showMessage("Reclamação finalizada com sucesso")
    })
    
  }

  excluirReclamacao(id: number, nomeEmpresa: string){
    this.nomeEmpresa = nomeEmpresa;
    this.idReclamacaoSelecionada = id.toString();
    this.rating = true;
    this.flagReclamacoes = false;
    // this.tituloReclamacoes = "Reclamações desativadas"
    this.reclamacaoFiltrada = this.filtraReclamacao(id);
    this.commomService.alterarReclamacao(this.urlCancelarReclamacao, this.idReclamacaoSelecionada, "6").subscribe(response=>{
      this.commomService.enviarEmailEmpresa(this.retornaStatus(6), this.idReclamacaoSelecionada, this.reclamacaoFiltrada, nomeEmpresa);
      this.commomService.showMessage("Reclamação Cancelada com Sucesso")
    })
    
  }

  montaRespostas(respostasBody: any[]){
    this.respostas = []
    for (let i = 0; i < respostasBody.length; i++) {
      let resposta = new Resposta();
      resposta.nomePerfil = respostasBody[i].nomePerfil
      resposta.fotoPerfil = respostasBody[i].fotoPerfil
      resposta.horaResposta = respostasBody[i].horaResposta
      resposta.textoResposta = respostasBody[i].textoResposta
      if(this.listTable[0].listaArquivos.arquivos[i]){
        resposta.Arquivos = this.listTable[0].listaArquivos.arquivos[i].arquivo
        resposta.NomeArquivos = this.listTable[0].listaNomeArquivos.nomeArquivos[i].nomeArquivo
      }
      this.respostas.push(resposta);
    }
  }

  filtraReclamacao(idReclamacao: number){
    for (let i = 0; i < this.listTable[0].id.length; i++) {
      let reclamacaoFiltrada = new ReclamacaoFeedEmpresa();
      if(this.listTable[0].id[i] == idReclamacao){
        
        reclamacaoFiltrada.NomeReclamante = this.listTable[0].nomeReclamante[i]
        reclamacaoFiltrada.Foto = this.listTable[0].urlFoto[i]
        reclamacaoFiltrada.Titulo = this.listTable[0].tituloReclamacao[i]
        reclamacaoFiltrada.DsStatus = this.listTable[0].status[i]
        reclamacaoFiltrada.TempoDecorrido = this.listTable[0].tempoDecorrido[i]
        reclamacaoFiltrada.NomeEmpresa = this.listTable[0].empresa[i]
        reclamacaoFiltrada.Email = this.listTable[0].emailEmpresa[i]
        reclamacaoFiltrada.Body = this.listTable[0].body[i]
        reclamacaoFiltrada.StatusId = this.listTable[0].statusId[i]
        reclamacaoFiltrada.StatusCor = this.listTable[0].statusCor[i]
        reclamacaoFiltrada.IdReclamacao = this.listTable[0].id[i]
        if(this.listTable[0].listaArquivos.arquivos[i]){
          reclamacaoFiltrada.Arquivos = this.listTable[0].listaArquivos.arquivos[i].arquivo
          reclamacaoFiltrada.NomeArquivos = this.listTable[0].listaNomeArquivos.nomeArquivos[i].nomeArquivo
        }

        return reclamacaoFiltrada;
      }      
    }
  }
  
  alterarDadosPessoais(logradouro: string, numero: string, complemento: string, 
                        bairro: string, cidade: string, uf: string, cep: string, celular: string){
          
      const body: any = {
        "nome": this.cliente.nome,
        "dataNascimento": this.cliente.dataNascimento,
        "cpf": this.cliente.cpf,
        "genero": this.cliente.genero,
        "celular": celular,
        "enderecoCliente": {
          "logradouro": logradouro,
          "numero": numero,
          "complemento": complemento,
          "bairro": bairro,
          "cidade": cidade,
          "uf": uf,
          "cep": cep
        },
        "email": this.cliente.email
      }
      this.commomService.put(`${this.urlCliente}`,body, this.clientId).subscribe(response=>{
        this.formEndereco.reset();
        this.commomService.showMessage("Dados alterados com Sucesso")
      })
  }

  mascaraCelular(): string{
    return this.celularMascara = '(00) 0 0000-0000';
  }


  getReclamacoes(urlName: string, id: string){
    const body: any = {
      "usuarioId": this.clientId,
      "statusId": id
    } 
    
    
    this.commomService.getReclamacoes(urlName, this.clientId, id).subscribe(response=>{
      
      this.listTable = response.body.reclamacoes;
      this.extractTable();
      
    })
  }
  
  buscarRespostas(idReclamacao: number){
    this.commomService.get(`${environment.respostas}/${idReclamacao}`).subscribe(response =>{
      this.listBodyRespostas =  response.body.respostas;
      
      this.montaRespostas(this.listBodyRespostas);
    })
  }
  
  logout(){
    this.commomService.logout()
  }
  extractTable() {
    this.preencheTable = []
    
    for (let i = 0; i < this.listTable[0].id.length; i++) {

      let table = new ReclamacaoTabela();
      table.Id = this.listTable[0].id[i]
      table.Status = this.listTable[0].status[i]
      table.StatusId = this.listTable[0].statusId[i]
      table.Empresa = this.listTable[0].empresa[i]
      table.DataAbertura = this.listTable[0].data[i]
      table.Titulo = this.listTable[0].tituloReclamacao[i]
       this.preencheTable.push(table);
    }
    
    this.dataSource = new MatTableDataSource(this.preencheTable);
  }

  reclamacoesAvaliadas(id: string){
    this.listTable = []
    this.getReclamacoes(this.urlReclamacoes, id)
    this.tituloReclamacoes = "Reclamações avaliadas"
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.notaSolucao = false;
    this.flagTrocarSenha = false
    this.flagTrocarEmail = false
    this.flagDadosPessoais = false
    this.flagReclamacoes = true

  }

  reclamacoesDesativadas(id: string){
    this.listTable = []
    this.getReclamacoes(this.urlReclamacoes, id);
    this.tituloReclamacoes = "Reclamações desativadas"
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.notaSolucao = false;
    this.flagTrocarSenha = false
    this.flagTrocarEmail = false
    this.flagDadosPessoais = false
    this.flagReclamacoes = true

  }

  reclamacoesNaoRespondidas(id: string){
    this.listTable = []
    this.getReclamacoes(this.urlReclamacoes ,id);
    this.tituloReclamacoes = "Reclamações não respondidas"
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.notaSolucao = false;
    this.flagTrocarSenha = false
    this.flagTrocarEmail = false
    this.flagDadosPessoais = false
    this.flagReclamacoes = true

  }

  reclamacoesRespondidas(id: string){
    this.listTable = []
    this.getReclamacoes(this.urlReclamacoes, id);
    this.tituloReclamacoes = "Reclamações respondidas"
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.notaSolucao = false;
    this.flagTrocarSenha = false
    this.flagTrocarEmail = false
    this.flagDadosPessoais = false
    this.flagReclamacoes = true

  }

  todasReclamacoes(id: string){
    this.listTable = []
    this.getReclamacoes(this.urlReclamacoes, id);
    this.tituloReclamacoes = "Todas as reclamações"
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.notaSolucao = false;
    this.flagTrocarSenha = false
    this.flagTrocarEmail = false
    this.flagDadosPessoais = false
    this.flagReclamacoes = true

  }
  reclamacoesIniciadas(id: string){
    this.listTable = []
    this.getReclamacoes(this.urlReclamacoes, id);
    this.tituloReclamacoes = "Reclamações iniciadas"
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.notaSolucao = false;
    this.flagTrocarSenha = false
    this.flagTrocarEmail = false
    this.flagDadosPessoais = false
    this.flagReclamacoes = true

  }

  dadosPessoais(){
    this.commomService.get(`${this.urlCliente}/${this.clientId}`)
      .subscribe(response=>{
        
          this.cliente.nome = response.body.nome;
          this.cliente.celular = response.body.celular;
          this.cliente.cpf = response.body.cpf;
          this.cliente.dataNascimento = response.body.dataNascimento;
          this.cliente.email = response.body.email;
          this.cliente.genero = response.body.genero;

          if(!response.body.enderecoCliente){
            this.temEndereco = false;
          }else{
            this.temEndereco = true;
          }
      })
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.flagReclamacoes = false
    this.flagTrocarSenha = false
    this.flagTrocarEmail = false
    this.flagDadosPessoais = true

  }
  formTrocarEmail(){
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.flagReclamacoes = false
    this.flagTrocarSenha = false
    this.flagDadosPessoais = false
    this.flagTrocarEmail = true
  }

  formTrocarSenha(){
    this.flagExpandirReclamacao = false;
    this.rating = false;
    this.flagReclamacoes = false
    this.flagTrocarEmail = false
    this.flagDadosPessoais = false
    this.flagTrocarSenha = true
  }

  trocarEmail(novoEmail: string){
    var id = Number(this.clientId)
    const body: any = {
      "id": id,
      "email": novoEmail
    }
    this.commomService.trocarEmailOuSenha(this.urlTrocaEmail, body, "0").subscribe(response =>{
      this.commomService.showMessage("Email alterado com sucesso")
    })
  }
  getBotaoStatus(id: string){
    // var idNumber = Number(id);
    // if(idNumber != 6){
    //   return true
    // }
    // return false;
    return id != "6" ? true : false
  }

  temArquivos(id: string){
    var idReclamacao = Number(id)
    var reclamacao = this.filtraReclamacao(idReclamacao)
    if(reclamacao.Arquivos){
        return true;
    }
    return false
  }
  trocarSenha(novaSenha: string){
    var id = Number(this.clientId)
    const body: any = {
      "id": id,
      "password": novaSenha
    }
    this.commomService.trocarEmailOuSenha(this.urlTrocaSenha, body, "0").subscribe(response =>{
      this.commomService.showMessage("Senha alterada com sucesso")
    })
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
  getEmailEmpresa(id) {
    if (id == 0) {
      return '';
    }
    else {
      var emp = this._filterById(this.idSelectEmp);
      return emp[0].email;
    }
  }
  private _filterById(value: number): Empresa {
    return this.empresas.filter(x => x.id == value);
  }
  getEmpresas() {
    var empresas = localStorage.getItem("empresas");
    if (empresas != null) return JSON.parse(empresas);
  }

  empresas = this.getEmpresas();
  idSelectEmp = 0;
  reclamacaoSave = new Reclamacao();
  conteudoResposta = new ConteudoResposta();
  reclamacaoId = '';
  nomeEmpresa = '';

  dadosReclamacaoSubmit() {
    this.reclamacaoSave.ClienteId = JSON.parse(localStorage.getItem("clientId"));
    // this.reclamacaoSave.StatusId =  //Status Atual
    // this.reclamacaoSave.StatusId = 1
    var idRec = Number(this.reclamacaoFiltrada.IdReclamacao)
    this.conteudoResposta.flagCliente = true;
    this.conteudoResposta.reclamacaoId = idRec;
    var body = JSON.stringify(this.conteudoResposta);

    console.log(body);
    this.commomService.post('/ConteudoReclamacao/Save', body).then(response => {
      this.formReclamacao.reset();
      this.files = [];
      this.listFiles = [];
      this.reclamacaoId = JSON.stringify(response.body);
      var id = Number(this.reclamacaoId);
      // this.expandirReclamacao(id)
      this.listFiles.forEach(element => {
        let fileToUpload = element;
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('TipoUpload', TipoUpload.Reclamacao.toString());
        formData.append('IdReferencia', this.reclamacaoId);
        this.commomService.upload(formData).then().catch(() => {

          console.log("error");
        });
      });


      //processo de envio de e-mail para o cliente e para a empresa.
      var oEmail = new Email();
      var oCliente = JSON.parse(localStorage.getItem("retornoLogin"));
      oEmail.Cliente = oCliente.nome;
      oEmail.EmailDestino = oCliente.email;
      oEmail.Empresa = this.nomeEmpresa;
      oEmail.Mensagem = "";
      //Montando o Body
      var statusNome = this.retornaStatus(1);
      var body = this.emailBodyCliente(oCliente.nome, this.nomeEmpresa, "Aguardando Analise", "");
      oEmail.EmailBody = body;
      oEmail.Status = 1;
      oEmail.Subject = "Reclame Aqui Nova Lima - Reclamação: " + this.reclamacaoId;

      this.commomService.post("/Email", JSON.stringify(oEmail)).then(response => {
        oEmail = new Email();
        oEmail.Cliente = oCliente.nome;
        oEmail.EmailDestino = this.getEmailEmpresa(this.idSelectEmp);
        oEmail.Empresa = this.nomeEmpresa;
        oEmail.Mensagem = "O quanto antes você iniciar a análise melhor será seu rating.";
        //montando o body
        var statusNome = this.retornaStatus(1);
        var body = this.emailBodyEmpresa(oCliente.nome, this.nomeEmpresa, "Aguardando Analise", oEmail.Mensagem);
        oEmail.EmailBody = body;
        oEmail.Status = 1;
        oEmail.Subject = "Reclame Aqui Nova Lima - Reclamação: " + this.reclamacaoId;

        this.commomService.post("/Email", JSON.stringify(oEmail)).then(response => {
          // this.addressComplete = false;
          // this.creditCardComplete = true;
          // this.stepThree = true;
        }).catch(() => {
          console.log("error envio email Empresa");
        });

      }).catch(() => {
        console.log("error envio email Empresa");
      });


    }).catch(() => {
      console.log("epa");
      console.log("error");
    });

  }
  emailBodyCliente(cliente: string, empresa: string, statusReclama: string, mensagem: string) {
    var retorno = '<div>';
    retorno = retorno + '<table cellpadding="0" cellspacing="0" height="auto" width="100%">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td width="650">';
    retorno = retorno + '<table align="center" cellpadding="0" cellspacing="0">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td width="650">';
    retorno = retorno + '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="text-align:left;font-family:calibri,sans-serif;color:#d0d0d0;font-size:11pt">Sua';
    retorno = retorno + 'reclamação foi publicada!</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="5">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '';
    retorno = retorno + '<table align="center" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #cecece">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="70">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td width="650">';
    retorno = retorno + '<table align="center" cellpadding="0" cellspacing="0">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td><img height="auto"';
    retorno = retorno + 'src="https://ci4.googleusercontent.com/proxy/LELbyBpOCqstoCYhydrapfpfK3tqIYqHl_0GW8nbdvNcOoMRKpPJdJS7X67lNmTCqxxlNpPhswqyglBbnWs0dYbd_JCGFiiPOwokbMdj5oC93hCTLyKXqs6o1KNqvpAW5WvaSvQyQuN3c50ZivyQVlVvuPRu7NUqlr3UBUkATgU3eqFonZImULY-IIL1mqwgm-PdrfZn0SPW=s0-d-e1-ft#https://static.cdn.responsys.net/i9/responsysimages/obviobras/contentlibrary/reclameaqui/html_transacionais/img/Logo_Reclame_AQUI.png"';
    retorno = retorno + 'width="100%" class="CToWUd"></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '';
    retorno = retorno + '<table align="center" cellpadding="0" cellspacing="0">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="80">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="font-family:helvetica,sans-serif;font-size:13pt;text-align:center;color:#737373">Oi,';
    retorno = retorno + cliente + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="10">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td';
    retorno = retorno + 'style="font-family:helvetica,sans-serif;font-size:18pt;text-align:center;line-height:1.5;color:#737373">';
    retorno = retorno + 'Sua reclamação para<br>';
    retorno = retorno + '<span style="color:#e53b3b"> ' + empresa + ' </span><br>';
    retorno = retorno + 'se encontra no Status: ' + statusReclama + '!</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="40">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table width="100%">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<table align="center">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '<td width="12%">&nbsp;</td>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="center">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td> ' + mensagem + ' </td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '<td width="12%">&nbsp;</td>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="right">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="30">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<td style="text-align:center;font-family:helvetica,sans-serif;color:#737373;font-size:16pt">Que tal';
    retorno = retorno + ' conhecer nossos canais de atendimento?</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="5">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="center">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td><a';
    retorno = retorno + 'href="#"';
    retorno = retorno + 'title="facebook" target="_blank"';
    retorno = retorno + 'data-saferedirecturl="https://www.google.com/url?q=https://info.reclameaqui.com.br/pub/cc?_ri_%3DX0Gzc2X%253DAQpglLjHJlDQGnULso2406Mfv2rzgmJzarBzdDMKLzbEzdBfEjrHzdqHqC85qq0HifjRVXtpKX%253DSAUWD%26_ei_%3DEq2tf9zs59idfPO1Sc_9Bbmc8_s6lUXVXeyvF1sOFNkZEqLZlbimBIBhWQKfW7G7cm9g-MspM3F2zVeTZXo_jjtFOw6o9Msj2MH1i-h22t1pQqysU24PVwvyEgGmvNVDg4ciDmcJhxqOtpWp2vXQd-oDruoc4F9OZZjVGn8cJe_eDPgEY3R0xzg1uuat-y93GWFlZg-bsCXnBGmhE_UY4uTqbvQ_bVer06xuheL11ayYIAvanZ7Or_fiUSJiSgkzM7JanyStKkGwRPA.%26_di_%3D33lapf49li7lm1v09t56ajc0855aofo0bpqokgk85eu466q98bf0&amp;source=gmail&amp;ust=1596699125076000&amp;usg=AFQjCNFuQ5siC5ZqJHdlGgVT_ojK6jjkhg"><img';
    retorno = retorno + 'height="auto"';
    retorno = retorno + 'src="https://ci3.googleusercontent.com/proxy/zkcg6jGY3DPoNX0Qf54LVsLOjXpoH7Ny-CmYjqdwwN-wtiCKnxARAYSrpjIJX75kiUcQOJXGQDz5u9c_Jf0MfTnAcyMquRm3O7lDoYVkXppvSyrlqHJiks4KteF9XTWXaxOPpMHo0vhbviABZSCrdYPP8EWkReRtW3oJgG8fiYJN9QfBvUR_P0BU6iFWVuuOSPaFpztx=s0-d-e1-ft#https://static.cdn.responsys.net/i9/responsysimages/obviobras/contentlibrary/reclameaqui/html_transacionais/img/bt_lg_facebook.png"';
    retorno = retorno + 'width="100%" class="CToWUd"> </a></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<table align="left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td><a';
    retorno = retorno + 'href="#"';
    retorno = retorno + 'title="twitter" target="_blank"';
    retorno = retorno + 'data-saferedirecturl="https://www.google.com/url?q=https://info.reclameaqui.com.br/pub/cc?_ri_%3DX0Gzc2X%253DAQpglLjHJlDQGnULso2406Mfv2rzgmJzarBzdDMKLzbEzdBfEjrHzdqHqC85qq0HifjRVXtpKX%253DSAUAD%26_ei_%3DElil9jJ2pMrjwJ0ebgbCOlNyNkYmnqEZNFY3qZttvwlyLWJEUlaou4ocWGI-bCz9s8eGRE8Fcd2PDEWXQkW4oK1FzI5KVXJu6MO5LKX_lm6v763R3yXF1TerPV0Wfrjl1oyrledUAtLmDC232pHYlqa33AwXyoccFfGcT2HMxHhONqbmk7OHkv0VdPgNI6vIAWKRFEd_Tss4GiFTohS69R2tzk7Vf3nPHvAy3s06yUwZyPR58oXpEJglxFjxQ_2lCBvZARVyiQfsVJLMHMN3QFfgpxGE4t7YwDziTYdNYi4X2STRQyw.%26_di_%3D31a9eq1ejjeougpcr9h5uuvbak9jbp66h6uvafb7lhgmoqdec2bg&amp;source=gmail&amp;ust=1596699125077000&amp;usg=AFQjCNHiVFZmv9yZ8aVXbisBEStFZnLJjg"><img';
    retorno = retorno + 'height="auto"';
    retorno = retorno + 'src="https://ci4.googleusercontent.com/proxy/e8J10vSK4ztAijR0P0QLTKZwYBHfb7Owu_mEAbProMmONQZ7b4UHVgE9Pqb3E4VS6y7zvlvlC41Bw5jkuJ-NiwnkB5NB7hZoq0J3z172wLS3wrPxQdqcW1aq4tP6ltExyFV4UvecyHPGV4PaVCGIs9fJJwwmw4jKKvkmiW2D9F9kF8tBVRKzjWUMvv-88zRBxoR93gY=s0-d-e1-ft#https://static.cdn.responsys.net/i9/responsysimages/obviobras/contentlibrary/reclameaqui/html_transacionais/img/bt_lg_twitter.png"';
    retorno = retorno + 'width="100%" class="CToWUd"> </a></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<table align="left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td><a';
    retorno = retorno + 'href="#"';
    retorno = retorno + 'title="linkedin" target="_blank"';
    retorno = retorno + 'data-saferedirecturl="https://www.google.com/url?q=https://info.reclameaqui.com.br/pub/cc?_ri_%3DX0Gzc2X%253DAQpglLjHJlDQGnULso2406Mfv2rzgmJzarBzdDMKLzbEzdBfEjrHzdqHqC85qq0HifjRVXtpKX%253DSAUCD%26_ei_%3DElil9jJ2pMrjwJ0ebgbCOlNyNkYmnqEZNFY3qZttvwlyLWJEUlaou4ocWGI-bCz9s8eGRE8Fcd2PDEWXQkW4oK1FzI5KVXJu6MO5LKX_lm6v763R3yXF1TerPV0Wfrjl1oyrledUAtLmDC232pHYlqa33AwXyoccFfGcT2HMxHhONqbmk7OHkv0VdPgNI6vIAWKRFEd_Tss4GiFTohS69R2tzk7Vf3nPHvAy3s06yUwZyPR58oXpEJglxFjxQ_2lCBvZARVyiQfsVJLMHMN3QFfgpxGE4t7YwDziTYdNYi4X2STRQyw.%26_di_%3Div6ec6dv8if63c5fsdog432c3lheitdk2l099n37u48l8lr2fo60&amp;source=gmail&amp;ust=1596699125077000&amp;usg=AFQjCNHPpTF8paXIHhVBmLTC0KzPvrOh5g"><img';
    retorno = retorno + 'height="auto"';
    retorno = retorno + 'src="https://ci6.googleusercontent.com/proxy/CSfzmNQ-NJRtnO1m-S7u5pW3vhB18csAIqkiPfykL48c93SiWc_cQtKWEGy110die8KHGOpdcSq1DeR4FhcCK1h5PGFK_NYmZ5ScyPhzai3Mi41wQMpNQdtSZ49MVDL1P8Qme-ZCQIvRKa44pEU13gjVWbdHVh3Hg6JnveTET4WYiScQxCY8ciWuOX2Vma-7BF6Ap-Ps=s0-d-e1-ft#https://static.cdn.responsys.net/i9/responsysimages/obviobras/contentlibrary/reclameaqui/html_transacionais/img/bt_lg_linkedin.png"';
    retorno = retorno + 'width="100%" class="CToWUd"> </a></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="40">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="30">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="center">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="font-family:helvetica,sans-serif;color:#a2a2a2;font-size:10pt"><b>NÃO ESQUEÇA:</b> O';
    retorno = retorno + 'Reclame AQUI - Nova Lima identifica automaticamente palavras de baixo<br>';
    retorno = retorno + 'calão e reserva-se no direito de editar sua reclamação para manter nossa<br>';
    retorno = retorno + 'comunidade legal para todo mundo :)</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="8">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="font-family:helvetica,sans-serif;color:#a2a2a2;font-size:10pt">Tome cuidado também e';
    retorno = retorno + 'não informe dados pessoais como número de<br>';
    retorno = retorno + 'documentos, telefones de contato e nome completo na reclamação, tudo que<br>';
    retorno = retorno + 'você escreve é público e pode ser visualizado por qualquer pessoa.</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="50">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="35">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="font-family:heletica,sans-serif;text-align:center;font-size:8pt;color:#737373" width="650">©';
    retorno = retorno + '2015 ReclameAQUI - Todos os direitos reservados.</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="15">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<table cellpadding="0" cellspacing="0" style="border:0px;padding:0px;margin:0px;display:none;float:left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="1" style="font-size:1px;line-height:1px;padding:0px">';
    retorno = retorno + '<br><img';
    retorno = retorno + 'src="https://ci6.googleusercontent.com/proxy/v3tqtEKX6KMubc8AhqUz1hgEUuuusSqR8-t0nRHGCA6ZzjbtVz8i3_wg3SoE7vibzKew4ZYR7jGRzIQ4A21SzxpeMwK-7Kz_xDjMoV4ozhOPkmNpiNZnAXN8uNPRcfIkZel7Mj3_0wZeYwhrz6keiSWS38C_ZJ2uuAjMmqAiCmRTRMwHuNY4sUvx5LbH7T7Zqz3ThJiZTJV2cszJocbb3OFjXRIwx7Vrg_CG4O1lDXR2dWUgoCLN2zmWQlEPdY0i6t0b2SPH0kNybOmxbROf49PF0Lqv2nimJoyuM3LGWbau6DjWHMYmwzjzaWRT=s0-d-e1-ft#https://info.reclameaqui.com.br/pub/as?_ri_=X0Gzc2X%3DAQpglLjHJlDQGnULso2406Mfv2rzgmJzarBzdDMKLzbEzdBfEjrHzdqHqC85qq0HifjRVXHkMX%3Dw&amp;_ei_=EolaGGF4SNMvxFF7KucKuWPgBGsKjzvDZXgqx7SGjHHLe8mzsD17DA-ysn2opGSChZfjvSzsFruvtw."';
    retorno = retorno + 'class="CToWUd">';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</div>';

    return retorno;
  }
  emailBodyEmpresa(cliente: string, empresa: string, statusReclama: string, mensagem: string) {
    var retorno = '<div>';
    retorno = retorno + '<table cellpadding="0" cellspacing="0" height="auto" width="100%">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td width="650">';
    retorno = retorno + '<table align="center" cellpadding="0" cellspacing="0">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td width="650">';
    retorno = retorno + '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="text-align:left;font-family:calibri,sans-serif;color:#d0d0d0;font-size:11pt">Uma';
    retorno = retorno + 'reclamação foi publicada!</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="5">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<table align="center" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #cecece">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="70">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td width="650">';
    retorno = retorno + '<table align="center" cellpadding="0" cellspacing="0">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td><img height="auto"';
    retorno = retorno + 'src="https://ci4.googleusercontent.com/proxy/LELbyBpOCqstoCYhydrapfpfK3tqIYqHl_0GW8nbdvNcOoMRKpPJdJS7X67lNmTCqxxlNpPhswqyglBbnWs0dYbd_JCGFiiPOwokbMdj5oC93hCTLyKXqs6o1KNqvpAW5WvaSvQyQuN3c50ZivyQVlVvuPRu7NUqlr3UBUkATgU3eqFonZImULY-IIL1mqwgm-PdrfZn0SPW=s0-d-e1-ft#https://static.cdn.responsys.net/i9/responsysimages/obviobras/contentlibrary/reclameaqui/html_transacionais/img/Logo_Reclame_AQUI.png"';
    retorno = retorno + 'width="100%" class="CToWUd"></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<table align="center" cellpadding="0" cellspacing="0">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="80">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="font-family:helvetica,sans-serif;font-size:13pt;text-align:center;color:#737373">Oi,';
    retorno = retorno + ' '+empresa+'</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="10">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td';
    retorno = retorno + 'style="font-family:helvetica,sans-serif;font-size:18pt;text-align:center;line-height:1.5;color:#737373">';
    retorno = retorno + 'Sua reclamação de<br>';
    retorno = retorno + '<span style="color:#e53b3b">'+cliente+'</span><br>';
    retorno = retorno + 'se encontra no Status: '+statusReclama +' !</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="40">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table width="100%">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<table align="center">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '<td width="12%">&nbsp;</td>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="center">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>'+mensagem+'</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '<td width="12%">&nbsp;</td>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="right">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="30">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<td style="text-align:center;font-family:helvetica,sans-serif;color:#737373;font-size:16pt">Que tal';
    retorno = retorno + 'conhecer nossos canais de atendimento?</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="5">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="center">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td><a';
    retorno = retorno + 'href="#"';
    retorno = retorno + 'title="facebook" target="_blank"';
    retorno = retorno + 'data-saferedirecturl="https://www.google.com/url?q=https://info.reclameaqui.com.br/pub/cc?_ri_%3DX0Gzc2X%253DAQpglLjHJlDQGnULso2406Mfv2rzgmJzarBzdDMKLzbEzdBfEjrHzdqHqC85qq0HifjRVXtpKX%253DSAUWD%26_ei_%3DEq2tf9zs59idfPO1Sc_9Bbmc8_s6lUXVXeyvF1sOFNkZEqLZlbimBIBhWQKfW7G7cm9g-MspM3F2zVeTZXo_jjtFOw6o9Msj2MH1i-h22t1pQqysU24PVwvyEgGmvNVDg4ciDmcJhxqOtpWp2vXQd-oDruoc4F9OZZjVGn8cJe_eDPgEY3R0xzg1uuat-y93GWFlZg-bsCXnBGmhE_UY4uTqbvQ_bVer06xuheL11ayYIAvanZ7Or_fiUSJiSgkzM7JanyStKkGwRPA.%26_di_%3D33lapf49li7lm1v09t56ajc0855aofo0bpqokgk85eu466q98bf0&amp;source=gmail&amp;ust=1596699125076000&amp;usg=AFQjCNFuQ5siC5ZqJHdlGgVT_ojK6jjkhg"><img';
    retorno = retorno + 'height="auto"';
    retorno = retorno + 'src="https://ci3.googleusercontent.com/proxy/zkcg6jGY3DPoNX0Qf54LVsLOjXpoH7Ny-CmYjqdwwN-wtiCKnxARAYSrpjIJX75kiUcQOJXGQDz5u9c_Jf0MfTnAcyMquRm3O7lDoYVkXppvSyrlqHJiks4KteF9XTWXaxOPpMHo0vhbviABZSCrdYPP8EWkReRtW3oJgG8fiYJN9QfBvUR_P0BU6iFWVuuOSPaFpztx=s0-d-e1-ft#https://static.cdn.responsys.net/i9/responsysimages/obviobras/contentlibrary/reclameaqui/html_transacionais/img/bt_lg_facebook.png"';
    retorno = retorno + 'width="100%" class="CToWUd"> </a></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '';
    retorno = retorno + '<table align="left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td><a';
    retorno = retorno + 'href="#"';
    retorno = retorno + 'title="twitter" target="_blank"';
    retorno = retorno + 'data-saferedirecturl="https://www.google.com/url?q=https://info.reclameaqui.com.br/pub/cc?_ri_%3DX0Gzc2X%253DAQpglLjHJlDQGnULso2406Mfv2rzgmJzarBzdDMKLzbEzdBfEjrHzdqHqC85qq0HifjRVXtpKX%253DSAUAD%26_ei_%3DElil9jJ2pMrjwJ0ebgbCOlNyNkYmnqEZNFY3qZttvwlyLWJEUlaou4ocWGI-bCz9s8eGRE8Fcd2PDEWXQkW4oK1FzI5KVXJu6MO5LKX_lm6v763R3yXF1TerPV0Wfrjl1oyrledUAtLmDC232pHYlqa33AwXyoccFfGcT2HMxHhONqbmk7OHkv0VdPgNI6vIAWKRFEd_Tss4GiFTohS69R2tzk7Vf3nPHvAy3s06yUwZyPR58oXpEJglxFjxQ_2lCBvZARVyiQfsVJLMHMN3QFfgpxGE4t7YwDziTYdNYi4X2STRQyw.%26_di_%3D31a9eq1ejjeougpcr9h5uuvbak9jbp66h6uvafb7lhgmoqdec2bg&amp;source=gmail&amp;ust=1596699125077000&amp;usg=AFQjCNHiVFZmv9yZ8aVXbisBEStFZnLJjg"><img';
    retorno = retorno + 'height="auto"';
    retorno = retorno + 'src="https://ci4.googleusercontent.com/proxy/e8J10vSK4ztAijR0P0QLTKZwYBHfb7Owu_mEAbProMmONQZ7b4UHVgE9Pqb3E4VS6y7zvlvlC41Bw5jkuJ-NiwnkB5NB7hZoq0J3z172wLS3wrPxQdqcW1aq4tP6ltExyFV4UvecyHPGV4PaVCGIs9fJJwwmw4jKKvkmiW2D9F9kF8tBVRKzjWUMvv-88zRBxoR93gY=s0-d-e1-ft#https://static.cdn.responsys.net/i9/responsysimages/obviobras/contentlibrary/reclameaqui/html_transacionais/img/bt_lg_twitter.png"';
    retorno = retorno + 'width="100%" class="CToWUd"> </a></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '';
    retorno = retorno + '<table align="left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td><a';
    retorno = retorno + 'href="#"';
    retorno = retorno + 'title="linkedin" target="_blank"';
    retorno = retorno + 'data-saferedirecturl="https://www.google.com/url?q=https://info.reclameaqui.com.br/pub/cc?_ri_%3DX0Gzc2X%253DAQpglLjHJlDQGnULso2406Mfv2rzgmJzarBzdDMKLzbEzdBfEjrHzdqHqC85qq0HifjRVXtpKX%253DSAUCD%26_ei_%3DElil9jJ2pMrjwJ0ebgbCOlNyNkYmnqEZNFY3qZttvwlyLWJEUlaou4ocWGI-bCz9s8eGRE8Fcd2PDEWXQkW4oK1FzI5KVXJu6MO5LKX_lm6v763R3yXF1TerPV0Wfrjl1oyrledUAtLmDC232pHYlqa33AwXyoccFfGcT2HMxHhONqbmk7OHkv0VdPgNI6vIAWKRFEd_Tss4GiFTohS69R2tzk7Vf3nPHvAy3s06yUwZyPR58oXpEJglxFjxQ_2lCBvZARVyiQfsVJLMHMN3QFfgpxGE4t7YwDziTYdNYi4X2STRQyw.%26_di_%3Div6ec6dv8if63c5fsdog432c3lheitdk2l099n37u48l8lr2fo60&amp;source=gmail&amp;ust=1596699125077000&amp;usg=AFQjCNHPpTF8paXIHhVBmLTC0KzPvrOh5g"><img';
    retorno = retorno + 'height="auto"';
    retorno = retorno + 'src="https://ci6.googleusercontent.com/proxy/CSfzmNQ-NJRtnO1m-S7u5pW3vhB18csAIqkiPfykL48c93SiWc_cQtKWEGy110die8KHGOpdcSq1DeR4FhcCK1h5PGFK_NYmZ5ScyPhzai3Mi41wQMpNQdtSZ49MVDL1P8Qme-ZCQIvRKa44pEU13gjVWbdHVh3Hg6JnveTET4WYiScQxCY8ciWuOX2Vma-7BF6Ap-Ps=s0-d-e1-ft#https://static.cdn.responsys.net/i9/responsysimages/obviobras/contentlibrary/reclameaqui/html_transacionais/img/bt_lg_linkedin.png"';
    retorno = retorno + 'width="100%" class="CToWUd"> </a></td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="40">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="30">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td>';
    retorno = retorno + '<table align="center">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="font-family:helvetica,sans-serif;color:#a2a2a2;font-size:10pt"><b>NÃO ESQUEÇA:</b> O';
    retorno = retorno + 'Reclame AQUI - Nova Lima identifica automaticamente palavras de baixo<br>';
    retorno = retorno + 'calão e reserva-se no direito de editar sua reclamação para manter nossa<br>';
    retorno = retorno + 'comunidade legal para todo mundo :)</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="8">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="font-family:helvetica,sans-serif;color:#a2a2a2;font-size:10pt">Tome cuidado também e';
    retorno = retorno + 'não informe dados pessoais como número de<br>';
    retorno = retorno + 'documentos, telefones de contato e nome completo na reclamação, tudo que<br>';
    retorno = retorno + 'você escreve é público e pode ser visualizado por qualquer pessoa.</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="50">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="35">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td style="font-family:heletica,sans-serif;text-align:center;font-size:8pt;color:#737373" width="650">©';
    retorno = retorno + '2015 ReclameAQUI - Todos os direitos reservados.</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="15">&nbsp;</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '<table cellpadding="0" cellspacing="0" style="border:0px;padding:0px;margin:0px;display:none;float:left">';
    retorno = retorno + '<tbody>';
    retorno = retorno + '<tr>';
    retorno = retorno + '<td height="1" style="font-size:1px;line-height:1px;padding:0px">';
    retorno = retorno + '<br><img';
    retorno = retorno + 'src="https://ci6.googleusercontent.com/proxy/v3tqtEKX6KMubc8AhqUz1hgEUuuusSqR8-t0nRHGCA6ZzjbtVz8i3_wg3SoE7vibzKew4ZYR7jGRzIQ4A21SzxpeMwK-7Kz_xDjMoV4ozhOPkmNpiNZnAXN8uNPRcfIkZel7Mj3_0wZeYwhrz6keiSWS38C_ZJ2uuAjMmqAiCmRTRMwHuNY4sUvx5LbH7T7Zqz3ThJiZTJV2cszJocbb3OFjXRIwx7Vrg_CG4O1lDXR2dWUgoCLN2zmWQlEPdY0i6t0b2SPH0kNybOmxbROf49PF0Lqv2nimJoyuM3LGWbau6DjWHMYmwzjzaWRT=s0-d-e1-ft#https://info.reclameaqui.com.br/pub/as?_ri_=X0Gzc2X%3DAQpglLjHJlDQGnULso2406Mfv2rzgmJzarBzdDMKLzbEzdBfEjrHzdqHqC85qq0HifjRVXHkMX%3Dw&amp;_ei_=EolaGGF4SNMvxFF7KucKuWPgBGsKjzvDZXgqx7SGjHHLe8mzsD17DA-ysn2opGSChZfjvSzsFruvtw."';
    retorno = retorno + 'class="CToWUd">';
    retorno = retorno + '</td>';
    retorno = retorno + '</tr>';
    retorno = retorno + '</tbody>';
    retorno = retorno + '</table>';
    retorno = retorno + '</div>';
    return retorno;
  }
}
