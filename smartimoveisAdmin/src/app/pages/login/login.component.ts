import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import { CommomService } from './../../services/commom.service';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';

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
  nomeUrl =  '';

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private commomService: CommomService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      senha: ['', Validators.required]
    });
  }

  login(usuario: string, senha: string){
    const body: any = {"usuario":usuario, "senha": senha}
    this.commomService.post(`${environment.urlLogin}`,body).subscribe(response=>{
      localStorage.setItem("usuarioLogado", JSON.stringify(response.body.usuario));
      localStorage.setItem("Admin", JSON.stringify(response.body.pefilAdmin));
      localStorage.setItem("token", JSON.stringify(response.body.token));
      this.router.navigate(['/'])
      setTimeout(() => {
        location.reload();
      }, 1);
    },
    (error) => {
      console.log(error.message);
      this.snackBar.open(MessagesSnackBar.LOGIN_ERRO, 'Fechar', { duration: 4000 });
    }
    )
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
