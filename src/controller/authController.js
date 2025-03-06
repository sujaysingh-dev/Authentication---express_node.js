const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res
      .status(201)
      .json({ Message: `User registered with username : ${username}` });
  } catch (error) {
    res.status(500).json({ Message: `Something went wrong` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!User) {
      return res
        .status(404)
        .json({ Message: `Here username : ${username} not found` });
    }

    const isMach = await bcrypt.compare(password, user.password);
    if (!isMach) {
      return res.status(400).json({ Message: `Invalid credential` });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ Message: `Something went wrong` });
  }
};

module.exports = {
  register,
  login,
};
