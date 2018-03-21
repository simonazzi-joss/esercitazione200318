import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise'

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {
	private camOpt: CameraOptions;

	constructor(private camera: Camera) {
		this.camOpt = {
			quality: 100,
		//	destinationType: this.camera.DestinationType.DATA_URL,
		//	destinationType: this.camera.DestinationType.FILE_URI,
			destinationType: this.camera.DestinationType.NATIVE_URI,	
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			mediaType: this.camera.MediaType.PICTURE
		};
  	}

	getPicture(): Observable<string> {
		return Observable.fromPromise( this.camera.getPicture(this.camOpt) );
  	}
}
