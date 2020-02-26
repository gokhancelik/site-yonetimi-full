import { of } from 'rxjs';
import { Injector } from '@angular/core';
import { BagimsizBolumKisiService } from '../../tanimlamalar/bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.service';

export enum OdemeYontemi {
    HavaleEFT = 0,
    KrediKarti = 1,
    Kasa = 3,
    Devir = 4
}
export enum TahsilatDurumu {
    Bekliyor = 0,
    Onaylandi = 1,
    Hata = 2,
    Iptal = 3
}

export class TahsilatModel {
    id: string;
    odemeTarihi: Date;
    aciklama: string;
    tutar: number;
    bagimsizBolumKisiId: string;
    durumu: TahsilatDurumu;
    odemeYontemi: OdemeYontemi;
    bankaSiparisNo: string;
    colDefs(injector: Injector) {
        return [{
            key: 'id',
            name: 'Id',
            type: 'string',
            editorOptions: { readOnly: true, visible: true },
            visible: false,
        },
        {
            key: 'odemeTarihi',
            name: 'Ödeme Tarihi',
            type: 'date',
            format: 'dd.MM.yyyy',
            visible: true,
        },
        {
            key: 'aciklama',
            name: 'Açıklama',
            type: 'string',
            visible: true,
            cellTemplate: 'detailLink',
            editorOptions: {
                customParams: {
                    detailKey: 'id',
                    routerLink: ['/admin', 'islemler', 'tahsilat', ':id', 'detay']
                }
            }
        },
        {
            key: 'tutar',
            name: 'Tutar',
            type: 'number',
            visible: true,
            format: {
                type: 'currency',
            },
        },
        {
            key: 'odemeYontemi',
            name: 'Ödeme Yöntemi',
            type: 'select',
            editorOptions: {
                itemsAsync: of([{ id: '0', name: 'HavaleEFT' }, { id: '1', name: 'KrediKarti' }, { id: '3', name: 'Kasa' }, { id: '4', name: 'Devir' }]),
                displayExpr: 'name',
                valueExpr: 'id'
            }
        },
        {
            key: 'durumu',
            name: 'Tahsilat Durumu',
            type: 'select',
            editorOptions: {
                itemsAsync: of([{ id: '0', name: 'Bekliyor' }, { id: '1', name: 'Onaylandi' }, { id: '2', name: 'Hata' }, { id: '3', name: 'Iptal' }]),
                displayExpr: 'name',
                valueExpr: 'id'
            }
        },
        {
            key: 'bankaSiparisNo',
            name: 'Banka Sipariş No',
            type: 'string',
            visible: true,
        },
        {
            key: 'bagimsizBolumKisiId',
            name: 'Bağımsız Bölüm Kişi',
            type: 'select',
            editorOptions: {
                itemsAsync: injector.get(BagimsizBolumKisiService).getAllWithKisi(),
                displayExpr: (item) => {
                    if (item)
                        return item.kisi.ad + ' ' + item.kisi.soyad;
                    else
                        return "";
                },
                valueExpr: 'id',
            },
            visible: true,
        },
        ];
    }
}