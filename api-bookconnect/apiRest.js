import express from 'express'
import cors from 'cors'
import {authRoutes, authorRoutes, bookRoutes, collectionRoutes, fileRoutes, genreRoutes, listRoutes, roleRoutes, stateRoutes, userRoutes} from './src/router/index.js'
import { logErrors, clientErrorHandler, errorHandler } from './src/middleware/errorMiddleware.js'

const port = 3000
const app = express()

app.use(cors())

app.use(express.static('public'))

app.use(express.json())

app.use(authRoutes, authorRoutes, bookRoutes, collectionRoutes, fileRoutes, genreRoutes, listRoutes, roleRoutes, stateRoutes, userRoutes)

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(port, () => console.log(`🚀 Servidor funcionando en: http://localhost:3000 ⭐️`) )  