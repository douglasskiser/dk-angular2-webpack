import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'menu',
  providers: [],
  directives: [...ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  styles: [require('./menu.scss')],
  template: require('./menu.html')
})
export class Menu {
  @Input() private isActive: boolean;
  @Output() public toggle: EventEmitter<boolean>;
  public navItems: [any];

  constructor() {
    this.toggle = new EventEmitter();
    this.navItems = [
      {label: 'Home', route: ['Home']}
    ];
  }

  toggleMenu(): void {
    this.isActive = !this.isActive;
    this.toggle.emit(this.isActive);
  }
}