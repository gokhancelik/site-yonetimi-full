export interface SmsGatewayService {
    company: string;
    send(no: string, msg: string)
}