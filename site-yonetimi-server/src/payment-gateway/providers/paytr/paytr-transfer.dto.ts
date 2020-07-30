export class PaytrTransferDTO {
    merchant_id: string;
    merchant_key: string;
    merchant_salt: string;
    merchant_oid: string;
    submerchant_amount: number;
    transfer_name?: string;
    transfer_iban?: string;
    trans_id: string;
    total_amount: number;
    paytr_token: string;
}