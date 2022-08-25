import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent implements OnInit {

  //Saida de dados, vai emitir para fora o valor para alguma variavel pegar as info
  //é um EventEmitter que vai retornar uma string
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  //Função que vai observar e pegar o conteudo do input
  public search(value : string){
    //ele sempre vai emitir o value passado pelo input
    this.emmitSearch.emit(value);
  }

}
