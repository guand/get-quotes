import express from 'express'
import quotesApi from './quotes'



const router = express.Router()


router.use('/quotes', quotesApi)

export default router
