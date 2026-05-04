import User from '../models/user_model.js'
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otp_expiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};