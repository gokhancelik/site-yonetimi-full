export abstract class BaseModel {
    id: string;
    olusturmaTarihi?: Date;
    olusturan: string;
    guncellemeTarihi: Date;
    guncelleyen: string;
    aktarimId: string;
}