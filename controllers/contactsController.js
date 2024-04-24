import expressAsyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// GET ALL CONTACTS
// GET "/api/contacts"
// ACCESS PRIVATE
export const getAllContacts = expressAsyncHandler(async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized User" });
    }

    // Fetch contacts associated with the current user
    const contacts = await Contact.find({ user_id: req.user.id });

    // Check if contacts were found
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ error: "No contacts found for the user" });
    }

    // Respond with the found contacts
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// CREATE A CONTACT
// POST "/api/contacts"
// ACCESS PUBLIC
export const createContact = expressAsyncHandler(async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "Fields cannot be empty." });
      return;
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact." });
  }
});

// GET A CERTAIN CONTACT
// GET "/api/contacts/:id"
// ACCESS PRIVATE
export const getOneContact = expressAsyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to get contact" });
  }
});

// UPDATE A CONTACT
// PUT "/api/contacts/:id"
// ACCESS PRIVATE
export const updateContact = expressAsyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    }
    if (contact.user_id.toString() !== req.user.id) {
      res
        .status(403)
        .json({ message: "You are not authorized for this action" });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateContact);
  } catch (error) {
    res.status(500).json({ message: "Failed to get contact" });
  }
});

// DELETE A CONTACT
// DELETE "/api/contacts/:id"
// ACCESS PRIVATE
export const deleteContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: "Contact not found" });
    return;
  }
  // Check if the contact has a user_id property
  if (!contact) {
    res.status(403).json({
      message: "User doesn't have permission to delete other user's contacts",
    });
    return;
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403).json({ message: "You are not authorized for this action" });
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});
