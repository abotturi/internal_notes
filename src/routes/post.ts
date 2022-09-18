import { Router } from "express";
import { postController } from "../controller/postController";
import { userController } from "../controller/userController";
import { posts } from "../database/entities/posts";
import { users } from "../database/entities/users";

const postContr = new postController
const userContr = new userController

export const postRouter = Router()

postRouter.get('/', async (req, res) => {
    const { start_date, end_date, last_post, name } = req.body

    const allPost = await postContr.getAllpost(start_date, end_date, last_post, name)

    res.status(200).json({status: 'success', post: allPost})
})

postRouter.post('/', async (req, res) => {
    const {name, text, repost} = req.body
    
    if(name && (text || repost)){
        const user = await userContr.getInfoName(name)
        if(user){
            const post = new posts(user, text, repost)
    
            const postSave = await postContr.save(post, name)
    
            if(postSave){
                res.status(200).json({status: 'success', message: 'Successfully published'})
            }else{
                res.status(403).json({status: 'error', message: 'Limit exceeded'})
            }
        }else{
            res.status(404).json({status: 'error', message: 'User not found'})
        }

    }else{
        res.status(502).json({status: 'error', message: 'Invalid Format'})
    }

})