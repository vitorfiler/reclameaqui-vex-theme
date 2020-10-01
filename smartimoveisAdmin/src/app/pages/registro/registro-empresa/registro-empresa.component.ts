import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { CommomService } from 'src/app/services/commom.service';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import { EdificiosCondominios } from 'src/app/_models/edificios-condominios';

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
  mesFatu: string = "2020-03-01";
  inputType = 'password';
  visible = false;
  urlName = "/Empresa";
  cadastroInvalido: Boolean = false;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private commomService: CommomService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      site: ['', Validators.required],
      responsavel: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  registrar(site: string, nome: string, email: string, responsavel: string, estado: string, 
      cidade: string, senha: string, confirmarSenha: string, termosDeUso){

        const body: any = {}

        this.commomService.post(this.urlName, body).subscribe(response =>{
          // localStorage.setItem('Retorno', response.body);
        },
        ()=>{
          this.cadastroInvalido = true;
          console.log("error");
        });
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
