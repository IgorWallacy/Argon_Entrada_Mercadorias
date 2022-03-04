import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/lotes', title: 'Data de Validade',  icon: 'ni-calendar-grid-58 text-primary', class: '' }
   
   
    
     ]
   

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = false;
  nome: string;

  

  constructor(private router: Router, private loginService:LoginService) { }

  ngOnInit() {
    this.nome = this.loginService.getUsuarioAutenticado()
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = false;
   });
  }
}
