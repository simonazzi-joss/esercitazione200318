import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the DataFetcherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataFetcherProvider {
  private items: Item[];

  constructor() {
    this.items = [];
    this.items.push( { id: 1, what: 'righello', toWho: 'maria', when: 'yesterday', pic: undefined } );
    this.items.push( { id: 2, what: 'temperino', toWho: 'maria', when: 'now', pic: undefined } );
  }

  getItems(): Observable<Item[]> {
    return of( this.items );
  }

  addItem(itm: Item) {
    console.log(itm);
    if(itm.id === 0) {
      // Ho bisogno di un id unico per questo item, quindi prendo l'ultimo id e gli aggiungo 1

      this.items.forEach( (x) => {
        if(x.id > itm.id) {
          itm.id = x.id;
        }
      });

      //aggiungi 1 all'id maggiore
      itm.id++;
      this.items.push(itm);
    } else {
      // look for the item to update
      const idToUpdate = this.items.findIndex(x => x.id === itm.id ? true : false);

      this.items[idToUpdate] = itm;
    }
    // salvataggio sul local storage
  }
}
