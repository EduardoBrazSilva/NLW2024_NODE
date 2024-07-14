import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/create-Trips";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipants } from "./routes/confirm-participant";

const app = fastify()

app.register(cors, {
    origin: 'http://localhost:3333'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipants)

app.listen({ port: 3333 }).then(() => {
    console.log("Server Running!")
})