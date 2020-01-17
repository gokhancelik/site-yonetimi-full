public enum BrandName {
    Troy = 400,
    AmericanExpress = 300,
    MasterCard = 200,
    Visa = 100
}
public enum Currency {
    TRL = 949,
    USD = 978,
    GBP = 826,
    EUR = 978,
    JPY = 392,
}
public enum TransactionType {
    Sale,
    Auth,
    Vft,
    Point,
    Cancel,
    Refund,
    Capture,
    Reversal,
    CampaignSearch,
    CardTest,
    BatchClosedSuccessSearch,
    SurchargeSearch,
    VFTSale,
    VFTSearch,
    PointSearch,
    PointSale,
    Credit
}

export class KuveytTurkVPosMessage {
    private readonly NumberFormatInfo _moneyFormatInfo;

    KuveytTurkVPosMessage() {
        _moneyFormatInfo = new NumberFormatInfo();
        _moneyFormatInfo.NumberDecimalSeparator = ".";
    }
    OkUrl: string;
    FailUrl: string;
    APIVersion: string;
    get HashData(): string {
        if (Password != null) {
            SHA1 sha = new SHA1CryptoServiceProvider();
            string HashedPassword = Convert.ToBase64String(sha.ComputeHash(Encoding.UTF8.GetBytes(Password)));
            string hashstr = MerchantId + MerchantOrderId + Amount + OkUrl + FailUrl + UserName + HashedPassword;
            byte[] hashbytes = System.Text.Encoding.GetEncoding("ISO-8859-9").GetBytes(hashstr);
            byte[] inputbytes = sha.ComputeHash(hashbytes);
            string hash = Convert.ToBase64String(inputbytes);
            return hash;
        }
        return "";
    }
    MerchantId: string;
    CustomerId: string;
    UserName: string;
    Password: string;
    CardNumber: string;
    CardExpireDateYear: string;
    CardExpireDateMonth: string;
    CardCVV2: string;
    CardHolderName: string;
    CardType: BrandName;
    TransactionType: TransactionType;
    InstallmentCount: number;
    Amount: string;
    get DisplayAmount() { return this.Amount; }
    CurrencyCode: Currency;
    MerchantOrderId: string;
    TransactionSecurity: string;
    ServiceUrl: string;
    AdditionalData: string;
    toXML(): string {
        StringBuilder strXML = new StringBuilder();
        strXML.AppendFormat("<{0}>", "KuveytTurkVPosMessage");
        if (!string.IsNullOrWhiteSpace(APIVersion))
            strXML.AppendFormat("<{0}>{1}</{0}>", "APIVersion", APIVersion);
        if (!string.IsNullOrWhiteSpace(OkUrl))
            strXML.AppendFormat("<{0}>{1}</{0}>", "OkUrl", OkUrl);
        if (!string.IsNullOrWhiteSpace(FailUrl))
            strXML.AppendFormat("<{0}>{1}</{0}>", "FailUrl", FailUrl);
        if (!string.IsNullOrWhiteSpace(HashData))
            strXML.AppendFormat("<{0}>{1}</{0}>", "HashData", HashData);
        if (!string.IsNullOrWhiteSpace(MerchantId))
            strXML.AppendFormat("<{0}>{1}</{0}>", "MerchantId", MerchantId);
        if (!string.IsNullOrWhiteSpace(CustomerId))
            strXML.AppendFormat("<{0}>{1}</{0}>", "CustomerId", CustomerId);
        if (!string.IsNullOrWhiteSpace(UserName))
            strXML.AppendFormat("<{0}>{1}</{0}>", "UserName", UserName);
        if (!string.IsNullOrWhiteSpace(CardNumber))
            strXML.AppendFormat("<{0}>{1}</{0}>", "CardNumber", CardNumber);
        if (!string.IsNullOrWhiteSpace(CardExpireDateYear))
            strXML.AppendFormat("<{0}>{1}</{0}>", "CardExpireDateYear", CardExpireDateYear);
        if (!string.IsNullOrWhiteSpace(CardExpireDateMonth))
            strXML.AppendFormat("<{0}>{1}</{0}>", "CardExpireDateMonth", CardExpireDateMonth);
        if (!string.IsNullOrWhiteSpace(CardCVV2))
            strXML.AppendFormat("<{0}>{1}</{0}>", "CardCVV2", CardCVV2);
        if (!string.IsNullOrWhiteSpace(CardHolderName))
            strXML.AppendFormat("<{0}>{1}</{0}>", "CardHolderName", CardHolderName);
        if (CardType.HasValue)
            strXML.AppendFormat("<{0}>{1}</{0}>", "CardType", CardType.Value.ToString());
        if (TransactionType.HasValue)
            strXML.AppendFormat("<{0}>{1}</{0}>", "TransactionType", TransactionType.ToString());
        if (InstallmentCount.HasValue)
            strXML.AppendFormat("<{0}>{1}</{0}>", "InstallmentCount", InstallmentCount);
        strXML.AppendFormat("<{0}>{1}</{0}>", "Amount", Amount);
        strXML.AppendFormat("<{0}>{1}</{0}>", "DisplayAmount", DisplayAmount);
        if (CurrencyCode.HasValue)
            strXML.AppendFormat("<{0}>0{1}</{0}>", "CurrencyCode", (int)Enum.Parse(typeof (Currency), CurrencyCode.ToString()));
        if (!string.IsNullOrWhiteSpace(MerchantOrderId))
            strXML.AppendFormat("<{0}>{1}</{0}>", "MerchantOrderId", MerchantOrderId);
        strXML.AppendFormat("<{0}>{1}</{0}>", "TransactionSecurity", 3);
        if (AdditionalData != null) {
            strXML.AppendFormat("<{0}>", "KuveytTurkVPosAdditionalData");
            strXML.AppendFormat("<{0}>", "AdditionalData");
            if (!string.IsNullOrWhiteSpace(AdditionalData.Key))
                strXML.AppendFormat("<{0}>{1}</{0}>", "Key", AdditionalData.Key);
            if (!string.IsNullOrWhiteSpace(AdditionalData.Data))
                strXML.AppendFormat("<{0}>{1}</{0}>", "Data", AdditionalData.Data);
            strXML.AppendFormat("</{0}>", "AdditionalData");
            strXML.AppendFormat("</{0}>", "KuveytTurkVPosAdditionalData");
        }
        strXML.AppendFormat("</{0}>", "KuveytTurkVPosMessage");
        return strXML.ToString();
    }
    toString() {
        return this.toXML();
    }
}