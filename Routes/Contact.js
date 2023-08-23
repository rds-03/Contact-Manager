const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  upContact,
  delContact,
  getContacts,
} = require("../controllers/contctContr.js");
const validateFn = require("../middleware/validateToken.js");

router.use(validateFn);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(upContact).delete(delContact);

module.exports = router;
