import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { TahsilatKalem } from './tahsilat-kalem.entity';
import { TahsilatKalemRepository } from './tahsilat-kalem.repository';

@Injectable()
export class TahsilatKalemService extends BaseService<TahsilatKalem>{



    constructor(repository: TahsilatKalemRepository) {
        super(repository);
    }

    async getByTahsilatId(tahsilatId: string): Promise<TahsilatKalem[]> {
        return (this.repository as TahsilatKalemRepository).getByTahsilatId(tahsilatId);
    }
    getByTahakkukId(tahakkukId: string): Promise<TahsilatKalem[]> {
        return (this.repository as TahsilatKalemRepository).getByTahakkukId(tahakkukId);
    }
    getEmanetTahsilatKalemleri(meskenKisiId: string): Promise<TahsilatKalem[]> {
        return (this.repository as TahsilatKalemRepository).getEmanetTahsilatKalemleri(meskenKisiId);
    }
}
