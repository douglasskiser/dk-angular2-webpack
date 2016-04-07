import {Component} from 'angular2/core';

@Component({
  selector: 'not-found',
  //styles: [require('./home.scss')],
  template: require('./404.html')
})
export class NotFound {
  constructor() {}
}