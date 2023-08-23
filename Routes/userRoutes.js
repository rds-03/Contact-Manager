const express = require("express");
const {
  registUser,
  loginUser,
  currentUser,
} = require("../controllers/userContr");
const validateFn = require("../middleware/validateToken");
const router = express.Router();

router.post("/register", registUser);

router.post("/login", loginUser);

router.get("/Current", validateFn, currentUser);

module.exports = router;
