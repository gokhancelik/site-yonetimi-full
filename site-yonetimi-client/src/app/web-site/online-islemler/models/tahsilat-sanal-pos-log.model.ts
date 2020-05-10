import { Tahsilat } from './tahsilat.model';
export interface TahsilatSanalPosLog {
    tahsilatId: string;

    tahsilat: Tahsilat;
    mesaj: string;
    durum: boolean;
}