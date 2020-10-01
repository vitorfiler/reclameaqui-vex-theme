import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Property, Location } from './app.models';
import { AppSettings } from './app.settings';
import { environment } from 'src/environments/environment';

export class Data {
  constructor(public properties: Property[],
              public compareList: Property[],
              public favorites: Property[],
              public locations: Location[]) { }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public Data = new Data(
    [], // properties
    [], // compareList
    [], // favorites
    []  // locations
  )
  public url = "/";
  token: string = '0';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  public apiKey = 'AIzaSyA1rF9bttCxRmsNdZYjW7FzIoyrul5jb-s';
  
  constructor(public http:HttpClient, 
              private bottomSheet: MatBottomSheet, 
              private snackBar: MatSnackBar,
              public appSettings:AppSettings) { }
    
  public getProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(`${environment.url}${environment.properties}`);
  }

  public post(body): Observable<any>{
    return this.http.post(`${environment.url}${environment.contato}`, body,{ params: {
    Token: this.token }, observe: "response", headers: this.headers });
  }
  public getPropertyById(id): Observable<Property>{
    return this.http.get<Property>(`${environment.url}${environment.property}/${id}`);
  }

  public getFeaturedProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(`${environment.url}${environment.featuredProperties}`);
  } 

  public getRelatedProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(`${environment.url}${environment.relatedProperties}`);
  }

  public getPropertiesByAgentId(agentId): Observable<Property[]>{
    return this.http.get<Property[]>(`${environment.url}${environment.propertiesAgentid}/${agentId}`);
  }
  public getDadosHome(): Observable<any>{
    return this.http.get<any>(`${environment.url}${environment.apiHome}`);
  }

  public getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(`${environment.url}${environment.locations}`);
  }

  public getAddress(lat = 40.714224, lng = -73.961452){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey);
  }

  public getLatLng(address){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key='+this.apiKey+'&address='+address);
  }

  public getFullAddress(lat = 40.714224, lng = -73.961452){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey).subscribe(data =>{ 
      return data['results'][0]['formatted_address'];
    });
  }

  public addToCompare(property:Property, component, direction){ 
    if(!this.Data.compareList.filter(item=>item.id == property.id)[0]){
      this.Data.compareList.push(property);
      this.bottomSheet.open(component, {
        direction: direction
      }).afterDismissed().subscribe(isRedirect=>{  
        if(isRedirect){
          window.scrollTo(0,0);
        }        
      }); 
    } 
  }

  public addToFavorites(property:Property, direction){
    if(!this.Data.favorites.filter(item=>item.id == property.id)[0]){
      this.Data.favorites.push(property);
      this.snackBar.open('The property "' + property.title + '" has been added to favorites.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction 
      });  
    }    
  }

  public getPropertyTypes(){
    return [ 
      { id: 1, name: 'Apartamento' },
      { id: 2, name: 'Área' },
      { id: 3, name: 'Casa' },
      { id: 4, name: 'Casa Condomínio' },
      { id: 5, name: 'Cobertura' },
      { id: 6, name: 'Galpão/Barracão' },
      { id: 7, name: 'Industrial' },
      { id: 8, name: 'Loja' },
      { id: 9, name: 'Mobiliado' },
      { id: 10, name: 'Prédio' },
      { id: 11, name: 'Rural' },
      { id: 12, name: 'Sala' },
      { id: 13, name: 'Sobrado' },
      { id: 14, name: 'Terreno' }
    ]
  }

  public getPropertyStatuses(){
    return [ 
      { id: 1, name: 'À Venda' },
      { id: 2, name: 'Para Alugar' }
    ]
  }

  public getNeighborhoods(){
    return [      
      { id: 1, name: 'Astoria', cityId: 1 },
      { id: 2, name: 'Midtown', cityId: 1 },
      { id: 3, name: 'Chinatown', cityId: 1 }, 
      { id: 4, name: 'Austin', cityId: 2 },
      { id: 5, name: 'Englewood', cityId: 2 },
      { id: 6, name: 'Riverdale', cityId: 2 },      
      { id: 7, name: 'Hollywood', cityId: 3 },
      { id: 8, name: 'Sherman Oaks', cityId: 3 },
      { id: 9, name: 'Highland Park', cityId: 3 },
      { id: 10, name: 'Belltown', cityId: 4 },
      { id: 11, name: 'Queen Anne', cityId: 4 },
      { id: 12, name: 'Green Lake', cityId: 4 }      
    ]
  }

  public getFeatures(){
    return [ 
      { id: 1, name: 'Air Conditioning', selected: false },
      { id: 2, name: 'Barbeque', selected: false },
      { id: 3, name: 'Dryer', selected: false },
      { id: 4, name: 'Microwave', selected: false }, 
      { id: 5, name: 'Refrigerator', selected: false },
      { id: 6, name: 'TV Cable', selected: false },
      { id: 7, name: 'Sauna', selected: false },
      { id: 8, name: 'WiFi', selected: false },
      { id: 9, name: 'Fireplace', selected: false },
      { id: 10, name: 'Swimming Pool', selected: false },
      { id: 11, name: 'Gym', selected: false },
    ]
  }


  // public getHomeCarouselSlides(){
  //   return this.http.get<any[]>(`${environment.url}${environment.slides}`);
  // }


  public filterData(data, params: any, sort?, page?, perPage?){ 
   
    if(params){

      if(params.propertyStatus){
        data = data.filter(property => property.propertyStatus == params.propertyStatus.name)
      }

      if(params.propertyType){    //&& params.propertyType.length   
        // let typeList = [];
        // params.propertyType.forEach(type => { typeList.push(type.name) });           
        // let properties = [];
        // data.filter(property =>
        //   property.propertyType.forEach(type => {             
        //     if(typeList.indexOf(type) > -1){                 
        //       if(!properties.includes(property)){
        //         properties.push(property);
        //       }                
        //     }
        //   })
        // );
        // data = properties;
        data = data.filter(property => property.propertyType == params.propertyType.name)
      }

      if(params.price){
        if(this.appSettings.settings.currency == 'USD'){          
          if(params.price.from){
            data = data.filter(property => {
              if(property.priceDollar.sale && property.priceDollar.sale >= params.price.from ){
                return true;
              }
              if(property.priceDollar.rent && property.priceDollar.rent >= params.price.from ){
                return true;
              } 
              return false;
            });
          }
          if(params.price.to){
            data = data.filter(property => {
              if(property.priceDollar.sale && property.priceDollar.sale <= params.price.to){
                return true;
              }
              if(property.priceDollar.rent && property.priceDollar.rent <= params.price.to){
                return true;
              } 
              return false;
            });          
          }
        }
        if(this.appSettings.settings.currency == 'EUR'){
          if(params.price.from){
            data = data.filter(property => {
              if(property.priceEuro.sale && property.priceEuro.sale >= params.price.from ){
                return true;
              }
              if(property.priceEuro.rent && property.priceEuro.rent >= params.price.from ){
                return true;
              } 
              return false;
            });

          }
          if(params.price.to){
            data = data.filter(property => {
              if(property.priceEuro.sale && property.priceEuro.sale <= params.price.to){
                return true;
              }
              if(property.priceEuro.rent && property.priceEuro.rent <= params.price.to){
                return true;
              } 
              return false;
            });
          }
        }        
      }  

      if(params.city){
        data = data.filter(property => property.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") == params.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
      }

      if(params.zipCode){
        data = data.filter(property => property.zipCode == params.zipCode)
      }
      
      if(params.neighborhood && params.neighborhood.length){       
        let neighborhoods = [];
        params.neighborhood.forEach(item => { neighborhoods.push(item.name) });           
        let properties = [];
        data.filter(property =>
          property.neighborhood.forEach(item => {             
            if(neighborhoods.indexOf(item) > -1){                 
              if(!properties.includes(property)){
                properties.push(property);
              }                
            }
          })
        );
        data = properties;
      }

      if(params.street){       
        data = data.filter(property => property.street[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") == params.street.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
      }

      if(params.bedrooms){
        if(params.bedrooms.from){
          data = data.filter(property => property.bedrooms >= params.bedrooms.from)
        }
        if(params.bedrooms.to){
          data = data.filter(property => property.bedrooms <= params.bedrooms.to)
        }
      } 
      
      if(params.bathrooms){
        if(params.bathrooms.from){
          data = data.filter(property => property.bathrooms >= params.bathrooms.from)
        }
        if(params.bathrooms.to){
          data = data.filter(property => property.bathrooms <= params.bathrooms.to)
        }
      } 

      if(params.garages){
        if(params.garages.from){
          data = data.filter(property => property.garages >= params.garages.from)
        }
        if(params.garages.to){
          data = data.filter(property => property.garages <= params.garages.to)
        }
      } 

      if(params.area){
        if(params.area.from){
          data = data.filter(property => property.area.value >= params.area.from)
        }
        if(params.area.to){
          data = data.filter(property => property.area.value <= params.area.to)
        }
      } 

      if(params.yearBuilt){
        if(params.yearBuilt.from){
          data = data.filter(property => property.yearBuilt >= params.yearBuilt.from)
        }
        if(params.yearBuilt.to){
          data = data.filter(property => property.yearBuilt <= params.yearBuilt.to)
        }
      }

      if(params.features){       
        let arr = [];
        params.features.forEach(feature => { 
          if(feature.selected)
            arr.push(feature.name);
        });  
        if(arr.length > 0){
          let properties = [];
          data.filter(property =>
            property.features.forEach(feature => {             
              if(arr.indexOf(feature) > -1){                 
                if(!properties.includes(property)){
                  properties.push(property);
                }                
              }
            })
          );
          data = properties;
        }
      }      
    } 
     
    this.sortData(sort, data);
    return this.paginator(data, page, perPage)
  }

  public sortData(sort, data){
    if(sort){
      switch (sort) {
        case 'Mais novo':
          data = data.sort((a, b)=> {             
          if((a.id) < (b.id)){
            return 1;
          }
          if((a.id) > (b.id)){
            return -1;
          }
          return 0;  
        });

          break;
        case 'Mais velho':
          data = data.sort((a, b)=> {
            if((a.id) > (b.id)){
              return 1;
            }
            if((a.id) < (b.id)){
              return -1;
            }
            return 0;  
          });
          break;
        // case 'Popular':
        //   data = data.sort((a, b) => { 
        //     if(a.ratingsValue/a.ratingsCount < b.ratingsValue/b.ratingsCount){
        //       return 1;
        //     }
        //     if(a.ratingsValue/a.ratingsCount > b.ratingsValue/b.ratingsCount){
        //       return -1;
        //     }
        //     return 0; 
        //   });
        //   break;
        case 'Preço (Menor para o Maior)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.priceEuro.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          break;
        case 'Preço (Maior para o Menor)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items, page?, perPage?) { 
    var page = page || 1,
    perPage = perPage || 4,
    offset = (page - 1) * perPage,   
    paginatedItems = items.slice(offset).slice(0, perPage),
    totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination:{
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      }
    };
  }



  public getTestimonials(){
    return [
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Mr. Adam Sandler', 
            position: 'General Director', 
            image: 'assets/images/profile/adam.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Ashley Ahlberg', 
            position: 'Housewife', 
            image: 'assets/images/profile/ashley.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Bruno Vespa', 
            position: 'Blogger', 
            image: 'assets/images/profile/bruno.jpg' 
        },
        { 
            text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.', 
            author: 'Mrs. Julia Aniston', 
            position: 'Marketing Manager', 
            image: 'assets/images/profile/julia.jpg' 
        }
    ];
  }

  public getAgents(){
    return [        
        { 
            id: 1,
            fullName: 'Lusia Manuel',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'HouseKey',
            email: 'lusia.m@housekey.com',
            phone: '(224) 267-1346',
            social: {
              facebook: 'lusia',
              twitter: 'lusia',
              linkedin: 'lusia',
              instagram: 'lusia',
              website: 'https://lusia.manuel.com'
            },
            ratingsCount: 6,
            ratingsValue: 480,
            image: 'assets/images/agents/a-1.jpg' 
        },
        { 
            id: 2,
            fullName: 'Andy Warhol',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'HouseKey',
            email: 'andy.w@housekey.com',
            phone: '(212) 457-2308',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://andy.warhol.com'
            },
            ratingsCount: 4,
            ratingsValue: 400,
            image: 'assets/images/agents/a-2.jpg' 
        },        
        { 
            id: 3,
            fullName: 'Tereza Stiles',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'HouseKey',
            email: 'tereza.s@housekey.com',
            phone: '(214) 617-2614',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://tereza.stiles.com'
            },
            ratingsCount: 4,
            ratingsValue: 380,
            image: 'assets/images/agents/a-3.jpg' 
        },
        { 
          id: 4,
          fullName: 'Michael Blair',
          desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
          organization: 'HouseKey',
          email: 'michael.b@housekey.com',
          phone: '(267) 388-1637',
          social: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: '',
            website: 'https://michael.blair.com'
          },
          ratingsCount: 6,
          ratingsValue: 480,
          image: 'assets/images/agents/a-4.jpg'  
        },
        { 
            id: 5,
            fullName: 'Michelle Ormond',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'HouseKey',
            email: 'michelle.o@housekey.com',
            phone: '(267) 388-1637',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://michelle.ormond.com'
            },
            ratingsCount: 6,
            ratingsValue: 480, 
            image: 'assets/images/agents/a-5.jpg' 
        }
    ];
  }



  public getClients(){
    return [  
        { name: 'aloha', image: 'assets/images/clients/aloha.png' },
        { name: 'dream', image: 'assets/images/clients/dream.png' },  
        { name: 'congrats', image: 'assets/images/clients/congrats.png' },
        { name: 'best', image: 'assets/images/clients/best.png' },
        { name: 'original', image: 'assets/images/clients/original.png' },
        { name: 'retro', image: 'assets/images/clients/retro.png' },
        { name: 'king', image: 'assets/images/clients/king.png' },
        { name: 'love', image: 'assets/images/clients/love.png' },
        { name: 'the', image: 'assets/images/clients/the.png' },
        { name: 'easter', image: 'assets/images/clients/easter.png' },
        { name: 'with', image: 'assets/images/clients/with.png' },
        { name: 'special', image: 'assets/images/clients/special.png' },
        { name: 'bravo', image: 'assets/images/clients/bravo.png' }
    ];
  }


}
