import { getManager } from "../database/dataSource";
import { users } from "../database/entities/users";
import { postController } from "./postController";

const getRepository = getManager.getRepository(users)

const postContr = new postController()

export class userController{
    async save(user: users){
        const checkUser = await getRepository.find({
            where: {
                name: user.name
            }
        })
        
        if(checkUser.length > 0){
            return false
        }

        const userSave = await getManager.save(user)
        return true
    }

    async getInfo (name: string, lastPost?: number) {
        const usersInfo = await getRepository.find({
            where: {
                name: name
            }
        })
        
        if(usersInfo.length == 0){
            return false
        }

        const allPost = await postContr.getUser(name, lastPost)

        const allDate = {
            user_info: usersInfo[0],
            post: allPost
        }

        return allDate
    }

    async getInfoName(name: string) {
        const datasUser = await getRepository.findOne({
            where: {
                name: name
            }
        })

        return datasUser
    }
}