const { Schema, model, models } =require ("mongoose");

const TripSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    item: {
        type: { type: String, enum: ['Flight', 'Rideshare', 'Train', 'Bus'], required: true },
        refId: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now }
})

const Trip = models.Trip || model('Trip', TripSchema)

module.exports = Trip