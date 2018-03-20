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
    this.items.push( { what: 'righello', toWho: 'maria', when: 'yesterday', pic: undefined } );
    this.items.push( { what: 'temperino', toWho: 'maria', when: 'now', pic: undefined } );
  }

  getItems(): Observable<Item[]> {
    return of( this.items );
  }

  addItem(itm: Item) {
    this.items.push(itm);
    // salvataggio sul local storage
  }
}
