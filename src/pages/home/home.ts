import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Item } from '../../models/item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { DataFetcherProvider } from '../../providers/data-fetcher/data-fetcher';
import { Platform } from 'ionic-angular';

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
	diagnostic: string;

	constructor(public navCtrl: NavController,
							public navParams: NavParams,
							private data: DataFetcherProvider,
							private loader: LoadingController,
							private plat: Platform) {
		this.items = [];
		this.diagnostic = '';
	}

	ionViewDidLoad() {
		this.loadData();
	}

	loadData() {
		const l = this.loader.create({
			content: 'Caricamento ...'
		});
		l.present();

	//  attende che tutti i plugin siano caricati
		this.plat.ready().then( () => {
			this.data.getItems().subscribe( x => {
				this.items = x;
			//	this.diagnostic += 's' + JSON.stringify( x );
				l.dismiss();
			},
			err => {
			//  no data fund
				l.dismiss();
			//	this.diagnostic += JSON.stringify( err );
			});
		});
	}

	showDetails(itm: Item) {
		// in caso itm dovesse essere null, la pagine item-detail si organizza
		// per la creazione di un nuovo oggetto item
		this.navCtrl.push(ItemDetailPage, { itemToShow: itm });
	}
}
