import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { Contact } from '../contact/contact'


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  public lat: number = -23.610835;
  public lng: number = -46.708037;
  public zoom: number = 12; 
  constructor(public formBuilder: FormBuilder, public appService: AppService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      telefone: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }
/*
      "nome": values.name,
      "email": "string",
      "telefone": "string",
      "mensagem": "string",
      "status": "string",
      "dataAbertura": "2020-09-12T06:34:37.537Z"
     */
  public onContactFormSubmit(values):void {

    if (this.contactForm.valid) {
      values.status = 'Aberto';
      values.dataAbertura = new Date();
      this.appService.post(values).subscribe(() =>{
        console.log("Contato sucesso");      
        this.contactForm.reset();
        this.contactForm.controls.nome.setErrors(null);
        this.contactForm.controls.email.setErrors(null);
        this.contactForm.controls.telefone.setErrors(null);
        this.contactForm.controls.mensagem.setErrors(null);
      },
      (error) => {
        console.log(error.message);
      });
    }
  }

}
