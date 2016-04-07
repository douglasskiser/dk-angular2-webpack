import {provide} from 'angular2/core';

export const WINDOW_PROVIDERS: any[] = [
  provide(Window, {
    useValue: global
  })
];