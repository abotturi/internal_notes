import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { posts } from './posts';
import { users } from './users';

@Entity('comments')
export class comments {

    @PrimaryGeneratedColumn()
    id_comment: number;

    @Column({type: 'varchar', length: 777})
    text: string;

    @ManyToOne(() => posts)
    @JoinColumn({name: 'post'})
    post: posts;

    @ManyToOne(() => users)
    @JoinColumn({name: 'user'})
    user: users;

    @CreateDateColumn()
    create_at: Date;

    constructor(user: users, post: posts, text: string){
        this.user = user
        this.post = post
        this.text = text
    }

}