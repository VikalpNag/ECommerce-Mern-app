import userSchema from "../models/userModel.js";
import { hashPassword } from "../utils/authUtils.js";

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
