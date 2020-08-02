import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahakkuk, AidatDurumu } from './tahakkuk.entity';
import { TahakkukRepository } from './tahakkuk.repository';
import { EntityManager, Between, LessThanOrEqual, SelectQueryBuilder, In } from 'typeorm';
import { MeskenRepository } from 'src/mesken/mesken.repository';
import { MeskenService } from 'src/mesken/mesken.service';
import { MeskenKisiService } from 'src/mesken-kisi/mesken-kisi.service';
import { BorcService } from 'src/borc/borc.service';
import { FaizGrubuService } from 'src/faiz-grubu/faiz-grubu.service';
import { TahsilatDurumu } from '../tahsilat/tahsilat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { buildWhereQuery, buildFindCondition, buildOrder } from '../abstract/query-helper';
import { QueryDto } from '../hesap-hareketi/hesap-hareketi.controller';

@Injectable()
export class TahakkukService extends BaseService<Tahakkuk> {
    


    constructor(@InjectRepository(TahakkukRepository) private _repository: TahakkukRepository,
        private meskenService: MeskenService, private borcService: BorcService, private faizGrubuService: FaizGrubuService) {
        super(_repository);
    }
    async aidatTahakkuklariOlustur() {
        //bagimsiz bolumleri cek;
        //her bğr bagimsiz bolum icin aidat grubunu,
        //aidat grubunun mktarini ve vade tarihini kullnarak tahakkuk entity olustur
        //kaydet

    }
    async getOdenmemisAidatlar(userId): Promise<Tahakkuk[]> {
        return this._repository.getOdenmemisAidatlar(userId);
    }
    
    getOdenmisAidatlar(userId: any): Promise<Tahakkuk[]> {
        return this._repository.getOdenmisAidatlar(userId);
    }
    findByIds(selectedTahakkuks: string[]): Promise<Tahakkuk[]> {
        return this._repository.findByIds(selectedTahakkuks);
    }
    findAllQuery(query: QueryDto): Promise<[Tahakkuk[], number]> {
        let whereCondition = buildFindCondition(query.filter);
        let result = Tahakkuk.findAndCount<Tahakkuk>({
            where: whereCondition,
            take: query.take,
            skip: query.skip,
            join: {
                alias: 'tahakkuk',
                leftJoinAndSelect: {
                    tahsilatKalems: 'tahakkuk.tahsilatKalems',
                    tahsilat: 'tahsilatKalems.tahsilat',
                    meskenKisi: 'tahakkuk.meskenKisi',
                    odemeTipi: 'tahakkuk.odemeTipi',
                    tahsilatKalemOdemeTipi: 'tahsilatKalems.odemeTipi'
                },
            },
            order: buildOrder(query.sort)
        });
        return result;
    }
    async borctanTahakkukOlustur(borcId: string, tutar: number, vadeTarihi: Date, faizGrubuId?: string): Promise<Tahakkuk[]> {
        var tahakkukList = new Array<Tahakkuk>();
        var faizGrubu = await this.faizGrubuService.findById(faizGrubuId);
        var borc = await this.borcService.findById(borcId);
        var meskenList = await this.meskenService.findByUstMeskenId(borc.meskenId);
        var meskenCount = meskenList.length;
        var tahakkukTutari = tutar / meskenCount;

        if (meskenCount > 0) {
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
        if (tahakkukList && tahakkukList.length > 0) {
            await this.repository.save(tahakkukList);
            borc.tahakkukOlusturulduMu = true;
            await this.borcService.update(borc.id, borc);
        }
        return tahakkukList;
    }
    async tahakkukKapat(tahakkuk: Tahakkuk): Promise<Tahakkuk> {
        tahakkuk.durumu = AidatDurumu.Odendi;
        return this.update(tahakkuk.id, tahakkuk);
    }
}
