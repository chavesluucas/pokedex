import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  //Aparecer a img de erro caso der algum problema
  public apiError: boolean = false;

  //getAll que criamos dentro do service, ele vai ser any porque ele recebe qualquer coisa
  public getAllPokemons: any;
  private setAllPokemons: any; //set é para quando apagar na barra de pesquisa, volte os pokemons

  constructor(
    private service: PokeApiService //Importanto a PokeApi que a gente fez no poke-api.service
  ) { }

  ngOnInit(): void {
    //estanciando a poke-api para poder carregar ela
    this.service.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons; //estamos pegando só os resultados, para não pegar o objeto inteiro
      },
      error => {
        this.apiError = true; //caso ao carregar der erro, mude apiError para true e assim mostrar a imagem
      }
    )
  }

  //esse search vai receber, o outro ta enviando
  public getSearch(value : string){ //o metodo vai receber um value que é uma string
    //essa const é para filtrar os pokemon | o filter é do proprio js, ele filtra os valores conforme a gente informar
    const filter = this.setAllPokemons.filter( ( res: any )=> {
      return  !res.name.indexOf(value.toLowerCase()) ; //retorne as primeiras letras do name (em letra minuscula)
    })

    this.getAllPokemons = filter;
  }

}
