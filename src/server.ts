import fastify from "fastify";
import { prisma } from "./lib/prisma";

const app = fastify()

app.get('/cadastrar', async () => {
    await prisma.trip.create({
        data: {
            destintion: 'Florianopolis',
            starts_at: new(Date),
            ends_at: new(Date),

        }
    })

    return 'Registro cadastrado com sucesso!'
})

app.get('/listar', () => {
    return 'Hello NLW'
})


app.listen({ port: 3333 }).then(() => {
    console.log("Server Running!")
})