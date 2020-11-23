import { LoginService } from './../../services/login.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(private loginService:LoginService ,location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  

  nome:string

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    this.nome = this.loginService.getUsuarioAutenticado()

  //  console.log(this.nome)
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
