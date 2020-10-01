// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  url: 'http://waih.uni5.net/api',
  //url: 'http://localhost:5000/api',
  
  urlEdificiosCondominios: '/edificios-condominios/',
  urlCadEdificio: '/Edificios/',
  urlGetDadosEdificioCondominioId: '/Edificios/GetById/',
  urlPutFotosEdificios: '/Edificios/fotos-edificio-ordem',
  urlBairros: '/bairros/',
  urlImoveis: '/Imoveis/',
  urlLogin: '/Login/logar/',
  urlCadImoveis: '/Imoveis/',
  urlGetDadosImoveisId: '/Imoveis/GetById/',
  urlFotosImovel: '/Imoveis/fotos-imovel/',
  urlDeleteFotosImovel: '/Imoveis/imoveis-fotos-delete',
  urlFotosEdificio: '/Edificios/fotos-edificio/',
  urlDeleteFotosEdificio: '/Edificios/edificios-fotos-delete',
  urlAreas: '/areas/',
  urlUsuarios: '/Login/',
  //urlUsuario: '/usuario/',
  parceiros: {
    url: '/Parceiro/',
    urlXml: '/XML/',
    urlVariaveisXML: '/VariavelXML/',
    urlCarga: '/ParceiroCarga/',
    urlControlaArquivoXML: '/ControlaArquivoXML/'
  },
  contato: { 
    url: '/Contato/',
    urlAtualizaStatus: '/Contato/atualiza-status/'
  },
  urlUpload: '/Upload/',


  //ambiente: "dev",
  ambiente: "prod",
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
