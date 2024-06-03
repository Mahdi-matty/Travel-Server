import { Schema, model, models } from "mongoose";

const MarkSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    item: {
        type: { type: String, enum: ['Flight', 'Rideshare', 'Train', 'Bus'], required: true },
        refId: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now }
})

const Mark = models.Mark || model('Mark', MarkSchema)

export default Mark