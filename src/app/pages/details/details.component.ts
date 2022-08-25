import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

//poke api service
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlId: string = "http://pokeapi.co/api/v2/pokemon";
  private urlName: string = "http://pokeapi.co/api/v2/pokemon-species";

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private service: PokeApiService
  ) { }

  ngOnInit(): void {
    //iniciando a função para pegar os pokemon
    this.getPokemon;
  }

  //Typescript
  get getPokemon(){
    //pegando o ID 
    const id = this.activedRoute.snapshot.params['id'];

    //Passando o id dentro da url para só puxar o pokemon que a gente clicar
    const pokemon = this.service.apiGetPokemon(`${this.urlId}/${id}`);

    //Passando o id para pegar a especie
    const name = this.service.apiGetPokemon(`${this.urlName}/${id}`);

    //Vai fazer o fork, vai juntar as duas variavel, vai fazer uma busca só
    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res; //res é as duas url juntas que estamos puxando
        this.isLoading = true; //Quando carregar mostrar os pokemon
      },
      error => {
        this.apiError = true;
      }
    )
  }

}
