import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    darkMode: boolean;

    constructor(private settingsService: SettingsService,
                private toastService: ToastService,
                private statusBar: StatusBar) {
    }

    ionViewWillEnter() {
        this.settingsService.getSetting(SettingsService.darkModeKey).then(
            (setting) => {
                this.darkMode = setting === 'true';
            }
        );
    }

    ngOnInit() {}

    toggleDarkMode() {
        this.settingsService.getSetting(SettingsService.darkModeKey).then(
            (setting) => {
                this.settingsService.setSetting(SettingsService.darkModeKey, setting === 'true' ? 'false' : 'true').then(
                    () => {
                        document.body.classList.toggle('dark', !(setting === 'true'));
                        if (setting === 'true') {
                            this.statusBar.backgroundColorByHexString('#FFFFFF');
                        } else {
                            this.statusBar.backgroundColorByHexString('#000000');
                            this.statusBar.styleDefault();
                        }
                        this.toastService.presentToast('Restart the app to apply your preferences');
                    }
                );
            }
        );
    }
}
