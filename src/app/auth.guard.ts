import { LoginService } from './services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service:LoginService, private router:Router) {}

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : boolean {

      const autenticado = this.service.isAutenticado();

      if(autenticado) 
      { 
        return true
      } 
      else 
      { 
        this.router.navigate(['/login']) ;
        return false;
      }
      
 //     return this.service.isAutenticado();
    }

  
    
  }
