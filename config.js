import mongoose from "mongoose";

const MonUrl = "mongodb+srv://markspk98:markspk98@micluster0.qq9z2z2.mongodb.net/MiEcommerce?retryWrites=true&w=majority"

mongoose.connect(MonUrl)
.then(() => {
    console.log("data base connection")
}).catch((err) => {
    console.log("error to connection")
});


export default mongoose;