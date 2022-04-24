import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {ActivatedRoute} from '@angular/router';
import {ToolbarService} from '../../services/toolbar.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements OnInit {

  asComponent = false;

  constructor(private modalService: ModalService,
              private toolbarService: ToolbarService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParamMap.subscribe(
        data => {
          if (data.get('asComponent')) {
            this.asComponent = true;
          }
        }
    );
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.asComponent) {
      this.toolbarService.setTitle('Credits');
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
