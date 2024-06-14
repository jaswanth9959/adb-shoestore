import bcrypt from "bcryptjs";

const customers = [
  {
    firstname: "john",
    lastname: "doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    address: "main st",
    city: "lee",
    zip: "64064",
    phone: "1234567890",
    country: "usa",
  },
];
export default customers;
