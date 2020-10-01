import { filter } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-hot-offer-today',
  templateUrl: './hot-offer-today.component.html',
  styleUrls: ['./hot-offer-today.component.scss']
})
export class HotOfferTodayComponent implements OnInit {
  @Input() properties;
  public listProperties: any[] = [];
  constructor(public appService:AppService) { }

  ngOnInit() {
      
      this.listProperties = this.properties.filter(property => {
        return property.superDestaque == true;
      })
  }

}
