const { connectToDB } = require("../middleware/database");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

module.exports = {
    async Login(req, res) {
        try {
            const { username, password } = req.body
            await connectToDB()
            const user = await User.findOne({ username })
            if (!user || !await user.isCorrectPassword(password)) {
                const errorMessage = JSON.stringify({ msg: "Invalid credentials" });
                return new Response(errorMessage, { status: 401, headers: { "Content-Type": "application/json" } });
            }
            const token = jwt.sign({
                email: user.email,
                id: user.id,
                username: user.username
            }, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })
            const responseBody = JSON.stringify({ token, user });
            return new Response(responseBody, { status: 200, headers: { "Content-Type": "application/json" } });
        } catch (error) {
            console.log(error)
            const errorMessage = JSON.stringify({ msg: "Internal Server Error" });
            return new Response(errorMessage, { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
    async SignUp(req, res) {
        try {
            await connectToDB();
            const { username, email, password } = await req.json();
            const user = await User.findOne({ email });

            if (user) {
                return NextResponse.json(
                    { error: "User already exists" },
                    { status: 400 }
                );
            }
            // const saltRounds = 10;
            //     const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new User({
                username, email, password: password
            })
            const savedUser = await newUser.save();
            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser,
            });
        } catch (error) {
            console.log(error)
            const errorMessage = JSON.stringify({ msg: "Internal Server Error" });
            return new Response(errorMessage, { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
    async UpdateUser(req, res) {
        try {
            await connectToDB()
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (error) {
            console.log(error)
        }
    },
}
