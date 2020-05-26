import { Component, OnInit } from '@angular/core';
import { Duyurular } from 'src/app/admin/icerik-yonetimi/duyurular/duyurular.model';
import { DuyurularService } from 'src/app/admin/icerik-yonetimi/duyurular/duyurular.service';

@Component({
  selector: 'app-duyurular',
  templateUrl: './duyurular.component.html',
  styleUrls: ['./duyurular.component.scss']
})
export class DuyurularComponent implements OnInit {
  duyurular: Duyurular[];
  constructor(private duyurularService: DuyurularService) { }

  ngOnInit(): void {
    this.duyurularService.getList<Duyurular>().subscribe(d => {
      this.duyurular = d;
    })
  }
}
