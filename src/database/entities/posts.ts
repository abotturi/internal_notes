import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { users } from './users';

@Entity('posts')
export class posts {

    @PrimaryGeneratedColumn()
    id_post: number;

    @Column({type: 'varchar', length: 777})
    text: string;

    @Column('int')
    repost: any;

    @ManyToOne(() => users)
    @JoinColumn({name: 'user'})
    user: users;

    @CreateDateColumn()
    create_at: Date;

    constructor(user: users, text?: string, repost?: number){
        if(text){
            this.text = text
        }

        if(repost){
            this.repost = repost
        }

        this.user = user
    }
}