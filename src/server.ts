import "reflect-metadata"
import "./database/dataSource"
import bodyParser from "body-parser"
import cors from 'cors'
import express from 'express'
const app = express()


// My Import Routes
    
    import { userRouter } from "./routes/user"
    import { postRouter } from  './routes/post'
    import { commentRouter } from './routes/comment'

// ----------------


// All Config
    app.use(cors())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())

    app.listen(8080, () => {
        console.log('Servidor aberto na porta 8080')
    })

// ----------

// Default Route

    app.get('/', (req, res) => {
        res.status(200).json({satus: 'Success'})
    })

// -------------

// My Routes

    app.use('/user', userRouter)
    app.use('/post', postRouter)
    app.use('/comment', commentRouter)

// ---------

// Export

    export default app

// ------