import userModel from "../models/userModel.js";
import userSchema from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    //Validation
    if (!name) {
      res.send({ error: "name is required" });
    }
    if (!email) {
      res.send({ error: "email is required" });
    }
    if (!phone) {
      res.send({ error: "phone number is required" });
    }
    if (!password) {
      res.send({ error: "Password is required" });
    }
    if (!address) {
      res.send({ error: "address is required" });
    }

    //check user
    const existingUser = await userSchema.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered,Please Login",
      });
    }

    //register user
    const newHashPassword = await hashPassword(password);

    //save
    const user = await new userSchema({
      name,
      email,
      phone,
      address,
      password: newHashPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    }

    //Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(404).send({
        success: false,
        message: "incorrect password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
