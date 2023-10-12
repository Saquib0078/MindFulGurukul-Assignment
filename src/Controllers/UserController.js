const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../Models/UserModel");
const AddNewUser = require("../Models/AddUserModel");
const Register = async (req, res) => {
  try {
    await Promise.all([
      body("name")
        .isAlpha()
        .withMessage("Name must contain only alphabets")
        .run(req),
      body("email").isEmail().withMessage("Invalid email format").run(req),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .run(req),
      body("phone")
        .isNumeric()
        .withMessage("Phone must contain only numbers")
        .run(req),
      body("gender")
        .isIn(["Male", "Female", "Others"])
        .withMessage("Invalid gender")
        .run(req),
      body("howDidYouHear")
        .isIn(["LinkedIn", "Friends", "Job Portal", "Others"])
        .withMessage("Invalid howDidYouHear format")
        .run(req),
      body("city")
        .isIn(["Mumbai", "Pune", "Ahmedabad"])
        .withMessage("Invalid city")
        .run(req),
      body("state")
        .isIn(["Gujarat", "Maharashtra", "Karnataka"])
        .withMessage("Invalid state")
        .run(req),
    ]);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, gender, howDidYouHear, city, state } =
      req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      howDidYouHear,
      city,
      state,
    });
    await user.save();

    res
      .status(201)
      .json({ status: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  try {
    await Promise.all([
      body("email").isEmail().withMessage("Invalid email format").run(req),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .run(req),
    ]);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const AddUser = async (req, res) => {
  try {
    await Promise.all([
      body("email").isEmail().withMessage("Invalid email format").run(req),
      body("username")
        .isAlpha()
        .withMessage("Invalid username format")
        .run(req),
      body("mobile")
        .isNumeric()
        .isLength({ max: 10 })
        .withMessage("Mobile must be at least 10 characters long")
        .run(req),
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, username, mobile } = req.body;
    const existingUser = await AddNewUser.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email or mobile already exists" });
    }
    const Newuser = new AddNewUser({
      username,
      email,
      mobile,
    });
    await Newuser.save();
    res
      .status(200)
      .json({ status: true, message: "User Created Successfully" ,userId:Newuser._id});
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, username, mobile } = req.body;

    const updateFields = {};

    if (email) {
      await body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .run(req);
      updateFields.email = email;
    }

    if (username) {
      await body("username")
        .isAlpha()
        .withMessage("Invalid username format")
        .run(req);
      updateFields.username = username;
    }

    if (mobile) {
      await body("mobile")
        .isNumeric()
        .isLength({ max: 10 })
        .withMessage("Mobile must be at least 10 characters long")
        .run(req);
      updateFields.mobile = mobile;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await AddNewUser.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await AddNewUser.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const enumvalues=async(req,res)=>{
  try {
    const enumValues = {
      gender: User.schema.path('gender').enumValues,
      howDidYouHear: User.schema.path('howDidYouHear').enumValues,
      city: User.schema.path('city').enumValues,
      state: User.schema.path('state').enumValues,
    };

    res.json( {enumValues});
  } catch (error) {
    res.json({message:error.message})
  }
}


const getUser=async(req,res)=>{
try {

const user=await AddNewUser.find({ isDeleted: false })
if(!user){
  return res.status(404).json({ message: 'User not found' });
}
res.json({status:true,data:user});
} catch (error) {
  return res.status(500).json({ message: error.message });

}

}

const getUserbyId=async(req,res)=>{
  try {
    const userId = req.params.id
    console.log(userId)
  const user=await AddNewUser.findById(userId,{ isDeleted: false })
  if(!user){
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({status:true,data:user});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  
  }
  
  }
module.exports.Register = Register;
module.exports.Login = Login;
module.exports.AddUser = AddUser;
module.exports.UpdateUser = UpdateUser;
module.exports.DeleteUser = DeleteUser;
module.exports.enumvalues = enumvalues;
module.exports.getUser = getUser;
module.exports.getUserbyId = getUserbyId;
