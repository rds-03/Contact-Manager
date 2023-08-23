const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// GET all contacts

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts });
});
// POST THE CONTACT
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, PhoneNum } = req.body;
  if (!name || !email || !PhoneNum) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    PhoneNum,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});
//GET CONTACTS BY ID

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  } else {
    res.status(200).json(contact);
  }
});
//UPDATE ALL CONTACT
const upContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Does Not have the Permission to update the contact");
  }
  const upcont = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(upcont);
});

//DELETE CONTACT
const delContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Does Not have the Permission to Delete the contact");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  getContacts,
  upContact,
  delContact,
};
