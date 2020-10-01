import { Component } from '@angular/core';
import { Settings, AppSettings } from './app.settings';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
  public settings: Settings;
  constructor(public appSettings:AppSettings, public router:Router, public appService:AppService){
    this.appService.getDadosHome().subscribe(response =>{
      // console.log(response.properties);
      localStorage.setItem("locations", JSON.stringify(response.locations));
      localStorage.setItem("agents", JSON.stringify(response.agents));
      localStorage.setItem("properties", JSON.stringify(response.properties));
    })
    this.settings = this.appSettings.settings;
  }

  ngAfterViewInit(){ 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {   
        setTimeout(() => {
          window.scrollTo(0,0);
        }); 
      }            
    });    
  }

}
