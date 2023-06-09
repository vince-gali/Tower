
// NOTE  reference collaborator for tickets

import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService{

    async createTicket(ticketData){
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile event')
        return ticket
    }

    async getAccountTickets(accountId){
        const tickets = await dbContext.Tickets.find({accountId:accountId}).populate('event')
        return tickets
    }

    async getEventTickets(eventId){
        const tickets = await dbContext.Tickets.find({eventId: eventId}).populate('profile event')
        return tickets
    }

    async getTickets(filter){
        const tickets = await dbContext.Tickets.find(filter).populate('event profile')
        return tickets
    }

    async deleteTicket(ticketId, userId){
        const ticket = await dbContext.Tickets.findById(ticketId).populate('profile event')
        if(!ticket) throw new BadRequest('Ticket ${ticketId} does not exist')
        if(ticket.accountId != userId) throw new Forbidden('Not your ticket to delete')
        await ticket.remove()
        return
        // return `${ticket.profile.name} has removed their ticket for ${ticket.event.title}`
    }
}

export const ticketsService = new TicketsService()