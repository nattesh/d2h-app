import { Component, OnInit, Output } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-others-popover',
  templateUrl: './others-popover.component.html',
  styleUrls: ['./others-popover.component.scss'],
})
export class OthersPopoverComponent implements OnInit {


  constructor(private util: UtilService) { }

  ngOnInit() {}

  outPut(role) {
    this.util.dismissPopover();
    this.util.popoverRoleEmitter.emit(role);
  }

}
