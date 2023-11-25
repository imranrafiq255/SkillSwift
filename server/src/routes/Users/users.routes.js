const {
  createEmailInfo,
  createContactInfo,
  submitRecord,
  userSignIn,
  loadCurrentUser,
  logOut,
} = require("../../controllers/Users/users.controllers.js");
const isAuthenticated = require("../../middlewares/auth.js");
const image = require("../../config/imageUpload.config.js");
const express = require("express");
const router = express.Router();

router.route("/createemail").post(createEmailInfo);
router
  .route("/createcontactinfo/:id")
  .post(image.single("avatar"), createContactInfo);
router.route("/submitrecord/:id").post(submitRecord);
router.route("/signin").post(userSignIn);
router.route("/currentuser").get(isAuthenticated, loadCurrentUser);
router.route("/logout").get(isAuthenticated, logOut);
module.exports = router;
