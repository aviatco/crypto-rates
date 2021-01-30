import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class CryptoRate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    symbol: string;
    
    @Column()
    currency: string;
    
    @Column()
    rate: number;
    
    @Column()
    lastUpdated: Date;
    
    @Column()
    source: string;
}
