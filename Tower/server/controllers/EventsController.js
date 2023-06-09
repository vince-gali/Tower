
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { dbContext } from "../db/DbContext.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:eventId', this.editEvent)
            .post('', this.create)
            .delete('/:eventId', this.cancelEvent)
    }

    async getEventComments(req,res,next){
        try {
            const comments = await commentsService.getEventComments(req.params.eventId)
            return res.send(comments)
        } catch (error) {
            next(error)   
        }
    }


async create(req,res,next){
    try {
        req.body.creatorId = req.userInfo.id
        const event = await eventsService.create(req.body)
        return res.send(event)
    } catch (error) {
        next(error)
    }
}

async getAllEvents(req,res,next){
    try {
        const events = await eventsService.getAllEvents()
        return res.send(events)
    } catch (error) {
        next(error)
    }
}

async getEventById(req,res,next){
    try {
        const event = await eventsService.getEventById(req.params.eventId)
        return res.send(event)
    } catch (error) {
        next(error)
    }
}

async cancelEvent(req,res,next){
    try {
        // const eventData = req.body
        const eventId = req.params.eventId
        const userId = req.userInfo.id
        const event = await eventsService.cancelEvent(eventId, userId)
        return res.send(event)
    } catch (error) {
        next(error)
    }
}

async getEventTickets(req,res,next){
    try {
        const tickets = await ticketsService.getEventTickets(req.params.eventId)
        return res.send(tickets)
    } catch (error) {
        next(error)
    }
}

async editEvent(req,res,next){
    try {
        const eventData = req.body
        const eventId = req.params.eventId
        const userId = req.userInfo.id
        const event = await eventsService.editEvent(eventId,userId, eventData)
        return res.send(event)
    } catch (error) {
        next(error)
    }
}

}
