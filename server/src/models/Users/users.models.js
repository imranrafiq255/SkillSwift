const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email should be unique"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    trim: true,
    minlength: [6, "Password should be greater than 6"],
  },
  name: String,
  phoneNumber: String,
  avatar: String,
  terms: Boolean,
  tokens: [
    {
      token: {
        type: String,
        required: [true, "Token is required"],
      },
    },
  ],
});

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.methods.comparePassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};

const usersModel = mongoose.model("Users", usersSchema);
module.exports = usersModel;
