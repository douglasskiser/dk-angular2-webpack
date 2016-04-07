import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home',
  providers: [],
  directives: [...ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class Home {
  constructor() {}
}