export interface CryptoRateDto {
    name: string;
    symbol: string;
    currency: string;
    rate: number;
    lastUpdated: Date;
    source: string;
}