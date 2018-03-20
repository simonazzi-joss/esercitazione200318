import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Item } from '../../models/item';
import { DataFetcherProvider } from '../../providers/data-fetcher/data-fetcher';
import { Camera, CameraOptions } from '@ionic-native/camera';


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
              private data: DataFetcherProvider,
              private camera: Camera,
              private loader: LoadingController) {
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
    const objLoader = this.loader.create({ content: 'Caricamento...' });
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    }

    objLoader.present();
    
    this.camera.getPicture(options).then((imageData) => {
      // non sono completamente sicuro che mi restituisca sempre una stringa data
      this.item.pic = 'data:image/jpeg;base64,' + imageData;
      objLoader.dismiss();
    }, (err) => {
      objLoader.dismiss();
      
      this.toast.create({
        message: 'Errore: ' + err,
        duration: 2000
      }).present();
    });
  }
}
