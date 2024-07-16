const mongoose = require("mongoose")
const Blog = require("../models/blogschema")
const data = require("./data")

async function main(){
    await mongoose.connect("mongodb://localhost:27017/Blog")
}

main().then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log(err)
})

let initDB = async ()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(data.data)
}

initDB().then((res)=>{
    console.log("Data Saved")
}).catch((err)=>{
    console.log(err)
})
