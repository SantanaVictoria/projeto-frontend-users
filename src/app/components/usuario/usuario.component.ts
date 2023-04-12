import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  public titulo = 'Usuarios';
  public usuarioSelecionado = new Usuario();

  usuarios: Usuario[]=[];

  public usuarioSelect(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
  }

  public escolaridades = [
    {id: 1, nome: 'Infantil'},
    {id: 2, nome: 'Fundamental'},
    {id: 3, nome: 'Ensino médio'},
    {id: 4, nome: 'Superior'}
  ]

  formulario: any;
  tituloFormulario = '';
  modalRef!: BsModalRef;

  constructor(private usuarioService: UsuarioService, private fb:FormBuilder, private modalService: BsModalService) {
  }

  ngOnInit(): void {

    this.usuarioService.GetListaUsuarios().subscribe(res => {
      this.usuarios = res;
    });

    console.log('Select');
    console.log(this.fb.group({country:[2]}));

     this.tituloFormulario = 'Novo Usuario';
    this.formulario = new FormGroup({
    id: new FormControl(0),
    nome: new FormControl(null),
    sobrenome: new FormControl(null),
    email: new FormControl(null),
    dataNascimento: new FormControl(null),
    escolaridade: new FormControl(null)

    });
  }

  UpdateUsuario(id: number): void {

    this.usuarioService.PegarUsuarioPeloId(id).subscribe((resultado) => {
    this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}${resultado.email} ${resultado.dataNascimento} ${resultado.escolaridade}`;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        email: new FormControl(resultado.email),
        dataNascimento: new FormControl(resultado.dataNascimento),
        escolaridade: new FormControl(resultado.escolaridade)
      });
    });

    this.usuarioService.GetListaUsuarios().subscribe(res => {
      this.usuarios = res;
    });
  }

  EnviarFormulario(): void {

    const usuario: Usuario = this.formulario.value;

    console.log(usuario);

    if(usuario.id > 0){
      this.usuarioService.UpdateUsuario(usuario).subscribe();
    } else {
      this.usuarioService.InsertUsuario(usuario).subscribe();
    }
  }

  DeleteUsuario(id: number): void {

    console.log(id);

    const usuario: Usuario = this.formulario.value;
    usuario.id = id;
    usuario.nome = 'A';
    usuario.sobrenome = 'AA';
    usuario.email = 'AA';
    usuario.dataNascimento = new Date();
    usuario.escolaridade = 1;

      console.log(usuario);

      this.usuarioService.DeleteUsuario(usuario).subscribe();

      this.usuarioService.GetListaUsuarios().subscribe(res => {
        this.usuarios = res;
      });
  }

}
