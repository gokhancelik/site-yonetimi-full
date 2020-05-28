import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TahsilatService } from '../tahsilat-service';


@Component({
  selector: 'app-tahsilat-yukle',
  templateUrl: './tahsilat-yukle.component.html',
  styleUrls: ['./tahsilat-yukle.component.scss']
})
export class TahsilatYukleComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  file: File;
  topuYukleProgress: number;
  yukleniyor: boolean;
  topluYukleSonucu: any;
  constructor(private service: TahsilatService) {
  }

  ngOnInit() {

  }
  dosyaYuklendi(e: FileList) {
    this.file = e[0];
  }
  dosyaSil() {
    this.file = null;
    this.fileInput.nativeElement.value = '';
  }
  kaydet() {
    this.service.upload({ data: this.file, fileName: this.file.name })
      .subscribe(event => {
        console.log(event)
        this.topuYukleProgress = 100;
        this.topluYukleSonucu = event;
        this.yukleniyor = false;
      });
  }
}
