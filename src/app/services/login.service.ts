
import { environment } from './../../environments/environment';
import { JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
 
 

  constructor(private http:HttpClient) { }

  api:string = environment.apiUrl

  tokenUrl:string =  environment.apiUrl +'/' + environment.obterTokenUrl

  clientId: string = environment.clientId;

  clientSecret: string = environment.clientSecret

  jwtHelper: JwtHelperService = new JwtHelperService();

  obterToken(){
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token
    }
    return null
  }

  getUsuarioAutenticado(){
    const token = this.obterToken()
    if(token) {
     const usuario = this.jwtHelper.decodeToken(token).user_name
     return usuario;
    }
    return null
  }

  isAutenticado () {
    
    const token = this.obterToken();

    if(token) {
      const  expirado = this.jwtHelper.isTokenExpired(token)
      return !expirado
    }

    

    
    return false;
  }


  tentarLogar(username: string, password:string):Observable<any> {

    localStorage.clear();

    const headers = {
      
      'Authorization' : 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type' :  'application/x-www-form-urlencoded'
    }

    const params = new HttpParams()
                                  .set('username', username)
                                  .set('password', password)
                                  .set('grant_type', 'password')

    return this.http.post(this.tokenUrl, params.toString(), {headers} );
  }

 
 

}
