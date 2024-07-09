import fastify from "fastify";
import { createTrip } from "./routes/create-Trips";

const app = fastify()

app.register(createTrip)

app.listen({ port: 3333 }).then(() => {
    console.log("Server Running!")
})