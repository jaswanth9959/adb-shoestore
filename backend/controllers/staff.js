import asyncHandler from "../middlewares/asyncHandler.js";
import Staff from "../models/staff.js";
const loginStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const staff = await Staff.findOne({ email });

  if (staff && (await staff.checkPassword(password))) {
    res.json({
      user: staff,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutStaff = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout staff" });
});

const getStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.find({});
  res.status(200).json(staff);
});

const getStaffById = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id).select("-password");
  res.status(200).json(staff);
});

const deleteStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (staff) {
    if (staff.role === "admin") {
      res.status(400);
      throw new Error("Cannot deleteStaff");
    }
    await Staff.deleteOne({ _id: staff._id });
    res.status(200).json({ message: "Staff deleted " });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id);

  if (staff) {
    staff.firstname = req.body.firstname || staff.firstname;
    staff.lastname = req.body.lastname || staff.lastname;
    staff.email = req.body.email || staff.email;
    staff.ssn = req.body.ssn || staff.ssn;
    staff.role = req.body.role || staff.role;
    staff.dob = req.body.dob || staff.dob;
    staff.phone = req.body.phone || staff.phone;
    const updateStaff = await staff.save();
    res.status(200).json({
      _id: updateStaff._id,
      firstname: updateStaff.firstname,
      lastname: updateStaff.lastname,
      email: updateStaff.email,
      ssn: updateStaff.ssn,
      role: updateStaff.role,
      dob: updateStaff.dob,
      phone: updateStaff.phone,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateStaffProfile = asyncHandler(async (req, res) => {
  const User = await Staff.findById(req.params.id);

  if (User) {
    User.firstname = req.body.firstname || User.firstname;
    User.lastname = req.body.lastname || User.lastname;
    User.email = req.body.email || User.email;
    User.ssn = req.body.ssn || User.ssn;
    User.dob = req.body.dob || User.dob;
    User.phone = req.body.phone || User.phone;

    if (req.body.password) {
      User.password = req.body.password;
    }

    const user = await User.save();

    res.json({
      user,
    });
  } else {
    res.status(404);
    throw new Error("staff not found");
  }
});

const registerStaff = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, ssn, phone, role, dob } =
    req.body;

  const staff = await Staff.create({
    firstname,
    lastname,
    email,
    password,
    role,
    ssn,
    phone,
    dob,
  });
  res.status(201).json({
    _id: staff._id,
    firstname: staff.firstname,
    lastname: staff.lastname,
    email: staff.email,
    role: staff.role,
    ssn: staff.ssn,
    phone: staff.phone,
    dob: staff.dob,
  });
});
export {
  loginStaff,
  logoutStaff,
  deleteStaff,
  getStaff,
  getStaffById,
  registerStaff,
  updateStaff,
  updateStaffProfile,
};
