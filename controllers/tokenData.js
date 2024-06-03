const jwt = require("jsonwebtoken")
const User  = require('../models/User')
const withTokenAuth = (req,res)=>{
    console.log(req.headers);
    const token  = req.headers?.authorization?.split(" ")[1];
    if(!token){
        console.log(`here`);
        return res.status(403).json({msg:"invalid token"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const userName = decoded.username
        User.findOne({
            where: {
                username: userName
            }
        }).then(foundClient => {
            if (foundClient) {
                // If a client is found, send the client as response
                return res.json(foundClient);
            } else {
                // If neither client nor merchant is found, handle the error
                throw new Error('User not found');
            }})
       
    } catch (error) {
        console.log(`here II`);
        return res.status(403).json({msg:"invalid token"})
    }
};

module.exports = withTokenAuth;