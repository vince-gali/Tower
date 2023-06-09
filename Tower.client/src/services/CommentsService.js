import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{
    async getCommentsByEventId(eventId){
        AppState.comments = []
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('[GETTING COMMENTS BY EVENT ID]', res.data)
        AppState.comments = res.data.map(c => new Comment(c))
        logger.log('[COMMENTS IN THE APPSTATE]', AppState.comments)
    }


    async createComment(formData){
        const res = await api.post('api/comments', formData)
        logger.log('[CREATING COMMENT]', res.data)
        AppState.comments.push(new Comment(res.data))
        return res.data
    }

    async deleteComment(commentId){
        logger.log('[DELETING COMMENT]', commentId)
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log('[DELETING COMMENT]', res.data)
        AppState.comments = AppState.comments.filter(c=> c.id != commentId)

    }
}

export const commentsService = new CommentsService()