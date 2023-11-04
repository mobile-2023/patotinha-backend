import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import 'dotenv/config'

const app: Express = express();
const prisma = new PrismaClient()
const port = process.env.PORT;

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World!</h1>');
})

app.get('/users', async (request, reply) => {
    const users = await prisma.user.findMany()
    return users
})

app.post('/users', async (request, reply) => {

    console.log(request.body)

    const { username, email, password } = request.body

    const isRegistered = await prisma.user.findMany({ where: { email: email } })

    if (isRegistered.length === 0) {
        await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        })

        reply.sendStatus(200)
    } else {
        reply.sendStatus(401)
    }
})

/* Authentication */
app.post('/users/login', async (request, reply) => {

    const { email, password } = request.body

    const isRegistered = await prisma.user.findMany({ where: { email: email } })

    if (isRegistered.length > 0) {
        if (password === isRegistered[0].password) {
            console.log("Logando")
        } else {
            console.log("Senha incorreta")
        }
    } else {
        reply.status(401)
    }

})

app.listen(3333, () => {
    console.log(`Servidor iniciado na porta: 3333`);
})
