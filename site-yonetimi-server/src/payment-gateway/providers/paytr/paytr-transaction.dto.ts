import { TransactionDTO } from "../abstract/transaction.dto";

export class PaytrTransactionDTO extends TransactionDTO {
    hash?: string;//'HkdVU3CFseBTAA+0dY3JPD8FQDlywuh++xmq2dRMY0U=',
    merchant_oid?: string;//'640EF3232CCDEA1180E3E1BEBD890235',
    status?: string;//'success',
    total_amount?: number;//'22113',
    payment_type?: string;//'card',
    payment_amount?: number;//'22113',
    currency?: string;//'TL',
    installment_count?: string;// '1',
    merchant_id?: string;// '164697',
    test_mode?: string;// '1'
    failed_reason_msg?: string;
}