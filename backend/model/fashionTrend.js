import mongoose from "mongoose";

const fashionSchema = mongoose.Schema({
    image:{
        type: String,
        required: true
    }
})

const Fashion = new mongoose.model('Fashion', fashionSchema)

export default Fashion