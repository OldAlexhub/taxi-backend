import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Login failed!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const name = `${user.firstName} ${user.lastName}`;
    const userId = user.user_id;

    res.status(200).json({ message: "Login Successful", name, userId, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default AdminLogin;
