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
        label: 'Edifícios / Condomínios',
        type: 'link',
        route: '/edificios-condominios'
      },
      // {
      //   label: 'Bairros',
      //   type: 'dropdown',
      //   children: [   
      //     {
      //       label: 'Bairros Ativos',
      //       type: 'link',
      //       route: '/bairros-ativos'
      //     },      
      //     {
      //       label: 'Bairros inativos',
      //       type: 'link',
      //       route: '/bairros-inativos'
      //     }   
      //   ]
      // },
      {
        label: 'Imóveis',
        type: 'dropdown',
        children: [   
          {
            label: 'Imóveis Ativos',
            type: 'link',
            route: '/imoveis-ativos'
          },      
          {
            label: 'Imóveis inativos',
            type: 'link',
            route: '/imoveis-inativos'
          }   
        ]
      },      
      {
        label: 'Parceiros / XML',
        type: 'link',
        route: '/parceiros'
      },
      {
        label: 'Parceiros Cargas',
        type: 'link',
        route: '/parceiros-carga'
      },
      {
        label: 'Contatos',
        type: 'link',
        route: '/contatos'
      }
    ];
  }
  ngOnInit(): void {
    if(window.localStorage.getItem('Admin') == 'true'){
      this.navigationService.items.push(
        {
          label: 'Editar usuários',
          type: 'link',
          route: '/usuarios'
        }
      )
    }
  }
}
