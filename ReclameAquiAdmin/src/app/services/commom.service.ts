import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Email } from '../_models/email';
import { ReclamacaoFeedEmpresa } from '../_models/reclamacao';



@Injectable({
  providedIn: 'root'
})
export class CommomService {

  constructor(private http: HttpClient,
              private route: Router,
              private snackBar: MatSnackBar
              
    ) { }

headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
Token = "MDS88sDr33LLK@lV1m";

enviarEmailCliente(status: string, reclamacaoId: string, reclamacaoFiltrada = new ReclamacaoFeedEmpresa()){
    //processo de envio de e-mail para o cliente e para a empresa.
    var oEmail = new Email();
    // var oCliente = JSON.parse(localStorage.getItem("retornoLogin"));
    console.log(reclamacaoFiltrada);
    
    oEmail.Cliente = reclamacaoFiltrada.NomeReclamante;
    oEmail.EmailDestino = reclamacaoFiltrada.Email;
    oEmail.Empresa = localStorage.getItem("usuarioLogadoEmpresa");
    oEmail.Mensagem = "";

    //Montando o Body
    var body = this.emailBodyCliente(reclamacaoFiltrada.NomeReclamante, oEmail.Empresa, status, "");
    oEmail.EmailBody = body;
    oEmail.Status = 1;
    oEmail.Subject = "Reclame Aqui Nova Lima - Reclamação: " + reclamacaoId;
    
    this.post("/Email", JSON.stringify(oEmail)).then(response => {
      console.log(response.body);
      
    })
}
enviarEmailEmpresa(status: string, reclamacaoId: string, reclamacaoFiltrada = new ReclamacaoFeedEmpresa(), nomeEmpresa: string){
    var oEmail = new Email();
    oEmail.Cliente = reclamacaoFiltrada.NomeReclamante;
    oEmail.EmailDestino = reclamacaoFiltrada.Email;
    oEmail.Empresa = nomeEmpresa;
    oEmail.Mensagem = "O quanto antes você iniciar a análise melhor será seu rating.";
    //montando o body
    var body = this.emailBodyEmpresa(reclamacaoFiltrada.NomeReclamante, oEmail.Empresa, status, oEmail.Mensagem);
    oEmail.EmailBody = body;
    oEmail.Status = 1;
    oEmail.Subject = "Reclame Aqui Nova Lima - Reclamação: " + reclamacaoId;

    this.post("/Email", JSON.stringify(oEmail)).then(response => {

    }).catch(() => {
        console.log("error envio email Empresa");
    });

}
logout(){
  this.route.navigate(['/home/init'])
  window.localStorage.removeItem('empresas')
  window.localStorage.removeItem('usuarioLogadoEmpresa')
  window.localStorage.removeItem('retornoLogin')
  window.localStorage.removeItem('empresaId')
  window.localStorage.removeItem('usuarioLogado')
  window.localStorage.removeItem('clientId')
  window.localStorage.removeItem('retornoLoginEmpresa')
  window.localStorage.removeItem('clienteEmail')
  window.localStorage.removeItem('TodasCategorias')
  window.localStorage.removeItem('cliente')
  window.localStorage.removeItem('empresa')
  location.reload();
}
  

  get(urlName: string): Observable<any>{
     return this.http.get(`${environment.url}${urlName}`,{ params: {
      Token: this.Token}, observe: "response"});

  }
  getRating(urlName: string, idCategoria: string ): Observable<any>{
    return this.http.get(`${environment.url}${urlName}/${idCategoria}`,{params: {
      Token: this.Token}, observe: "response"});

 }
  
  getReclamacoes(urlName: string, clientId: string, statusId: string): Observable<any>{
    return this.http.get(`${environment.url}${urlName}`,{ params: {
      clienteId: clientId, sstatusId: statusId, Token: this.Token}, observe: "response", headers: this.headers });
  }

  getReclamacoesEmpresa(urlName: string, empresaId: string, statusId: string): Observable<any>{
    return this.http.get(`${environment.url}${urlName}`,{ params: {
      empresaId: empresaId, statusId: statusId, Token: this.Token}, observe: "response", headers: this.headers });
  }
  
  post(urlName: string, body: string): Promise<any> {

    let promise = this.http.post(`${environment.url}${urlName}`, body, { params: {
      Token: this.Token}, observe: "response", headers: this.headers }).toPromise();
    return promise
  }

  postMokoon(urlName: string, string: string): Observable<any>{
    return this.http.post(`${environment.url}${urlName}`, string, { params: {
      Token: this.Token}, observe: "response", headers: this.headers });
  }

  put(urlName: string, body: string, clientId: string): Observable<any> {
    return this.http.put(`${environment.url}${urlName}`, body, { params: {
      clienteID: clientId, Token: this.Token }, observe: "response", headers: this.headers });
  }

  alterarReclamacao(urlName: string, reclamacaoId: string, statusId: string): Observable<any> {
    return this.http.put(`${environment.url}${urlName}?ReclamacaoId=${reclamacaoId}&StatusId=${statusId}&Token=${this.Token}`,{ params: {
      Token: this.Token}, observe: "response"});
  }

  delete(urlName: string): Promise<any> {
    let promise = this.http.get(`${environment.url}${urlName}`, { params: {
      Token: this.Token}, observe: "response", headers: this.headers }).toPromise();
    return promise
  }

  public upload(formData): Promise<any> {

    return this.http.post<any>(`${environment.url}/Arquivos`, formData, {
      reportProgress: true,
      params: {
        Token: this.Token},
      observe: 'response'
    }).toPromise();
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }
  
  trocarEmailOuSenha(urlName: string, body: string, tipo: string): Observable<any> {
    return this.http.post(`${environment.url}${urlName}`, body, { params: {
      tipo: tipo, Token: this.Token }, observe: "response", headers: this.headers });
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
