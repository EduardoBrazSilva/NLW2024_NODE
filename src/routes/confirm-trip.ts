import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import { dayjs } from "../lib/dayjs";

export async function confirmTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm',{ 
      schema: {
        params: z.object({
            tripId: z.string().uuid(),
        }) 
      },
    }, async (request, reply ) => {
        const { tripId } = request.params

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId,
            }
        })

        if (!trip) {
            throw new Error('Trip not found.')
        }

        if (trip.is_confirmed) {
            return reply.redirect(`http://localhost:3000/trips/${tripId}`)
        }

        await prisma.trip.update ({
            where: { id: tripId },
            data: { is_confirmed: true },
        })

        const formatedStartDate = dayjs(trip.starts_at).format('LL');
        const formatedEndDate = dayjs(trip.ends_at).format('LL');

        const confirmationLink = `http:/localhost:3333/trips/${trip.id}/confirm`

        const mail = await getMailClient()

        return { tripId: request.params.tripId}
    })
}