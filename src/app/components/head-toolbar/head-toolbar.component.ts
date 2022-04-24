import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-head-toolbar',
  templateUrl: './head-toolbar.component.html',
  styleUrls: ['./head-toolbar.component.scss'],
})
export class HeadToolbarComponent implements OnInit {

  @Input() title: string;
  @Input() id: any;

  constructor(
    private clipboard: Clipboard,
    private toast: ToastService) { }

  ngOnInit() {}

  copyId() {
    const idStr = this.id ? this.id.toString() : '';
    this.clipboard.clear().then(() => {
      this.clipboard.copy(idStr).then(() => {
        this.toast.presentToast('Id copied to clipboard');
      })
    });
  }

}
