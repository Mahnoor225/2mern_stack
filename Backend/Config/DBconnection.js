
import mongoose from "mongoose";

const DBconnection = async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URL, {
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
    });
    console.log(` Successfully Database Connected`);
} catch (error) {
    console.error(`Database Error: ${error.message}`);
}
}

export default DBconnection;