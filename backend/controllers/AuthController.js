const bcrypt = require("bcryptjs");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

const singup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ message: "User is already exist", success: false });
    }

    const users = new userModel({ name, email, password });

    users.passsword = await bcrypt.hash(password, 10);
    await users.save();
    res.status(201).json({ message: "Signup Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Check email or password", success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.passsword);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "Check email or password", success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "Signup Successfully",
      success: true,
      jwtToken,
      data:user
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getUser = async (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 1000,
    },
    {
      name: "laptop",
      price: 2000,
    },
  ]);
};

module.exports = { singup, login, getUser };
