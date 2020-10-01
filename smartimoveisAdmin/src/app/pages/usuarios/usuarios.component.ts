import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Bairro } from 'src/app/_models/bairros';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';
import icSearch from '@iconify/icons-ic/twotone-search';

@Component({
  selector: 'vex-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  icSearch = icSearch;
  listTable: User[] = [];
  //preencheTable: User[] = []
  isTabelaBairro = true;
  isFormCadastroBairro: Boolean = false;
  personalInfoComplete = true;

  displayedColumns = ['Nome', 'Usuario', 'Email','Acoes'];
  dataSource: MatTableDataSource<User>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  // formDadosBairro: FormGroup;
  formDadosReclamacao: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router, 
    private commomService: CommomService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
     } 

    // this.formDadosBairro = this.fb.group({
    //   titulo: ['', Validators.required]
    // });
    this.getUsuarios();
  }

  editar(id: string){
    window.localStorage.setItem('idUsuario', id);
    this.router.navigate(['/cad-cliente'])
  }

  delete(user: User){
    this.commomService.deleteIdParamsUsuario(environment.urlUsuarios, user.id.toString())   //VAI TROCAR O USUÁRIO PARA INATIVO
    .subscribe(() => {
      this.snackBar.open(MessagesSnackBar.ITEM_REMOVIDO, 'Fechar', { duration: 4000 });
        this.listTable = this.listTable.filter(userTable => { 
          return userTable.id != user.id;
        });
        this.dataSource = new MatTableDataSource(this.listTable);
    },
    (error) => {
      console.log(error.message);
      this.snackBar.open(MessagesSnackBar.ITEM_REMOVIDO_ERRO, 'Fechar', { duration: 4000 });
    });
  }


  // formCadastro(){
  //   this.isTabelaBairro = false
  //   this.isFormCadastroBairro = true
  // }
  
  // cadastrarUsuario(){
  //   this.isFormCadastroBairro = false
  //   this.isTabelaBairro = true

  // }
  getUsuarios(){
    let flagAtivo = 0;
    let url = window.location.href.substring(22);
    if(url == 'bairros-ativos'){
      flagAtivo = 1;
    }else{
      flagAtivo = 0;
    }
    this.commomService.get(`${environment.urlUsuarios}`).subscribe(response =>{
        this.listTable = response.body;
        
          this.dataSource = new MatTableDataSource(this.listTable);
          this.dataSource.paginator = this.paginator;        
      }); 
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
