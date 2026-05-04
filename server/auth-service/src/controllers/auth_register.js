import User from "../models/user_model.js"
import { generateOTP, sendEmail } from "../utils/otp.js";

export const register = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    if (user) {
      if (user.verified) {
        return res.status(400).json({ message: "User already exists" });
      }

      user.otp = otp;
      user.otp_expiry = otpExpiry;
      await user.save();

    } else {
      user = await User.create({
        email,
        otp,
        otp_expiry: otpExpiry,
        verified: false
      });
    }

    await sendEmail(email, otp);

    res.status(200).json({
      message: "OTP sent to email"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};