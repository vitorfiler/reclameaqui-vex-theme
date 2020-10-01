import { Component, Inject, LOCALE_ID, Renderer2, OnInit } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import { CommomService } from 'src/app/services/commom.service';


@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'vex';
  urlName: string = '/todas-categorias'
  rankingUrl = '/Rating'
  listCategorias: any[] = []
  categoriaDinamica = {}
  id: number = 1;
  dropdown: any[]=[];
  children1: any[] = [];
  children2: any[] = [];
  children3: any[] = [];
  children4: any[] = [];
  children5: any[] = [];
  children6: any[] = [];
  children7: any[] = [];
  children8: any[] = [];
  children9: any[] = [];
  children10: any[] = [];
  children11: any[] = [];
  children12: any[] = [];
  children13: any[] = [];
  

  constructor(private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private commomService: CommomService) {
      Settings.defaultLocale = this.localeId;
      
      if (this.platform.BLINK) {
        this.renderer.addClass(this.document.body, 'is-blink');
      }
      
    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    showConfigButton: false,
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));
    this.navigationService.items = [
      {
        label: 'categorias',
        type: 'dropdown',
        children: [  
          {
            label: 'veículos e acessórios',
            type: 'dropdown',
            children: [
            ]
          },  
          {
            label: 'turismo e lazer',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'telefonia, tV e internet',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'saúde',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'móveis e decoração',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'moda',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'mãe e bebê',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'educação',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'ecommerce',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'casa e construção',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'beleza e estética',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'bancos e cartões',
            type: 'dropdown',
            children: [
            ]
          },
          {
            label: 'alimentos e bebidas',
            type: 'dropdown',
            children: [
            ]
          },

        ]
      },
      {
        label: 'reclamar',
        type: 'link',
        route: '/reclamar'
      },  
    /*{
        label: 'cadastro',
        type: 'link',
        route: '/categoria'
      }, */
      // {
      //   label: 'compare',
      //   type: 'link',
      //   route: '/compare'
      // },
      {
        label: 'rankings',
        type: 'link',
        route: '/ranking'
      },
      // {
      //   label: 'cadastre sua compra',
      //   type: 'link',
      //   route: '/cad-compra'
      // },
      {
        label: 'todas as categorias',
        type: 'link',
        route: '/todas-categorias'
      },
      // {
      //   label: 'Cadastrar cliente',
      //   type: 'link',
      //   route: '/cadcliente'
      // },
      // {
      //   label: 'Cadastrar empresa',
      //   type: 'link',
      //   route: '/cadempresa'
      // },
    ];
  }
  ngOnInit(): void {
    if(window.localStorage.getItem('cliente') == 'true'){
      this.navigationService.items.push(
        {
          label: 'Cadastrar empresa',
          type: 'link',
          route: '/cadempresa'
        }
      )
    }else if(window.localStorage.getItem('cliente') != 'true' && window.localStorage.getItem('empresa') != 'true'){
      this.navigationService.items.push(
        {
          label: 'Cadastrar cliente',
          type: 'link',
          route: '/cadcliente'
        },
        {
          label: 'Cadastrar empresa',
          type: 'link',
          route: '/cadempresa'
        }
      )
    }
    // this.renderizaDropdown();
    this.getDropdown();
    this.commomService.get(this.urlName).subscribe(response=>{
      localStorage.setItem("TodasCategorias", JSON.stringify(response.body.linhas));
    })
    this.commomService.get(this.rankingUrl).subscribe(response=>{
      localStorage.setItem("Rankings", JSON.stringify(response.body.rankings));
    })
  }
  
  getDropdown(){
    let urlName = '/DropDown'
    this.commomService.get(urlName).subscribe(response => {
      
      this.dropdown = response.body.categorias;
      this.renderizaDropdown();
    });
  }
  
  renderizaDropdown(){
    this.listCategorias.push(this.navigationService.items[0])

    for (let i = 0; i < this.dropdown.length; i++) {
      this['children'+this.id] = this.dropdown[i].categoria;
      this.listCategorias[0].children[i].children = this['children'+this.id]
    }
  }
  
}
