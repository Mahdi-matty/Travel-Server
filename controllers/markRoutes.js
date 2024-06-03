const Mark = require('../models/Mark');
import { connectToDB } from "../middleware/database";

// Create a bookmark for a flight
module.exports = {
    async createFlightBookmark(req, res) {
        try {
            await connectToDB()
            const {userId, flightId} = req.body()
            const bookmark = new Mark({
                user: userId,
                item: {
                    type: 'Flight',
                    refId: flightId
                }
            });
            await bookmark.save();
            console.log('Flight bookmarked:', bookmark);
        } catch (error) {
            console.log(error)
        }

    },

    // Create a bookmark for a rideshare
    async createRideshareBookmark(req, res) {
        try {
            await connectToDB()
            const { userId, rideshareId} = req.body()
            const bookmark = new Mark({
                user: userId,
                item: {
                    type: 'Rideshare',
                    refId: rideshareId
                }
            });
            await bookmark.save();
            console.log('Rideshare bookmarked:', bookmark);
        } catch (error) {
            console.log(error)
        }

    },

    // Query bookmarks with populated details
    async getUserBookmarks(req, res) {
        try {
            await connectToDB()
            const {userId} = req.params.userId
            const bookmarks = await Mark.find({ user: userId }).populate('itemDetails').exec();
            return bookmarks;
        } catch (error) {
            console.log(error)
        }

    }
}


