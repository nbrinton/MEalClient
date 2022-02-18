import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  routes: Route[] = [];

  constructor(private router: Router) {
    this.routes = _.cloneDeep(this.router.config.filter(p => p.path !== '' && p.path !== '**'));
    this.routes.forEach(r => {
      r.children = r.children?.filter(c => c.path !== '' && c.path != '**');
    });
  }

  get(): Route[] {
    return _.cloneDeep(this.routes);
  }
}
