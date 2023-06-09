import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class EventsService{
    async getAllEvents(){
        const events = await dbContext.Events.find().populate('creator ticketCount')
        return events
    }

    async create(eventData){
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator ticketCount')
        return event
    }

    async getEventById(eventId){
        const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
        if(!event) throw new BadRequest('Event at id: ${eventId} could not be found')
        return event
    }

    async cancelEvent(eventId, userId){
        const event = await this.getEventById(eventId)
        if(event.creatorId != userId){
            throw new Forbidden('You are not authorized to cancel this event')
        } 
        if(event.isCanceled == true){
            throw new BadRequest('Event is already cancelled')
        }
        event.isCanceled = true
        await event.save()
        return 

    }

    async editEvent(eventId, userId, eventData){
        const originalEvent = await this.getEventById(eventId)
        if(originalEvent.creatorId != userId){
            throw new Forbidden('Cannot edit this')
        }
        if(originalEvent.isCanceled == true){
            throw new BadRequest('Event is already cancelled')
        }
        
        originalEvent.name = eventData.name || originalEvent.name
        originalEvent.description = eventData.description || originalEvent.description
        originalEvent.coverImg = eventData.coverImg || originalEvent.coverImg
        originalEvent.location = eventData.location || originalEvent.location
        originalEvent.capacity = eventData.capacity || originalEvent.capacity
        originalEvent.startDate = eventData.startDate || originalEvent.type == eventData.type || originalEvent.type
        
        await originalEvent.save()
            return originalEvent
        
        
    }
}

export const eventsService = new EventsService()