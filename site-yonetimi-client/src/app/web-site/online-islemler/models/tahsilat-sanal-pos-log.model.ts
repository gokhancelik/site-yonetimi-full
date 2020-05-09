import { Tahsilat } from '../../../services/generated';

export interface TahsilatSanalPosLog {
    tahsilatId: string;

    tahsilat: Tahsilat;
    mesaj: string;
    durum: boolean;
}