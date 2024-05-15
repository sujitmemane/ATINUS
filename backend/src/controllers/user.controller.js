import User from "../models/user.model.js";
import brypt from "bcrypt";
import { createToken } from "../utils/index.js";

export const handleUserValidation = async (req, res) => {
  const { phoneNumber, email, fullName, username, password } = req.body;
  const errors = {};
  try {
    const phoneNumberRegex = /^\d{12}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const usernameRegex = /^[a-zA-Z0-9_\.]*$/;
    if (phoneNumber === "") {
      errors.phoneNumber = {
        valid: false,
        message: "Please enter phone number",
      };
    }
    if (email === "") {
      errors.email = {
        valid: false,
        message: "Please enter email",
      };
    }

    if (fullName === "") {
      errors.fullName = {
        valid: false,
        message: "Please enter full name",
      };
    }

    if (username === "") {
      errors.username = {
        valid: false,
        message: "Please enter username",
      };
    }

    if (password === "") {
      errors.password = {
        valid: false,
        message: "Plase enter password",
      };
    }

    if (phoneNumber) {
      const isPhoneNumberValid = phoneNumberRegex.test(phoneNumber);
      if (!isPhoneNumberValid) {
        errors.phoneNumber = {
          valid: false,
          message: "Invalid Phone Number",
        };
      } else {
        const user = await User.findOne({ phoneNumber: phoneNumber });
        if (user) {
          errors.phoneNumber = {
            valid: false,
            message: "Phone Number already in use",
          };
        }
      }
    }

    if (email) {
      const isEmailValid = emailRegex.test(email);
      if (!isEmailValid) {
        errors.email = {
          valid: false,
          message: "Invalid Email",
        };
      } else {
        const user = await User.findOne({ email: email });
        if (user) {
          errors.email = {
            valid: false,
            message: "Email is already in use",
          };
        }
      }
    }

    if (username) {
      const isUsernameValid = usernameRegex.test(username);
      if (!isUsernameValid) {
        errors.username = {
          valid: false,
          message:
            "Username should only contain alphabet, number, underscore, and period",
        };
      } else {
        const user = await User.findOne({ username: username });
        if (user) {
          errors.username = {
            valid: false,
            message: "Username is not available",
          };
        }
      }
    }

    if (fullName && fullName.length < 5) {
      errors.fullName = {
        valid: false,
        message: "Fullname should contain at least 5 characters",
      };
    }

    if (password && password.length < 8) {
      errors.password = {
        valid: false,
        message: "Password should contain at least 8 characters",
      };
    }

    if (Object.keys(errors).length > 0) {
      return res.status(200).json({
        success: false,
        errors,
      });
    } else {
      return res.status(200).json({
        success: true,
        errors,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

export const handleUserRegisteration = async (req, res) => {
  const { email, phoneNumber, fullName, username, password } = req.body;
  try {
    if (email) {
      const user = await User.create({
        email,
        fullName,
        username,
        password,
      });
      res.status(201).json({
        success: true,
        message: "User is registered successdull",
      });
    } else {
      const user = await User.create({
        phoneNumber,
        fullName,
        username,
        password,
      });
      const token = createToken(user._id);
      res.status(201).json({
        success: true,
        message: "User is registered successdull",
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

export const handleUserLogin = async (req, res) => {
  const { email, phoneNumber, username, password } = req.body;
  console.log("req body", req.body);

  try {
    let user;
    let errorMessage;

    if (email) {
      user = await User.findOne({ email });
      errorMessage = "Email or password is wrong";
    } else if (username) {
      user = await User.findOne({ username });
      errorMessage = "Username or password is wrong";
    } else {
      user = await User.findOne({ phoneNumber });
      errorMessage = "Phone Number or password is wrong";
    }
    console.log("login user", user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const isPasswordMatch = brypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const loggedInUser = await User.findById(user._id);
    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "User is logged in successfully",
      user: loggedInUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
