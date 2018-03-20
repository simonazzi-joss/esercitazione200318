import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Item } from '../../models/item';
import { DataFetcherProvider } from '../../providers/data-fetcher/data-fetcher';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  item: Item;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toast: ToastController,
              private data: DataFetcherProvider) {
    this.item = this.navParams.get('itemToShow') || new Item();
  }

  ionViewDidLoad() { }

  saveItem() {
    this.data.addItem(this.item);

    this.toast.create({
      message: 'Lista aggiornata',
      duration: 1000
    }).present();

    this.navCtrl.pop();
  }

  takePicture() {
    // il component per la fotocamera va qui


  }
}
