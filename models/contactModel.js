import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the contact."],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address for the contact."],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number for the contact."],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
