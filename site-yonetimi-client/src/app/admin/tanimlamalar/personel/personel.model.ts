import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { MeskenService } from '../mesken/mesken.service';
import { KisiService } from '../kisi/kisi.service';

export class Personel {
    id: string;
    baslamaTarihi: Date;
    bitisTarihi: Date;    
    meskenId: string;
    kisiId: string;
    aktifMi: boolean;

    colDefs(injector: Injector) {
        return [
        {
            key: 'aktifMi',
            name: 'Durumu',
            type: 'select',
            editorOptions: {
                itemsAsync: of([{ id: true, name: 'Aktif' }, { id: false, name: 'Pasif' }]),
                displayExpr: 'name',
                valueExpr: 'id'
            }
        },      
        {
            key: 'baslamaTarihi',
            name: 'Başlama Tarihi',
            type: 'date',
            format: 'dd.MM.yyyy',
            validators: [{
                type: 'required',
                message: 'Başlama Tarihi zorunludur',
            }],
            editorOptions: {
                type: 'date',
            },
        },
        {
            key: 'bitisTarihi',
            name: 'Bitiş Tarihi',
            type: 'date',
            format: 'dd.MM.yyyy',
            editorOptions: {
                type: 'date',
            },
        },
        {
            key: 'meskenId',
            name: 'Mesken',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'Bağımsız Bölüm  zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(MeskenService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id',
            },
            visible: true,
        },
        {
            key: 'kisiId',
            name: 'Kişi',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'Kişi zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(KisiService).getList(),
                displayExpr: (item) => {
                    if (item)
                        return item.ad + " " +item.soyad;
                    else
                        return "";
                },
                valueExpr: 'id'
            },
            visible: true,
        },
        ];
    }
}