import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateComments1662305131166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'comments',
                columns: [
                    {
                        name: 'id_comment',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'text',
                        type: 'varchar(777)',
                    },
                    {
                        name: 'post',
                        type: 'int',
                    },
                    {
                        name: 'user',
                        type: 'int'
                    },
                    {
                        name: 'create_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_user',
                        columnNames: ['user'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id_user']                        
                    },
                    {
                        name: 'fk_post',
                        columnNames: ['post'],
                        referencedTableName: 'posts',
                        referencedColumnNames: ['id_post']                        
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments')
    }

}
