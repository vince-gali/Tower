import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class CommentsService{

    async createComment(commentData){
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator')
        return comment
    }

    async getEventComments(eventId){
        const comments = await dbContext.Comments.find({eventId:eventId}).populate('creator')
        return comments
    }

    async deleteComment(commentId, userId){
        const comment = await dbContext.Comments.findById(commentId)
        if(!comment) {throw new BadRequest(`Comment ${commentId} does not exist`)}
        if(comment.creatorId != userId){
            throw new Forbidden('Not your comment to delete')
        }
        await comment.remove()
        return ('Comment has been deleted')
    }
}

export const commentsService = new CommentsService()