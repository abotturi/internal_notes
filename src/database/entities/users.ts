import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class users {

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({type: 'varchar', length: 14, unique: true })
    name: string;

    @CreateDateColumn()
    create_at: Date;

    constructor(name: string){
        this.name = name
    }
}