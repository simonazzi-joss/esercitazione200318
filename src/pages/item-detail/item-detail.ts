import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Item } from '../../models/item';
import { DataFetcherProvider } from '../../providers/data-fetcher/data-fetcher';
import { CameraProvider } from '../../providers/camera/camera';

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
	diagnostic: string;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public toast: ToastController,
				private data: DataFetcherProvider,
				private camera: CameraProvider,
				private loader: LoadingController ) {
		this.item = this.navParams.get('itemToShow') || new Item();

		this.diagnostic = '';
	}

	ionViewDidLoad() { }

	saveItem() {
		const idL = this.loader.create( {
			content: 'Salvataggio'
		});

		this.data.addItem(this.item).subscribe( ( x ) => {
			this.toast.create({
				message: 'Lista aggiornata',
				duration: 2000
			}).present();
			this.navCtrl.pop();
		},  err => {
			idL.dismiss();

			this.toast.create({
				message: 'Errore: ' + err,
				duration: 1000
			}).present();
		});
	}

	takePicture() {
		const objLoader = this.loader.create({
			content: 'Caricamento...'
		});

		objLoader.present();

		this.camera.getPicture().subscribe( img => {
			this.item.pic = 'data:image/jpeg;base64,' + img;
		//	img = img.replace( 'assets-library:/', '');
		//	this.item.pic = img;
		//	this.diagnostic = img;
			objLoader.dismiss();
		}, err => {
			objLoader.dismiss();

			this.toast.create({
				message: 'Errore: ' + err,
				duration: 2000
			}).present();
		});
	}
}
