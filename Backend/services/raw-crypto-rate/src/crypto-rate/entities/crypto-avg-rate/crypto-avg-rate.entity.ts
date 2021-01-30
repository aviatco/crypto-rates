import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class CryptoAvgRate {
    @PrimaryColumn()
    symbol: string;

    @PrimaryColumn()
    currency: string;

    @Column()
    avg: number;
    
    @Column()
    timestamp: Date;
}
