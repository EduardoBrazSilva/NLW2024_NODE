import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"

export async function createTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/trips',{ 
      schema: {
        body: z.object({
            destination: z.string().min(4),
            stats_at: z.coerce.date(),
            ends_at: z.coerce.date(),
        }) 
      },
    }, async (request) => {
        const { destination, ends_at, stats_at } = request.body
        
        return {
            destination,
            ends_at,
            stats_at
        }
    })
}