const express = require("express");

const { register, verifyEmail, login } = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);

module.exports = router;