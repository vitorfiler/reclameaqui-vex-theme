import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import { User } from 'src/app/_models/user';
import { CommomService } from './../../services/commom.service';
import { UsuarioLogado } from 'src/app/_models/usuarioLogado';
import { MessagesSnackBar } from '../_constants/messagesSnackBar';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  arrowBack = arrowBack;
  inputType = 'password';
  visible = false;
  user = new User();
  nomeUrl =  '/Login/logar';
  nomeUrlEmpresa = '/Empresa';
  nomeUrlCategorias = '/categorias'

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private commomService: CommomService,
              private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(usuario: string, senha: string) {
    const body: any = {
      "usuario": usuario,
      "senha": senha,
      
    }
    this.commomService.post(this.nomeUrl, body).then(response =>{

      // let usuarioLogado = new UsuarioLogado();
      if(response.body.cliente){
        localStorage.setItem('retornoLogin', JSON.stringify(response.body.cliente));
        localStorage.setItem("usuarioLogado", JSON.stringify(response.body.cliente.nome));
        localStorage.setItem("clientId", JSON.stringify(response.body.cliente.id));
        localStorage.setItem("clienteEmail", JSON.stringify(response.body.cliente.email));
        localStorage.setItem("cliente", JSON.stringify(true));
      }
      else if(response.body.empresa){
        localStorage.setItem('retornoLoginEmpresa', JSON.stringify(response.body.empresa));
        localStorage.setItem("usuarioLogadoEmpresa", JSON.stringify(response.body.empresa.nome));
        localStorage.setItem("empresaId", JSON.stringify(response.body.empresa.id));
        localStorage.setItem("empresa", JSON.stringify(true));
        //localStorage.setItem("empresaEmail", JSON.stringify(response.body.empresa.email));
      }
      //this.router.navigate(['/']);

      this.commomService.get(this.nomeUrlEmpresa).subscribe(response =>{
        // let usuarioLogado = new UsuarioLogado();
        localStorage.setItem('empresas', JSON.stringify(response.body));
        this.router.navigate(['/']);
        setTimeout(() => {
          location.reload();
        }, 200);
      })
    }).catch(()=>{
      console.log("error");
      this.snackBar.open(MessagesSnackBar.LOGIN_ERRO, 'Fechar', { duration: 4000 });
    })
   
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
