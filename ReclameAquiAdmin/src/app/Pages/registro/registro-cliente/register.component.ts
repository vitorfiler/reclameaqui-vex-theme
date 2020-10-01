import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { CommomService } from 'src/app/services/commom.service';
import { Cliente } from 'src/app/_models/cliente';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit {

  arrowBack = arrowBack;
  senhaDiferente: Boolean = false;
  form: FormGroup;
  mesFatu: string = "2020-03-01";
  inputType = 'password';
  visible = false;
  urlName = "/Login";
  cpfMascara: string;
  celularMascara: string;
  cadastroInvalido: Boolean = false;
  cliente = new Cliente();
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  dataNascimento: string = '';
  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private commomService: CommomService
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      celular: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      genero: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    }, {validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { 
    let senha = group.get('password').value;
    let confirmaSenha = group.get('passwordConfirm').value;

    return senha === confirmaSenha ? null : { notSame: true }     
  }

  mascaraCpf(): string{
    return this.cpfMascara = '000.000.000-00';
  }
  mascaraData(): string{
    return this.cpfMascara = '00/00/0000';
  }
  mascaraCelular(): string{
    return this.celularMascara = '(00) 0 0000-0000';
  }
  registrar(nome: string, cpf: string, celular: string, 
            email: string, senha: string, confirmarSenha: string, 
            dataNascimento: string, genero: string){
      if(senha != confirmarSenha){
        this.senhaDiferente = true;
        return;
      }
      this.senhaDiferente = false;
      var diaNascimento = dataNascimento.substr(0,2);
      var mesNascimento = dataNascimento.substr(2,2);
      var anoNascimento = dataNascimento.substr(4,4);
      var dataFormatoCorreto = anoNascimento + "-" + mesNascimento + "-" + diaNascimento
      const body: any = {
        "usuario": email,
        "senha": senha,
        "perfil": 1,
        "cliente": {
          "nome": nome,
          "dataNascimento": dataFormatoCorreto + "T00:00:00.000Z",
          "cpf": cpf,
          "genero": genero,
          "celular": celular,
          "email": email
        }
      }
      this.commomService.post(this.urlName, body).then(response =>{
        this.commomService.showMessage("Seu cadastro foi realizado com Sucesso.");
        localStorage.setItem('Retorno', response.body);
      }).catch(()=>{
        this.cadastroInvalido = true;
        console.log("error");
      });
      console.log(body);
}

  getDataNascimento(event= new Date()){
    let date: Date = new Date(`${event}`);
    this.dataNascimento = this.mesFatu = `${date.getFullYear()}` + `-0${date.getMonth()+1}-` + `0${date.getDate()}`+ "T00:00:00.000Z";
  }

  validaSenha(){
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
