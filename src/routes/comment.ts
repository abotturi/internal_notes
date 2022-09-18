import { Router } from "express";
import { commentController } from "../controller/commentController";
import { postController } from "../controller/postController";
import { userController } from "../controller/userController";
import { comments } from "../database/entities/comments";

const postContr = new postController
const userContr = new userController
const commentContr = new commentController

export const commentRouter = Router()

commentRouter.get('/:id', async (req, res) => {
    const idPost = req.params.id    

    const allComment = await commentContr.getComment(parseInt(idPost))

    res.json({status: 'success', comment: allComment})
})

commentRouter.post('/', async (req, res) => {
    const {name, text, post} = req.body

    if(name && text && post){
        const user = await userContr.getInfoName(name)
        const dataPost = await postContr.getIdPost(post, name)

        if(user && dataPost){
            const comment = new comments(user, dataPost, text)
            const commentSave = await commentContr.save(comment, name)
    
            if(commentSave){
                res.status(200).json({status: 'success', message: 'Successfully commented'})
            }else{
                res.status(403).json({status: 'error', message: 'Limit exceeded'})
            }
        }else{
            res.status(404).json({status: 'error', message: 'User or post not found'})
        }
    }else{
        res.status(502).json({status: 'error', message: 'Invalid Format'})
    }

})