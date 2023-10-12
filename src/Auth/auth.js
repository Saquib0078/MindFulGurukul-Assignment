const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const userModel = require("../Models/UserModel")


const Authentication = async function (req, res, next) {
    try {

        let token = req.headers["authorization"]
        if (!token) {
            return res.status(401).send({ status: false, message: "Token is required" })
        }

        let finalToken = token.split(" ")

        let newToken = finalToken.pop()

        jwt.verify(newToken, process.env.JWT_SECRET, function (error, decodedToken) {
            if (error) {
                let message = error.message == "jwt expired" ? "token expired , please Login Again!!!" : "invalid Token"
                return res.status(400).send({ status: false, message: message })
            }

            req.decodedToken = decodedToken;  

            next()
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

/***************************Authorization******************************/

const Authorization = async function (req, res, next) {
    try {
        let userId = req.params.userId; 
        let user = req.decodedToken.userId;
        console.log(user) 
        let presentUser = await userModel.findOne({ _id: userId});
        if (!presentUser) {
            return res.status(404).send({ status: false, message: "User not present in the database" });
        }

        if (userId !== user) {
            return res.status(401).send({ status: false, message: "Unauthorized Access" });
        }

        next();
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};





module.exports = { Authentication, Authorization }