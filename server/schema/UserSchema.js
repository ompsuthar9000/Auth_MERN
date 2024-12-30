import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    profilePicture: { type: String ,required: true},
    password: { type: String, required: true }
});

export default mongoose.model("User", userSchema);
