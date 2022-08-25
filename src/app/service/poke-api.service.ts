import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Obersvable
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  //criamos uma varivavel chamado url que recebe a string do pokeapi
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'

  constructor(
    //Aqui embaixo estamos chamando o HTTP para poder usar (Só lembrando que precisa importar o HttpClienteModule no app.module.ts)
    private http: HttpClient
  ) { }

  //metodo get, criamos uma função para puxar todos os pokemons
  //Vale relembrar que o metodo get não aceita parametros
  //É necessário um Osbervable, ele fica observando a nossa API para quando tem alguma alteração, informamos any porque ele vai retornar qualquer coisa
  get apiListAllPokemons():Observable<any>{
    //Aqui pedimos para puxar a url, o pipe é tipo uma conexão/filtro
    return this.http.get<any>(this.url).pipe(
      //vai pegar, fazer algo e depois passa para a proxima função
      tap( res => res ),  //tap vai receber alguma coisa e depois vai responder outra coisa
      tap( res => {
        //Res é a api, e result é onde está o pokemon dentro da API, só olhar no link da API, dps do previous
        res.results.map( (resPokemons: any) => { //map do javascript, dentro dele criamos a variavel resPokemons e que pode retornar qualquer coisa(só pra não ficar gritando ali) - Esse projeto ta sendo sem tipagem, mas o próximo vai conter
          //^^^^ dentro desse results que tem todas as infos dos pokemons
          //Aqui a gente precisaria fazer a mesma função, então já transformamos em um metodo e chamamos ela (apiGetPokemon) e passamos a url como parametro
          this.apiGetPokemon(resPokemons.url).subscribe( //depois demos o res que rescebe os status do pokemon (resPokemon é a lista completa do pokemon, e só passamos para dentro do res os status)
            res => resPokemons.status = res
          );
          //Res é response
        })
      }),
    )
  }

  public apiGetPokemon( url: string ):Observable<any>{
    return this.http.get<any>( url ).pipe(
      map(
        res => res
      )
    )
  }

}
