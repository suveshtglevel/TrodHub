import bcrypt from "bcryptjs";
import User from '../models/user_model.js'

export const setPassword = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.verified) {
      return res.status(400).json({
        message: "User not verified"
      });
    }

    if (user.password) {
      return res.status(400).json({
        message: "Password already set"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.fullName = fullName;

    await user.save();

    res.status(200).json({
      message: "Registration completed"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};