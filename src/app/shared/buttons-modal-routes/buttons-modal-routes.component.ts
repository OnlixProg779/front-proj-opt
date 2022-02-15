import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-buttons-modal-routes',
  templateUrl: './buttons-modal-routes.component.html',
  styleUrls: ['./buttons-modal-routes.component.scss']
})
export class ButtonsModalRoutesComponent implements OnInit {

  @Input()
  properties: PropertiesButton[];

  @Input()
  modal;
  
  constructor() { }

  ngOnInit(): void {
  }

}

export class PropertiesButton{

  constructor(
    number: string,
    tittle: string,
    classNg: string,
    route: string,
    icon: string,
    iconClass: string,
    style: string){
      this.number = number;
      this.tittle = tittle;
      this.classNg = classNg;
      this.route = route;
      this.icon = icon;
      this.iconClass = iconClass;
      this.style = style;
  }
  number: string;
  tittle: string;
  classNg: string;//bg-danger card-body
  route: string;///clients/create-client
  icon: string; //users
  iconClass: string; //font-danger
  style: string;
}
