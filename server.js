
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const prismavenda = new PrismaClient()

const app = express()
const api = express()


app.use(express.json())
app.use(cors())

api.use(express.json())
api.use(cors())



app.post('/produtos', async (req, res) => {


    await prisma.produtos.create({

        data: {
            name: req.body.name,
            descricao: req.body.descricao,
            preco: req.body.preco
        }
    })


    res.status(201).json(req.body)
})




app.put('/produtos/:id', async (req, res) => {


    await prisma.produtos.update({

        where: { 
            id: req.params.id
        },

        data: {
            name: req.body.name,
            descricao: req.body.descricao,
            preco: req.body.preco
        }
    })


    res.status(201).json(req.body)
})



app.get('/produtos', async (req, res) => {

    let produtos = []

    if (req.query) {

        produtos = await prisma.produtos.findMany({

            where: {
                name: req.query.name,
                descricao: req.query.descricao,
                preco: req.query.preco
            }
        })

    } else {

        produtos = await prisma.produtos.findMany()

    }



    res.status(200).json(produtos)
})


app.delete('/produtos/:id', async (req, res) => {

    await prisma.produtos.delete({

        where: {
            id: req.params.id
        }


    })

    res.status(200).json({ message: "Produto excluido com sucesso!" })

})





app.listen(3000)


