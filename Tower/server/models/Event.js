import { json } from "express";
import { Schema } from "mongoose";

export const EventSchema = new Schema(
    {
        name: {type: String, required: true},
        creatorId: {type: Schema.Types.ObjectId, required:true, ref:'Account'},
        description: {type: String, required: true, minlength:6},
        coverImg: {type: String, required: true, maxlength:350},
        location: {type: String, required: true, minlength: 6},
        capacity: {type: Number, required:true},
        startDate: {type: String},
        isCanceled: {type: Boolean, required:true, default:false},
        type: {type: String, required:true, enum:['concert', 'convention', 'sport', 'digital']}
    
    }, {timestamps:true, toJSON: {virtuals:true} }
)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true

})

EventSchema.virtual('ticketCount',{
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})