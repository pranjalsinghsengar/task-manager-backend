import User from "../../models/user.js";

const SigninHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        user: existingUser,
      });
    }
    const newUser = new user({ firstName, lastName, email, password });
    if (newUser) {
      const savedUser = await newUser.save();
      res.status(201).json({ success: true, user: savedUser });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({
      success: false,
      message: "Error in signup",
      error: error.message,
    });
  }
};

export default SigninHandler;
