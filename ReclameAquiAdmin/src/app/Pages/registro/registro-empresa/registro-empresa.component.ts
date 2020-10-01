import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { CommomService } from 'src/app/services/commom.service';
import { Empresa } from 'src/app/_models/empresa';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from '../../_constants/messagesSnackBar';

@Component({
  selector: 'vex-register',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegistroEmpresaComponent implements OnInit {
  arrowBack = arrowBack;
  form: FormGroup;
  empresa = new Empresa();
  inputType = 'password';
  visible = false;
  urlName = "/Login";
  senhaDiferente: Boolean = false;
  cnpjMascara: string;
  cpfMascara: string;
  telefoneMascara: string;
  cadastroInvalido: Boolean = false;
  dataCadastro: string = '';
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private commomService: CommomService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      site: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      cnpj: ['', Validators.required],
      responsavel: ['', Validators.required],
      telefone: ['', Validators.required],
      // dataCadastro: ['', Validators.required],
      descricao: [''],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, { validator: this.checkPasswords });
  }
  
  checkPasswords(group: FormGroup) { 
    let senha = group.get('password').value;
    let confirmaSenha = group.get('passwordConfirm').value;

    return senha === confirmaSenha ? null : { notSame: true }     
  }


  mascaraCnpj(): string {
    return this.cnpjMascara = '00.000.000/000-00';
  }


  mascaraTelefone(): string {
    return this.telefoneMascara = '(00)00000-0000';
  }

  mascaraData(): string {
    return this.cnpjMascara = '00/00/0000';
  }

  registrar(site: string, nome: string,  email: string,
            cnpj: string,  responsavel: string, telefone: string, usuario: string,
            senha: string, descricao: string
  ) {
    var data = new Date();
    var validadeMonth = `${data.getMonth()+1}`;
    if(validadeMonth.length > 1){
      validadeMonth = `-${data.getMonth()+1}-`
    }else{
      validadeMonth = `-0${data.getMonth()+1}-`
    }
    var dataCadastro = `${data.getFullYear()}` + validadeMonth + `${data.getDate()}`;
    const body: any = {
      "usuario": usuario,
      "senha": senha,
      "empresa": {
        "site": site,
        "nome": nome,
        "email": email,
        "dataCadastro": "2020-09-13T13:25:11.036Z",
        "cnpj": cnpj,
        "responsavel": responsavel,
        "telefone": telefone,
        "descricao": descricao
      },
      "perfil": 2
    }

    this.commomService.post(this.urlName, body).then(response => {
      this.snackBar.open(MessagesSnackBar.CADASTRO, 'Fechar', { duration: 4000 });
      this.form.reset();
      this.router.navigate(['/login']);
      localStorage.setItem('Retorno', response.body);
    }).catch(() => {
      this.cadastroInvalido = true;
      this.snackBar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 4000 });
      console.log("error");
    });
  }

  validaSenha() {
    return this.form.invalid
  }

  toggleVisibility() {
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
}
