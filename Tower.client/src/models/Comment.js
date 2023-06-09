
export class Comment{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.creatorId = data.creatorId
        this.body = data.body
        this.creator = data.creator
        this.eventId = data.eventId
        this.imgUrl = data.imgUrl
    }
}