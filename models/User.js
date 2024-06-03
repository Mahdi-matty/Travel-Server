import { Schema, model, models } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        required: [true, 'Email is needed'],
    },
    username: {
        type: String,
        unique: [true, 'username already exist'],
        required: [true, 'username is needed'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password must be at least 8 charachters']
    },
    image: {
        type: String
    },
})
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

const User = models.User || model('User', userSchema) 
export default User