import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Already connected to the database.')
        return
    }
    try {
        await mongoose.connect(process.env.MOONGODB_URI || 'mongodb://127.0.0.1:27017/', {
            dbName: 'Mahdi',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('Connected to the database.')
    } catch (error) {
        console.error('Error connecting to the database:', error)
        throw error
    }
}