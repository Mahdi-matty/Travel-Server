const Trip = require('../models/Trip');
const { connectToDB } = require("../middleware/database");

// Create a bookmark for a flight
module.exports = {
    async createFlightBooked(req, res) {
        try {
            await connectToDB()
            const { userId, flightId } = req.body()
            const flightTrip = new Trip({
                user: userId,
                item: {
                    type: 'Flight',
                    refId: flightId
                }
            });
            await flightTrip.save();
            console.log('Flight booked:', flightTrip);
        } catch (error) {
            console.log(error)
        }

    },

    // Create a bookmark for a rideshare
    async createRideshareBooked(req, res) {
        try {
            await connectToDB()
            const { userId, rideshareId } = req.body()
            const rideTrip = new Trip({
                user: userId,
                item: {
                    type: 'Rideshare',
                    refId: rideshareId
                }
            });
            await rideTrip.save();
            console.log('Rideshare booked:', rideTrip);
        } catch (error) {
            console.log(error)
        }

    },

    // Query bookmarks with populated details
    async getUserBooked(req, res) {
        try {
            await connectToDB()
            const { userId } = req.params.userId
            const trips = await Trip.find({ user: userId }).populate('itemDetails').exec();
            return trips;
        } catch (error) {
            console.log(error)
        }

    }
}
