const User = require("../models/User.js");

const getProfile=async (req,res)=>{

    try{
        const user=await User.findById(req.user.id).select("-password");

        //--if user not found

        if(!user){
            
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    
        }

         res.status(200).json({
      success: true,
      user,
    });

    }
    catch(err){
        console.log(err);
          res.status(500).json({
      success: true,
      message:"internal server error"
    });

    }
}

module.exports={getProfile};