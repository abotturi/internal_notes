import { Router } from "express";
import { userController } from "../controller/userController";
import { users } from "../database/entities/users";

const userContr = new userController()

export const userRouter = Router()

userRouter.post('/', async (req, res) => {
    const {name} = req.body
    if(name){
        const user = new users(name)
        const userInsert = await userContr.save(user)
        if(userInsert){
            res.status(200).json({status: 'success', message: 'User created successfully'})
        }else{
            res.status(403).json({status: 'error', message: 'User already created'})
        }
    }else{
        res.status(500).json({status: 'error', message: 'Name not defined'})
    }
})

userRouter.get('/:name', async (req, res) => {
    const nameUser = req.params.name
    const { last_post } = req.body
    
    const allInfo = await userContr.getInfo(nameUser, last_post)

    if(allInfo){
        res.status(200).json({status: 'success', info: allInfo})
    }else{
        res.status(404).json({status: 'error', message: 'User not found'})
    }
})

userRouter.delete('/:name', async (req, res) => {
    const nameUser = req.params.name
    
    const delInfo = await userContr.delete(nameUser)

    if(delInfo){
        res.status(200).json({status: 'success', message: 'Successfully deleted'})
    }else{        
        res.status(409).json({status: 'error', message: 'Error when deleting'})
    }

})