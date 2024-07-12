import User from "../../models/user.js";

const LoginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email, password });
    console.log(findUser);
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "check email and password it might be wrong",
      });
    }
    res.status(200).json({ success: true, findUser });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

export default LoginHandler;
