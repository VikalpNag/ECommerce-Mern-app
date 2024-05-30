import userModel from "../models/userModel.js";
import userSchema from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address, answer } = req.body;

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
    if (!answer) {
      res.send({ error: "Answer is required" });
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
      answer,
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
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
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

export const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.log(error);
  }
};

//forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {

    const { email, answer, newHashPassword } = req.body;
    //required 
    if (!email) {
      return res.status(400).send({ message: "email is required" })
    }
    if (!answer) {
      return res.status(400).send({ message: "answer is required" })
    }
    if (!newHashPassword) {
      return res.status(400).send({ message: "New password is required" })
    }

    //check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    //update password
    const hashed = await hashPassword(newHashPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    });
  };
};

//update Profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and should be 6 character long." });
    };
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id, {
      name: name || user.name,
      password: hashedPassword || user.password,
      phone: phone || user.phone,
      address: address || user.address,
    }, { new: true });

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    })


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating profile",
      error,
    })

  }
};

//order
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error
    })
  }
};

//all-orders
export const getAllOrderController = async (req, res) => {
  try {

    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.send(orders);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    })
  }
}
