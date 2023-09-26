const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Admin = require("../../model/adminLogin");
const jwt = require("jsonwebtoken")

// CREATE

module.exports.signup = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ email, password: hashedPassword, role });
  try {
    await newAdmin.save();
    res.status(201).send(newAdmin);
  } catch (err) {
    res.status(400).send(err);
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if a user with the given employeeId exists in the database
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "admin not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    // Send a response indicating that the user was successfully logged in
    res.setHeader("x-api-key", /* "Bearer "*/ +token);
    return res.status(200).json({
      message: "ADMIN logged in successfully",
      token,
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllAdmin = async (req, res) => {
  try {
    const audits = await Admin.find();
    res.status(200).json({ success: true, data: audits });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};



// UPDATE
module.exports.updateadmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!admin) {
      return res.status(404).send();
    }
    return res.send(admin);
  } catch (err) {
    res.status(400).send(err);
  }
}

// DELETE
module.exports.deleteadmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).send();
    }
    return res.send(admin);
  } catch (err) {
    return res.status(500).send(err);
  }
}

// // LOGIN
// router.post("/admin/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).send("Invalid email or password");
//     }
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).send("Invalid email or password");
//     }
//    return  res.send("Logged in successfully");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// module.exports = router;
