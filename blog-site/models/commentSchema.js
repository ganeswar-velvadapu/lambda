const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const commenSchema = new Schema({
    comment : {
        type : String,
    }
})

const Comment = mongoose.model("Comment",commenSchema)
module.exports = Comment