import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Storage} from '@ionic/storage';
import {ToolbarService} from '../../services/toolbar.service';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss'],
})
export class WordcloudComponent implements OnInit {

  wordcloud = undefined;

  parsed: {value: string, count: number }[];
  styles: {word: string, style: any }[];

    constructor(private playerService: PlayerService,
                private toolbarService: ToolbarService,
                private storage: Storage) {
      this.toolbarService.setTitle('Wordcloud');
    }

    ngOnInit() {
        this.storage.get('user_id').then(
            data => {
              this.loadWordCloud(data);
            }
        );
    }

    ionViewWillEnter() {
        this.toolbarService.setTitle('Wordcloud');
    }

  loadWordCloud(user: string) {
    this.playerService.getWordCloudByUser(user).subscribe(
        data => {
          this.wordcloud = data['my_word_counts'];
          this.parseCloud(this.wordcloud);
        }
    );
  }

  parseCloud(data) {
      const names = Object.keys(data);
      this.parsed = [];
      this.styles = [];

      for (const name of names) {
          const newParsed = { value: name, count: data[name]};
          this.populateStylesByWord(newParsed);
          this.parsed.push(newParsed);
      }

      console.log(this.styles);
      this.parsed.sort((a, b) => {
          if (a.count > b.count) {
              return - 1;
          } else if (a.count < b.count) {
              return 1;
          } else {
              return 0;
          }
      });
  }

  populateStylesByWord(parsed) {
    let size = parsed.count * 5 / 4;
    if (size < 15) { size = 15; }

    const color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ','
        + Math.floor(Math.random() * 255) + ')';

    const item = {
      word: parsed.value,
      style: { 'font-size': size + 'px', color }
    };

    this.styles.push(item);
  }

  getStyleByWord(word) {
      const sty = this.styles.find(it => it.word === word.value).style;
      return sty;
  }

}
