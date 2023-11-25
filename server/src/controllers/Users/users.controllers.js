const usersModel = require("../../models/Users/users.models.js");
const jwt = require("jsonwebtoken");

exports.createEmailInfo = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });
    if (user) {
      return res.status(201).json({
        success: false,
        message: `You've already account on this ${email}`,
      });
    }
    const newUser = usersModel({
      email,
      password,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: `Email is added successfully`,
      id: newUser._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createContactInfo = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const id = req.params.id || null;
    if (id === null) {
      return res.status(404).json({
        success: true,
        message: "Id not found for the current user",
      });
    }
    await usersModel.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        phoneNumber: phoneNumber,
        avatar: req.file.filename || "",
      }
    );
    return res.status(201).json({
      success: true,
      message: "Current user info is added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.submitRecord = async (req, res) => {
  try {
    let { terms } = req.body;
    terms = terms ? true : false;
    const id = req.params.id || null;
    if (!terms) {
      return res.status(404).json({
        success: false,
        message: "Please agree our terms and conditions",
      });
    }
    if (id === null) {
      return res.status(404).json({
        success: false,
        message: "Id is null",
      });
    }
    const options = { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 90 };
    const token = await jwt.sign({ _id: id }, process.env.SECRET_KEY);
    res.cookie("token", token, options);
    const currentUser = await usersModel.findByIdAndUpdate(
      { _id: id },
      { terms: terms }
    );
    currentUser.tokens.push({ token });
    await currentUser.save();
    return res.status(201).json({
      success: true,
      message: "terms and conditions are signed successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userSignIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await usersModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect email",
      });
    }
    const iscorrectPassword = await user.comparePassword(password);
    if (!iscorrectPassword) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const options = { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 90 };
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.cookie("token", token, options);
    return res.status(201).json({
      success: true,
      message: "You logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loadCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "You are unathorized",
      });
    }
    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(201).json({
      success: true,
      message: "Cookie is removed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
