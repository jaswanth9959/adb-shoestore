import asyncHandler from "../middlewares/asyncHandler.js";
import Customer from "../models/customer.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    zip,
    country,
    dob,
    phone,
  } = req.body;

  const userExists = await Customer.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Customer already exists");
  }

  const user = await Customer.create({
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    zip,
    country,
    dob,
    phone,
  });

  if (user) {
    //   const token = jwt.sign(
    //     { userID: user._id, role: user.role },
    //     process.env.SECRET,
    //     {
    //       expiresIn: "30d",
    //     }
    //   );

    //   res.cookie("jwt", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    //     sameSite: "strict", // Prevent CSRF attacks
    //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    //   });

    res.status(201).json({
      user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Customer data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Customer.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    // const token = jwt.sign(
    //   { userID: user._id, role: user.role },
    //   process.env.SECRET,
    //   {
    //     expiresIn: "30d",
    //   }
    // );

    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    //   sameSite: "strict", // Prevent CSRF attacks
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // });

    res.json({
      user,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  // res.cookie("jwt", "", {
  //   httpOnly: true,
  //   expires: new Date(0),
  // });
  res.status(200).json({ message: "logout user" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Customer.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      phone: user.phone,
      dob: user.dob,
      address: user.address,
      city: user.city,
      zip: user.zip,
      country: user.country,
    });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Customer.findById(req.params.id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.pin = req.body.pin || user.pin;
    user.country = req.body.country || user.country;
    user.dob = req.body.dob || user.dob;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      user: updatedUser,
    });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await Customer.find({});
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id).select("-password");
  res.status(200).json(customer);
});

export {
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUserById,
  getUsers,
};
