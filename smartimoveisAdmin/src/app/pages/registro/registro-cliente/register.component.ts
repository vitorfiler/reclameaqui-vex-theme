import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { CommomService } from 'src/app/services/commom.service';

import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import { EdificiosCondominios } from 'src/app/_models/edificios-condominios';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  arrowBack = arrowBack;
  form: FormGroup;
  mesFatu: string = "2020-03-01";
  inputType = 'password';
  visible = false;
  cadastroInvalido: Boolean = false;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  dataNascimento: string = '';
  nome: string;
  usuario: string;
  email: string;

  editedUser = new User;
  idUser: number;
  register = 'CRIAR CONTA';

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private commomService: CommomService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.montarFormularioVazio();
    this.getUsuarioEditar();

  }

  checkPasswords(group: FormGroup) { 
    let senha = group.get('senha').value;
    let confirmaSenha = group.get('confirmaSenha').value;

    return senha === confirmaSenha ? null : { notSame: true }     
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

  montarFormularioVazio(){
    this.form = this.fb.group({
      nome: ['', Validators.required],
      usuario: ['', Validators.required],
      celular: ['', Validators.required],
      facebook: [''],
      twitter: [''],
      linkedin: [''],
      instagram: [''],
      apresentacao: [''],
      email: ['', [Validators.compose([Validators.required, Validators.email])]],
      senha: ['', Validators.required],
      token: [''],
      confirmaSenha: ['', Validators.required],
      termos: ['', Validators.required],
    }, {validator: this.checkPasswords });
  }

  getUsuarioEditar(){
    let id = parseInt(window.localStorage.getItem('idUsuario'));
    window.localStorage.removeItem('idUsuario');
    let users: User[] = [];

    this.commomService.get(`${environment.urlUsuarios}`).subscribe(response =>{
      users = response.body;

      users.forEach(user => { if(user.id == id){ this.editedUser = user; }});

      this.mountaUsuarioEditar();
    })
  }

  mountaUsuarioEditar(){    
    
    if(this.editedUser.id == null || !this.editedUser.id){
      this.register = 'CRIAR CONTA'
    } 
    else {
      this.register = 'EDITAR USUÁRIO'

      this.form = this.fb.group({
        nome: [this.editedUser.nome, Validators.required],
        usuario: [this.editedUser.usuario, Validators.required],
        celular: [this.editedUser.celular, Validators.required],
        facebook: [this.editedUser.facebook],
        twitter: [this.editedUser.twitter],
        linkedin: [this.editedUser.linkedin],
        instagram: [this.editedUser.instagram],
        apresentacao: [this.editedUser.apresentacao],
        email: [this.editedUser.email, Validators.required],
        senha: [this.editedUser.senha, Validators.required],
        token: [this.editedUser.token],
        confirmaSenha: ['', Validators.required],
        termos: ['', Validators.required],
      },{validator: this.checkPasswords });
    }

  }

  logout(){ 
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('idUsuario');
    this.router.navigate(['/login'])
  }

  registrar(){ 
    let request: User = this.form.value;
    if(this.editedUser.id == null || !this.editedUser.id){
    this.commomService.post(`${environment.urlUsuarios}`, request).subscribe(() =>{      

      //this.snackBar.open(MessagesSnackBar.CADASTRO, 'Fechar', { duration: 4000 });
      this.form.reset();
      this.router.navigate(['/usuarios']);
    },
    (error) => {
      console.log(error.message);
      this.snackBar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 4000 });
    });
  }
  else{
    request.id = this.editedUser.id;
      this.commomService.put(`${environment.urlUsuarios}`, request)
      .subscribe(() => {
        this.snackBar.open(MessagesSnackBar.EDITADO, 'Fechar', { duration: 4000 });
        this.form.reset();
        this.router.navigate(['/usuarios']);
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(MessagesSnackBar.EDITADO_ERRO, 'Fechar', { duration: 4000 });
      });
  }
}


  getDataNascimento(event= new Date()){
    let date: Date = new Date(`${event}`);
    this.dataNascimento = this.mesFatu = `${date.getFullYear()}` + `-0${date.getMonth()+1}-` + `0${date.getDate()}`+ "T00:00:00.000Z";
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
