
export class Ticket{
    constructor(data){
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.profile = data.profile
        this.event = data.event
    }
}

export class EventMember extends Ticket{
    constructor(data){
        super(data)
        this.profileId = data.profileId
        this.name = data.profile.name
        this.picture = data.picture
    }
}

export class TicketEvent extends Ticket{
    constructor(data){
        super(data)
        this.title = data.title
        this.coverImg = data.coverImg
    }
}