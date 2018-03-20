import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { DataFetcherProvider } from '../../providers/data-fetcher/data-fetcher';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  items: Item[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data: DataFetcherProvider) {
    this.items = [];
  }

  ionViewDidLoad() {
    // load item from the storage
    this.loadData();
  }

  loadData() {
    // ho usato x per definire l'oggetto che ricevo per evitare variabili con lo stesso nome
    // alternativa
    // (items) => this.items = items
    this.data.getItems().subscribe( (x) => this.items = x );
  }

  showDetails(itm: Item) {
    // in caso itm dovesse essere null, la pagine item-detail si organizza 
    // per la creazione di un nuovo oggetto item
    this.navCtrl.push(ItemDetailPage, { itemToShow: itm });
  }
}
