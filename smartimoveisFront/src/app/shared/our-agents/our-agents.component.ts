import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-our-agents',
  templateUrl: './our-agents.component.html',
  styleUrls: ['./our-agents.component.scss']
})
export class OurAgentsComponent implements OnInit {
  public agents = [];
  public config: SwiperConfigInterface = { };
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.getAgents();
  }

  getAgents(){

    let agentsStr = localStorage.getItem("agents");
    let agents: any[] = JSON.parse(agentsStr);

    agents.forEach(agent => {
      this.agents.push({
        id: agent.id,
        fullName: agent.nome,
        desc: agent.apresentacao,            
        organization: 'SpotImoveis',
        email: agent.email,
        phone: agent.celular,
        social: {
          facebook: agent.facebook,
          twitter: agent.twitter,
          linkedin: agent.linkedin,
          instagram :agent.instagram,
          website: ''
        },
        ratingsCount: 6,
        ratingsValue: 480,
        image: agent.foto
      });
    });

            




  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,       
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,        
      loop: false,
      preloadImages: false,
      lazy: true,  
      breakpoints: {
        600: {
          slidesPerView: 1,
        },
        960: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        }
      }
    }
  }

}
