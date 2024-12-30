import mongoose from "mongoose";


const dburl = process.env.DBURL.replace('<db_password>', process.env.DBPASSWORD)

const connectDb = async () => {
    try {
        await mongoose.connect(dburl).then(()=>console.log("Database Conneted..!"))
    } catch (error) {
        console.log(error.message)
    }
}


export default connectDb