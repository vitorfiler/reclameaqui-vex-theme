import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginService } from './login.service';



@Injectable({
  providedIn: 'root'
})
export class CommomService {

  constructor(private http: HttpClient,
              private loginService: LoginService,
              private snackBar: MatSnackBar
    ) { }

headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  token: string = '0';

  validaSessao(){
    return this.loginService.validaSessao();  
  }

  get(urlName: string): Observable<any>{
     return this.http.get(`${environment.url}${urlName}`,{ params: {
      Token: this.token }, observe: "response", headers: this.headers });
  }
  getPromisse(urlName: string): Promise<any>{
    return this.http.get(`${environment.url}${urlName}`,{ params: {
     Token: this.token }, observe: "response", headers: this.headers }).toPromise();
  }
  getImoveis(urlName: string, flagAtivo: string): Observable<any>{
     return this.http.get(`${environment.url}${urlName}`, { params: {
      Token: this.token, Ativos: flagAtivo}, observe: "response", headers: this.headers });
  }
  getFotosImovel(urlName: string, ImovelId: string): Observable<any>{
     return this.http.get(`${environment.url}${urlName}`, { params: {
      Token: this.token, ImovelId: ImovelId}, observe: "response", headers: this.headers });
  }
  getFotosEdificio(urlName: string, edificioId: string): Observable<any>{
     return this.http.get(`${environment.url}${urlName}`, { params: {
      Token: this.token, edificioId: edificioId}, observe: "response", headers: this.headers });
  }
  
  getIdParamsEdificio(urlName: string, id: string, flagAtivo: string): Observable<any>{
    return this.http.get(`${environment.url}${urlName}`, { params: {
     Token: this.token, EdificioId: id, Ativos: flagAtivo}, observe: "response", headers: this.headers });
 }

 getIdParamsImovel(urlName: string, id: string, flagAtivo: string): Observable<any>{
  return this.http.get(`${environment.url}${urlName}`, { params: {
   Token: this.token, ImovelId: id, Ativos: flagAtivo}, observe: "response", headers: this.headers });
}

  post(urlName: string, body: any): Observable<any>{
    return this.http.post(`${environment.url}${urlName}`, body, { params: {
      Token: this.token }, observe: "response", headers: this.headers });
  }

  put(urlName: string, body: any): Observable<any> {
    return this.http.put(`${environment.url}${urlName}`, body, { params: {
      Token: this.token, }, observe: "response", headers: this.headers });
  }

  alteraOrdemFoto(urlName: string, body: any): Promise<any> {
    return this.http.put(`${environment.url}${urlName}`, body, { params: { 
      Token: this.token }, observe: "response", headers: this.headers }).toPromise();
  }

  delete(urlName: string, id: string): Observable<any> {
    return this.http.delete(`${environment.url}${urlName}${id}`, { params: {
      Token: this.token }, observe: "response", headers: this.headers });
  }

  deleteIdParamsEdificio(urlName: string, id: string): Observable<any> {
    return this.http.delete(`${environment.url}${urlName}`, { params: {
      Token: this.token, EdificioId: id }, observe: "response", headers: this.headers });
  }

  deleteIdParamsImovel(urlName: string, id: string): Observable<any> {
    return this.http.delete(`${environment.url}${urlName}`, { params: {
      Token: this.token, ImovelId: id }, observe: "response", headers: this.headers });
  }

  deleteIdParamsUsuario(urlName: string, id: string): Observable<any> {
    return this.http.delete(`${environment.url}${urlName}`, { params: {
      Token: this.token, VendedorId: id }, observe: "response", headers: this.headers });
  }

  deleteFoto(urlName: string, body: any): Observable<any> {
    return this.http.request('delete', `${environment.url}${urlName}`, { params: {
      Token: this.token }, body: body, observe: "response", headers: this.headers, });
  }
  
  public upload(formData): Promise<any> {

    return this.http.post<any>(`${environment.url}/Upload`, formData, {
      reportProgress: true,
      params: {
        Token: this.token},
      observe: 'response'
    }).toPromise();
  }

  putOrdemImovel(urlName: string, imovelId: string, fotoId: string, ordem: number, tipoFoto: number): Observable<any> {
    return this.http.put(`${environment.url}${urlName}`, { params: {
      Token: this.token, imovelId: imovelId, fotoId: fotoId, ordem: ordem, tipoFoto: tipoFoto}, observe: "response", headers: this.headers });
  }  
  
  putOrdemEdificios(urlName: string, edificioId: string, fotoId: string, ordem: number, tipoFoto: number): Observable<any> {
    return this.http.put(`${environment.url}${urlName}`, { params: {
      Token: this.token, edificioId: edificioId, fotoId: fotoId, ordem: ordem, tipoFoto: tipoFoto}, observe: "response", headers: this.headers });
  }  

  dateFormat(date: any): string{
    let dataAbertura: Date = new Date(date);
    let dia: string = dataAbertura.getDate() > 9 ?  dataAbertura.getDate().toString() : '0'+ dataAbertura.getDate().toString();
    let mes: number = dataAbertura.getMonth() + 1;
    let mesFormatado: string = mes > 9 ?  mes.toString() : '0'+ mes.toString();
    let dataFormatada: string = `${dia}/${mesFormatado}/${dataAbertura.getFullYear()}`;

    return dataFormatada;
  }
}
