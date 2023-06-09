export class Event{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.creatorId = data.creatorId
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.isCanceled = data.isCanceled || false
        this.type = data.type
        this.ticketCount = data.ticketCount
        
    }
}