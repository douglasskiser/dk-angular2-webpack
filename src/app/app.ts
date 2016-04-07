import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS, CORE_DIRECTIVES} from 'angular2/common';

import {Home} from './components/home/home';
import {NotFound} from './components/404/404';
import {Menu} from './components/menu/menu';

@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, CORE_DIRECTIVES, Menu],
  styles: [require('./app.scss')],
  template: require('./app.html'),
  host: {
    class: 'app'
  }
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home'},
  {path: '/home', component: Home, name: 'Home'},
  {path: '/**', component: NotFound, name: 'NotFound'}
])
export class App {
  public isMenuActive: boolean;

  constructor() {
    this.isMenuActive = false;
  }

  toggleMenu(isActive): void {
    this.isMenuActive = arguments.length ? isActive : !this.isMenuActive;
  }
}