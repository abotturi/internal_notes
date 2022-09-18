import { Between, MoreThan, IsNull } from 'typeorm'
import { getManager } from "../database/dataSource";
import { posts } from "../database/entities/posts";

const getRepository = getManager.getRepository(posts)

export class postController{

    async save(posts: posts, name: string){
        const startDay = new Date()
        startDay.setHours(0,0,0,0)
        
        const endDay = new Date()
        endDay.setHours(23,59,59,999)

        const postCheck = await getRepository.find({
            where: {
                user: {name: name},
                create_at: Between(startDay, endDay)
            }
        })

        if(postCheck.length <= 4){
            if(posts.repost){
        
                const postRepostCheck = await getRepository.findOne({
                    where: {
                        user: {name: name},
                        id_post: posts.repost,
                        repost: IsNull()
                    }
                })
                
                if(postRepostCheck){
                    const postSave = await getManager.save(posts)
                    return true
                }else{
                    return false
                }    
            }

            const postSave = await getManager.save(posts)
            return true
        }else{
            return false
        }
    }

    async getAllpost(startDate?: Date , endDate?: Date, lastPost?: number, name?: string){
        
        const where: {
            user?: {
                name: string
            },
            id_post?: any
            create_at?: any
        } = {}

        if(name){
            where.user = {name: name}
        }

        if(startDate && endDate){

            const start = new Date(startDate)
            start.setHours(0,0,0,0)

            const end = new Date(endDate)
            end.setHours(23,59,59,999)

            where.create_at = Between(start, end)
        }

        if(lastPost){
            where.id_post = MoreThan(lastPost)
        }

        const allPost = await getRepository.find({
            relations: {
                user: true,
            },
            where: where,
            take: 10,
            order: {
                id_post: 'DESC'
            }
        })
        for(var i = 0; i < allPost.length; i++){
            if(allPost[i].repost){
                allPost[i].repost = await getRepository.findOne({
                    where: {
                        id_post: allPost[i].repost
                    }
                })
            }
        }
        return allPost

    }

    async getUser(name: string, lastPost?: number, startDate?: Date , endDate?: Date, ){
        if(startDate && endDate){

            const start = new Date(startDate)
            start.setHours(0,0,0,0)

            const end = new Date(endDate)
            end.setHours(23,59,59,999)

            if(lastPost){
                const allPost = await getRepository.find({
                    where: {
                        user: {name: name},
                        id_post: MoreThan(lastPost),
                        create_at: Between(start, end)
                    },
                    take: 5,
                    order: {
                        id_post: 'DESC'
                    }
                })
                for(var i = 0; i < allPost.length; i++){
                    if(allPost[i].repost){
                        allPost[i].repost = await getRepository.findOne({
                            where: {
                                id_post: allPost[i].repost
                            }
                        })
                    }
                }                
                return allPost
            }else{
                const allPost = await getRepository.find({
                    where: {
                        user: {name: name},
                        create_at: Between(start, end)
                    },
                    take: 5,
                    order: {
                        id_post: 'DESC'
                    }
                })
                for(var i = 0; i < allPost.length; i++){
                    if(allPost[i].repost){
                        allPost[i].repost = await getRepository.findOne({
                            where: {
                                id_post: allPost[i].repost
                            }
                        })
                    }
                }
                return allPost
            }
        }else{
            if(lastPost){
                const allPost = await getRepository.find({
                    where: {
                        user: {name: name},
                        id_post: MoreThan(lastPost)
                    },
                    take: 5,
                    order: {
                        id_post: 'DESC'
                    }
                })
                for(var i = 0; i < allPost.length; i++){
                    if(allPost[i].repost){
                        allPost[i].repost = await getRepository.findOne({
                            where: {
                                id_post: allPost[i].repost
                            }
                        })
                    }
                }                
                return allPost
            }else{
                const allPost = await getRepository.find({
                    where: {
                        user: {name: name}
                    },
                    take: 5,
                    order: {
                        id_post: 'DESC'
                    }
                })
                for(var i = 0; i < allPost.length; i++){
                    if(allPost[i].repost){
                        allPost[i].repost = await getRepository.findOne({
                            where: {
                                id_post: allPost[i].repost
                            }
                        })
                    }
                }                
                return allPost
            }            
        }
    }

    async getIdPost(id: number, name: string){
        const post = await getRepository.findOne({
            where: {
                id_post: id,
                user: {name: name}
            }
        })

        if(post){
            return post
        }

        return false
    }

}