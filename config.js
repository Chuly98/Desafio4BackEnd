import mongoose from "mongoose";

const MongoUri = "mongodb+srv://markspk98:Chuly98@micluster0.qq9z2z2.mongodb.net/Ecommerce?retryWrites=true&w=majority"


mongoose.connect(MongoUri)
    .then(() => {
        console.log("data base connection")
    }).catch((err) => {
        console.log("error to connection")
    });

export default mongoose