import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import {api} from './AxiosService.js'
class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.events = res.data.map(e => new Event(e))
    }

    async getEventById(eventId){
        const res = await api.get(`api/events/${eventId}`)
        logger.log('[GETTING EVENT BY ID]', res.data)
        AppState.activeEvent = new Event(res.data)
    }

    async createEvent(formData){
        const res = await api.post('api/events', formData)
        logger.log('[CREATING EVENT]', res.data)
        return res.data
    }

    async deleteEvent(eventId){
        logger.log('[DELETING EVENT]', eventId)
        const res = await api.delete(`api/events/${eventId}`)
        logger.log('[CANCELLED EVENT]', res.data)
        // AppState.events = AppState.events.filter(e=> e.id != eventId)
    }
}

export const eventsService = new EventsService()