import {ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private toast: ToastController) {
    }

    async presentToast(message: string) {
        const toast = await this.toast.create({
            message,
            duration: 3000
        });
        await toast.present();
    }
}
