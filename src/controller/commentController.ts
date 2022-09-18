import { Between, MoreThan, IsNull } from 'typeorm'
import { getManager } from "../database/dataSource";
import { comments } from "../database/entities/comments";

const getRepository = getManager.getRepository(comments)

export class commentController{

    async save(comment: comments, name: string){
        const startDay = new Date()
        startDay.setHours(0,0,0,0)
        
        const endDay = new Date()
        endDay.setHours(23,59,59,999)

        const commentCheck = await getRepository.find({
            where: {
                user: {name: name},
                create_at: Between(startDay, endDay)
            }
        })

        if(commentCheck.length <= 4){
            const commentSave = await getManager.save(comment)
            return true
        }else{
            return false
        }
    }

    async getComment(id: number){
        const allComments = await getRepository.find({
            relations: {
                user: true,
            },
            where: {
                post: {id_post: id}
            }
            
        })

        return allComments
    }

}