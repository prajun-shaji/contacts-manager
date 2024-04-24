import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username"],
    },
    email: {
      type: String,
      required: [true, "Please enter the e-mail address"],
      unique: [true, "This e-mail has already been taken"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
