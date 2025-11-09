import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  progress: {
    type: Map,
    of: Number,
    default: {},
  },
});

export default mongoose.model("User", userSchema);