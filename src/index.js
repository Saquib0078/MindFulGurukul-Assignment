const express = require("express");
const app = express();
require("dotenv").config();
const route = require('./Routes/route')
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('dist'))

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true})
.then(()=> console.log("MongoDB is connected"))
.catch(err => console.log(err))

app.use('/', route)
app.use(function(req, res){
    return res.status(400).send({status: false, message: "Path Not Found"})
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT||3000}`);
});
