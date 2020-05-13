import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahakkuk, AidatDurumu } from './tahakkuk.entity';
import { TahakkukRepository } from './tahakkuk.repository';
import { EntityManager } from 'typeorm';
import { MeskenRepository } from 'src/mesken/mesken.repository';
import { MeskenService } from 'src/mesken/mesken.service';
import { MeskenKisiService } from 'src/mesken-kisi/mesken-kisi.service';
import { BorcService } from 'src/borc/borc.service';
import { FaizGrubuService } from 'src/faiz-grubu/faiz-grubu.service';

@Injectable()
export class TahakkukService extends BaseService<Tahakkuk> {



    constructor(repository: TahakkukRepository, 
        private meskenService: MeskenService, private borcService: BorcService, private faizGrubuService: FaizGrubuService ) {
        super(repository);
    }
    async aidatTahakkuklariOlustur() {
        //bagimsiz bolumleri cek;
        //her bğr bagimsiz bolum icin aidat grubunu,
        //aidat grubunun mktarini ve vade tarihini kullnarak tahakkuk entity olustur
        //kaydet

    }
    async borctanTahakkukOlustur() {
        //borcu cek
        //borcun blogunun bagimsiz bolumleri cek;
        //herbir meskene tutari paylastirarak tahakkuk olustur.
        //vade tarihini borcun vade tarihiyle set et.
        //kaydet 
    }
    async getOdenmemisAidatlar(userId): Promise<Tahakkuk[]> {
        let today = new Date();
        let gelecekAy = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        var aidatlar$ = this.repository.createQueryBuilder('tahakkuk')
            .innerJoinAndSelect('tahakkuk.meskenKisi', 'meskenKisi')
            .innerJoinAndSelect('tahakkuk.odemeTipi', 'odemeTipi')
            .where('meskenKisi.kisiId = :userId', { userId })
            .andWhere('tahakkuk.durumu = 0 AND tahakkuk.vadeTarihi <= :tarih', { tarih: gelecekAy })
            .orderBy('tahakkuk.vadeTarihi')
            .getMany();
        return aidatlar$;
    }
    getOdenmisAidatlar(userId: any): Promise<Tahakkuk[]> {
        var aidatlar$ = this.repository.createQueryBuilder('tahakkuk')
            .innerJoinAndSelect('tahakkuk.meskenKisi', 'meskenKisi')
            .innerJoinAndSelect('tahakkuk.odemeTipi', 'odemeTipi')
            .where('meskenKisi.kisiId = :userId', { userId })
            .andWhere('tahakkuk.durumu = 1')
            .orderBy('tahakkuk.vadeTarihi')
            .getMany();
        return aidatlar$;
    }
    findByIds(selectedTahakkuks: string[]): Promise<Tahakkuk[]> {
        return this.repository.findByIds(selectedTahakkuks);
    }

    async tahakkuklariOlustur(id: string, tutar: number, vadeTarihi: Date, faizGrubuId?: string): Promise<Tahakkuk[]> {
        var tahakkukList = new Array<Tahakkuk>();
        var faizGrubu = await this.faizGrubuService.findById(faizGrubuId);
        var borc = await this.borcService.findById(id);
        var meskenList = await this.meskenService.findByUstMeskenId(borc.meskenId);
        var meskenCount = meskenList.length;
        var tahakkukTutari = tutar / meskenCount;

        if(meskenCount > 0) {
            meskenList.forEach(mesken => {
                    var tahakkuk = new Tahakkuk();
                    tahakkuk.tutar = tahakkukTutari;
                    tahakkuk.vadeTarihi = vadeTarihi;
                    tahakkuk.odemeTipiId = borc.islemTipiId;
                    tahakkuk.aciklama = borc.aciklama;
                    tahakkuk.faizOrani = faizGrubu.oran;
                    tahakkuk.durumu = AidatDurumu.Odenmedi;
                    //TODO: Kişinin boş olma durumu
                    tahakkuk.meskenKisiId = mesken.meskenKisis.find(f => !f.bitisTarihi).id;
                    tahakkukList.push(tahakkuk);
            });
        }
        if(tahakkukList && tahakkukList.length > 0) {
            await this.repository.save(tahakkukList);
            borc.tahakkukOlusturulduMu = true;
            await this.borcService.update(borc.id, borc);
        }
        return tahakkukList;
    }
}
