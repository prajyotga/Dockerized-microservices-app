const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//-----------TO REGISTER THE USER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check all fields entered or not
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const exisitingUser = await User.findOne({ email });

    console.log(exisitingUser);

    // check wheteher user exists
    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already exists",
      });
    }

    //hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    //create a user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created succesfull",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      user,
    });
  }
};


//-----------LOGIN ROUTE
const login = async (req, res) => {
  try {
    const { name, email,password } = req.body;

    //check if user exists

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //compare passwords

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password or username is wrong",
      });
    }

    //Generetae jwt token

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    //Store cookie 

    res.cookie("token",token,{
        httpOnly:true,
    })

    res.status(200).json({
        success: true,
      message: "Login Successful",
      token,
    })


  } catch (err) {

    console.log(err);

    res.status(500).json({
        success: false,
      message: "Internal server error",
      token,
    })
  }
};

module.exports = { register,login };
