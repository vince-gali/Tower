// import { applyStyles } from "@popperjs/core/index.js"
import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
    async getMyTicket(){
        const res = await api.get('account/tickets')
        logger.log('[GETTING ACCOUNT TICKETS]', res.data)
        AppState.myTickets = res.data.map(t => new Ticket(t))
    }

    async getTicketsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[GETTING EVENT TICKETS]', res.data)
        AppState.tickets = res.data.map(t=> new Ticket(t))
    }

    async attendEvent(eventId){
        const res = await api.post('api/tickets', {eventId})
        logger.log('ATTENDING EVENT', res.data)
        AppState.activeEvent.ticketCount++
        AppState.tickets = AppState.tickets.filter(t => new Ticket(res.data))
    }

    async leaveEvent(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('[LEAVING EVENT]', res.data)
        AppState.activeEvent.ticketCount--
        AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
    }

}

export const ticketsService = new TicketsService()