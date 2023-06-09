import { Schema } from "mongoose";


// NOTE use picture as a reference for comment
export const CommentSchema = new Schema(
    {
        creatorId: {type:Schema.Types.ObjectId, required:true, ref:'Account'},
        eventId: {type:Schema.Types.ObjectId, required:true, ref:'Event'},
        body: {type: String, required:true}
    }, {timestamps:true, toJSON: {virtuals:true}}
)

CommentSchema.virtual('creator',{
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})