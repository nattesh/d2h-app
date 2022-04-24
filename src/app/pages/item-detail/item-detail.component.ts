import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from '../../services/item.service';
import {Item} from '../../models/item.model';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {

  @Input() itemId: number;
  item: Item;

  constructor(private itemService: ItemService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.item = this.getItemById(this.itemId);
  }

  closeModal() {
    this.modalService.closeModal();
  }

  getItemById(id) {
    return this.itemService.getItemById(id);
  }

  getItemByName(name) {
    return this.itemService.getIteByName(name);
  }

  openItemDetailModal(itemId, event) {
    event.stopPropagation();
    if (itemId) {
      if (this.modalService.isOpened()) {
        this.closeModal();
      }
      this.modalService.openModal({
        component: ItemDetailComponent,
        swipeToClose: true,
        componentProps: {
          itemId
        }
      });
    }
  }

}
