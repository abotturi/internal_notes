import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePosts1662303406931 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'posts',
                columns: [
                    {
                        name: 'id_post',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: 'text',
                        type: 'varchar(777)',
                        isNullable: true
                    },
                    {
                        name: 'repost',
                        type: 'int',
                        isNullable: true
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
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts')
    }

}
