import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {HeroDetailComponent} from '../pages/hero-detail/hero-detail.component';

@Injectable()
export class ModalService {

    private currentModal: HTMLIonModalElement;

    constructor(private modalController: ModalController) {

    }

    openModal(options?: any) {
        this.modalPresent(options);
    }

    private async modalPresent(options) {
        this.currentModal = await this.modalController.create(options);
        await this.currentModal.present();
    }

    closeModal() {
        this.currentModal.dismiss().then(this.currentModal = undefined);
    }

    isOpened() {
        return this.currentModal;
    }


}
