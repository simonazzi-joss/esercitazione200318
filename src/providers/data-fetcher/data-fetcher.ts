import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NativeStorage } from '@ionic-native/native-storage';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the DataFetcherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataFetcherProvider {
  items: Item[];

  constructor(private storage: NativeStorage,
                // only for testing
              private toast: ToastController) {
    this.items = [
    //  {id: 99, what: 'Righello', toWho: 'Maria', when: '', pic: undefined, isReturned: false},
    //  {id: 98, what: 'Gomma', toWho: 'Maria', when: '', pic: undefined, isReturned: false},
    //  {id: 97, what: 'temperino', toWho: 'Maria', when: '', pic: undefined, isReturned: true},
    ];
  }

  getItemsPromise() {
    return this.storage.getItem('items');
  }

  getItems(): Observable<Item[]> {
    this.getItemsPromise()
      .then( data => {
      //  this.items.slice(0, this.items.length);
        data.array.forEach(element => this.items.push( element ));

        // only for testing
        this.toast.create({
          message: JSON.stringify(data),
          duration: 10000
        }).present();
      })
      .catch( err => {

        //only for teasting
        this.toast.create({
          message: JSON.stringify(err),
          duration: 10000
        }).present();
        //la lista è vuota, oppure è ios che non installa i plug-in
      });

    return of( this.items );
  }

  addItem(itm: Item) {
    if( !itm.id ) {
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
    return this.storage.setItem('items', this.items);
  }
}
