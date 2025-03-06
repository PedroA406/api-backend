
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express()


app.use(express.json())
app.use(cors())
app.post('/vendas', async (req, res) => {

    await prisma.vendas.create({

        data: {
            produto: req.body.produto,
            preco: req.body.preco
        }
    })

    res.status(201).json(req.body)
})


app.put('/vendas/:id', async (req, res) => {


    await prisma.vendas.update({

        where: {
            id: req.params.id
        },

        data: {
            produto: req.body.produto,
            preco: req.body.preco
        }
    })

    res.status(201).json(req.body)
})




app.get('/vendas', async (req, res) => {

let vendas = []

if(req.query){

vendas = await prisma.vendas.findMany({

    where:{
        produto: req.query.produto,
        preco: req.query.preco
    }
})

} else{

    vendas = await prisma.vendas.findMany()

}


    
    res.status(200).json(vendas)
})


app.delete('/vendas/:id', async (req, res) => {

    await prisma.vendas.delete({

        where: {
            id: req.params.id
        }


    })

    res.status(200).json({ message: "Venda excluida com sucesso!" })

})

app.listen(3000)


