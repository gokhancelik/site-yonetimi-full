import * as crypto from 'crypto';
export enum BrandName {
    Troy = 400,
    AmericanExpress = 300,
    MasterCard = 200,
    Visa = 100
}
export enum Currency {
    TRL = '0949',
    USD = '0978',
    GBP = '0826',
    EUR = '0978',
    JPY = '0392',
}
export enum TransactionType {
    Sale = 'Sale',
    Auth = 'Auth',
    Vft = 'Vft',
    Point = 'Point',
    Cancel = 'Cancel',
    Refund = 'Refund',
    Capture = 'Capture',
    Reversal = 'Reversal',
    CampaignSearch = 'CampaignSearch',
    CardTest = 'CardTest',
    BatchClosedSuccessSearch = 'BatchClosedSuccessSearch',
    SurchargeSearch = 'SurchargeSearch',
    VFTSale = 'VFTSale',
    VFTSearch = 'VFTSearch',
    PointSearch = 'PointSearch',
    PointSale = 'PointSale',
    Credit = 'Credit',
}

export class KuveytTurkVPosMessage {

    apiVersion: string;
    get hashData(): string {
        if (this.password != null) {
            // SHA1 sha = new SHA1CryptoServiceProvider();
            const shaPass = crypto.createHash('sha1');
            shaPass.update(this.password);
            const hash = shaPass.digest('base64');
            // string HashedPassword = Convert.ToBase64String(sha.ComputeHash(Encoding.UTF8.GetBytes(Password)));
            let hashstr = this.merchantId + this.merchantOrderId + this.amount + this.okUrl + this.failUrl + this.userName + hash;
            // byte[] hashbytes = System.Text.Encoding.GetEncoding('ISO-8859-9').GetBytes(hashstr);
            // byte[] inputbytes = sha.ComputeHash(hashbytes);
            // string hash = Convert.ToBase64String(inputbytes);
            const shaData = crypto.createHash('sha1');
            shaData.update(hashstr);
            const hashedData = shaData.digest('base64');
            return hashedData;
        }
        return '';
    }
    get displayAmount() { return this.amount; }
    transactionSecurity: string;
    additionalData: AdditionalData;
    constructor(public amount: string,
        public customerId: string,
        public cardHolderName: string,
        public cardNumber: string,
        public cardType: BrandName,
        public cardCVV2: string,
        public cardExpireDateMonth: string,
        public cardExpireDateYear: string,
        public currencyCode: Currency,
        public okUrl: string,
        public failUrl: string,
        public merchantId: string,
        public merchantOrderId: string,
        public userName: string,
        public password: string,
        public serviceUrl: string,
        public transactionType: TransactionType,
        public installmentCount: number
    ) {
    }
    toXML(): string {
        let xmlStr = '<KuveytTurkVPosMessage>';
        if (this.apiVersion) {
            xmlStr += `<APIVersion>${this.apiVersion}</APIVersion>`;
        }
        if (this.okUrl) {
            xmlStr += `<OkUrl>${this.okUrl}</OkUrl>`;
        }
        if (this.failUrl) {
            xmlStr += `<FailUrl>${this.failUrl}</FailUrl>`;
        }
        if (this.hashData) {
            xmlStr += `<HashData>${this.hashData}</HashData>`;
        }
        if (this.merchantId) {
            xmlStr += `<MerchantId>${this.merchantId}</MerchantId>`;
        }
        if (this.customerId) {
            xmlStr += `<CustomerId>${this.customerId}</CustomerId>`;
        }
        if (this.userName) {
            xmlStr += `<UserName>${this.userName}</UserName>`;
        }
        if (this.cardNumber) {
            xmlStr += `<CardNumber>${this.cardNumber}</CardNumber>`;
        }
        if (this.cardExpireDateYear) {
            xmlStr += `<CardExpireDateYear>${this.cardExpireDateYear}</CardExpireDateYear>`;
        }
        if (this.cardExpireDateMonth) {
            xmlStr += `<CardExpireDateMonth>${this.cardExpireDateMonth}</CardExpireDateMonth>`;
        }
        if (this.cardCVV2) {
            xmlStr += `<CardCVV2>${this.cardCVV2}</CardCVV2>`;
        }
        if (this.cardHolderName) {
            xmlStr += `<CardHolderName>${this.cardHolderName}</CardHolderName>`;
        }
        if (this.cardType) {
            xmlStr += `<CardType>${this.cardType}</CardType>`;
        }
        if (this.currencyCode) {
            xmlStr += `<CurrencyCode>${this.currencyCode}</CurrencyCode>`;
        }
        if (this.transactionType) {
            xmlStr += `<TransactionType>${this.transactionType}</TransactionType>`;
        }
        if (this.installmentCount) {
            xmlStr += `<InstallmentCount>${this.installmentCount}</InstallmentCount>`;
        }
        if (this.amount) {
            xmlStr += `<Amount>${this.amount}</Amount>`;
        }
        if (this.displayAmount) {
            xmlStr += `<DisplayAmount>${this.displayAmount}</DisplayAmount>`;
        }
        if (this.merchantOrderId) {
            xmlStr += `<MerchantOrderId>${this.merchantOrderId}</MerchantOrderId>`;
        }
        xmlStr += `<TransactionSecurity>3</TransactionSecurity>`;
        if (this.additionalData) {
            xmlStr += `<KuveytTurkVPosAdditionalData>
                <AdditionalData>
                    <Key>${this.additionalData.key}</Key>
                    <Data>${ this.additionalData.data} </Data>
                </AdditionalData>
            </KuveytTurkVPosAdditionalData>`;
        }
        xmlStr += `</KuveytTurkVPosMessage>`;
        return xmlStr;
    }
    toString() {
        return this.toXML();
    }
}
export interface AdditionalData {
    key: string;
    data: string;
}
export interface VPosTransactionResponseContract {
    IsEnrolled: string;
    IsVirtual: string;
    ResponseCode: string;
    ResponseMessage: string;
    OrderId: string;
    TransactionTime: string;
    ReferenceId: string;
    BusinessKey: string;
}