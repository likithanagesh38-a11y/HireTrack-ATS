const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const upload = require("../middleware/upload");
const User = require("../models/User");

console.log("NEW AUTH FILE LOADED");


// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;


    const existingUser = await User.findOne({
      email
    });


    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const user = new User({

      name,
      email,
      password: hashedPassword,
      role

    });


    await user.save();


    res.status(201).json({

      message: "User registered successfully"

    });


  } catch(error) {


    res.status(500).json({

      message: error.message

    });


  }

});




// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    console.log("Email entered:", email);
    console.log("Password entered:", password);

    const user = await User.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "1d",
      }
    );

    console.log("JWT TOKEN CREATED");

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        skills: user.skills || "",
        resume: user.resume || "",
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }

});





// ================= UPDATE PROFILE =================


router.put("/profile/:id", async (req,res)=>{


  try{


    const {

      name,

      email,

      phone,

      skills

    } = req.body;



    const updatedUser =
      await User.findByIdAndUpdate(

        req.params.id,


        {

          name,

          email,

          phone,

          skills

        },


        {
          new:true
        }


      );



    if(!updatedUser){


      return res.status(404).json({

        message:"User not found"

      });


    }



    res.status(200).json({


      message:"Profile updated successfully",


      user:{

        _id:updatedUser._id,

        name:updatedUser.name,

        email:updatedUser.email,

        phone:updatedUser.phone,

        skills:updatedUser.skills,

        resume:updatedUser.resume,

        role:updatedUser.role

      }


    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});






// ================= UPLOAD RESUME =================


router.post(

  "/upload-resume/:id",

  upload.single("resume"),


  async(req,res)=>{


    try{


      if(!req.file){


        return res.status(400).json({

          message:"Please upload resume"

        });


      }



      const user =
        await User.findByIdAndUpdate(


          req.params.id,


          {

            resume:req.file.path

          },


          {

            new:true

          }


        );



      if(!user){


        return res.status(404).json({

          message:"User not found"

        });


      }



      res.status(200).json({


        success:true,


        message:"Resume uploaded successfully",


        resume:user.resume


      });



    }catch(error){


      res.status(500).json({

        message:error.message

      });


    }


  }

);





// ================= TEST ROUTE =================


router.get("/hello",(req,res)=>{


  res.send("AUTH ROUTE WORKING");


});



console.log("UPLOAD ROUTE REGISTERED");


module.exports = router;