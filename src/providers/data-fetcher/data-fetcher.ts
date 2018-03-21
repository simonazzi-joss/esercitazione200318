import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { NativeStorage } from '@ionic-native/native-storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
//import { of } from 'rxjs/observable/of';

/*
	Generated class for the DataFetcherProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
*/
@Injectable()
export class DataFetcherProvider {
	items: Item[];

	constructor(private storage: NativeStorage) {
		this.items = [];
	}

	getItems(): Observable<Item[]> {
		this.storage.getItem('items').then( data => {
			console.log( data );

		//	this.items = data;
			this.items.slice(0, this.items.length);
			data.forEach( element => this.items.push( element ) );
		}).catch( err => console.log(err) );

		return Observable.of( this.items );
	//	return of( this.items );
	}

	addItem(itm: Item) {
		if( itm.id && itm.id > 0 ) {
			// Cerca l'item da aggiornare
			const idToUpdate = this.items.findIndex(x => x.id === itm.id ? true : false);

			this.items[idToUpdate] = itm;
		} else {
			// Ho bisogno di un id unico per questo item, quindi prendo l'ultimo id e gli aggiungo 1
			itm.id = 0;
			this.items.forEach( x => {
				if(x.id > itm.id) {
					itm.id = x.id;
				}
			});
			// aggiungi 1 all'id maggiore
			itm.id++;

			this.items.push(itm);
		}

		// salvataggio sul local storage
		return Observable.fromPromise( this.storage.setItem('items', this.items) );
	}
}
