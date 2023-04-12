import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'https://localhost:44383/usuario';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  GetListaUsuarios(): Observable<Usuario[]>{

    return this.http.get<Usuario[]>(this.url + "/GetListaUsuarios");
    }

    InsertUsuario(usuario: Usuario) : Observable<any>{

        return this.http.post<Usuario>(this.url + "/InsertUsuario", JSON.stringify(usuario), this.httpOptions);
    }

    PegarUsuarioPeloId(id: number): Observable<Usuario> {
      const apiUrl = `${this.url}/${id}`;
      return this.http.get<Usuario>(apiUrl);
    }

    UpdateUsuario(usuario: Usuario) : Observable<any>{

      return this.http.post<Usuario>(this.url + "/UpdateUsuario", usuario, this.httpOptions);
    }

    DeleteUsuario(usuario: Usuario) : Observable<any>{

      return this.http.post<Usuario>(this.url + "/DeleteUsuario", usuario, this.httpOptions);
    }

}
