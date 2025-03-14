import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
// import { generateToken } from "../lib/generateToken.js";
import jwt from "jsonwebtoken";
import Property from "../model/property.model.js";
import { generateToken } from "../lib/generateToken.js";
import { sendEmailToAdmin } from "../lib/emailGenerator.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All field are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const token = generateToken(newUser._id,res)
    
    await newUser.save();
    res.status(201).json({ message: "User registered successfully",token });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user._id,res)
    res.status(200).json({message:"Login successfully!",token})
    // if (user){
    //   generateToken(user._id)
    // }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logout successfully!" });
  } catch (error) {
    res.status(500).json({ message: "error in logout" });
  }
};

export const contact = async (req, res) => {
  try {
      const { name, subject, email, message } = req.body;

      // Validate required fields
      if (!name || !email || !message || !subject) {
          return res.status(400).json({ message: "All fields are required!" });
      }

      // If using nodemailer to send an email (Optional)
      await sendEmailToAdmin(name, subject, email, message);

      return res.status(200).json({ 
          success: true, 
          message: "Your message has been sent successfully!" 
      });

  } catch (error) {
      console.error("Error in contact form:", error);
      return res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again later." 
      });
  }
};
export const properties = async (req, res) => {
  try {
    const allproperty = await Property.find();
    res.json({ message: "properties data fetched", properties: allproperty });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const propertyId = async(req,res)=>{
  try {
    const prop = await Property.findById(req.params.id);

    if (!prop) {
      return res.status(404).json({ message: "Property Not Found " });
    }

    res.json(prop);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const addProperty = async (req, res) => {
  try {
    // const {
    //   title,
    //   type,
    //   address,
    //   bedrooms,
    //   bathrooms,
    //   areaSize,
    //   furnished,
    //   amenities,
    //   price,
    //   securityDeposit,
    //   img,
    //   description
    // } = req.body;

    // Basic validation
    // if (!title || !type || !address || !price ) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }

    const newProperty = new Property(req.body)
      // title,
      // type,
      // address, // Address should be an object { street, city, state, zip }
      // bedrooms,
      // bathrooms,
      // areaSize,
      // furnished,
      // amenities,
      // price,
      // securityDeposit,
      // img,
      // description);

    await newProperty.save();

    res.status(201).json({ message: "New property added successfully", property: newProperty });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// export const shit = async(req,res)=>{
//     res.json({message:"welcome to dashboard",user:req.user})
// }
