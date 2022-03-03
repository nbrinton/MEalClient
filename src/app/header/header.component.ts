import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { RoutesService } from '../services/routes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pages: Route[] = [];

  constructor(private routesService: RoutesService) { }

  ngOnInit(): void {
    this.pages = this.routesService.get().filter(r => r.data?.nav === true);
  }

}
