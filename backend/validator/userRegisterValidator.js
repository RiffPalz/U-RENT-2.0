import {
  validatePassword,
  validateEmail,
  validatePhone,
} from "./userValidator.js";

export const userRegisterValidator = (req, res, next) => {
  const {
    userID,
    fullName,
    email,
    contactNumber,
    unitNumber,
    numberOfTenants,
    userName,
    password,
  } = req.body;

  // REQUIRED FIELDS
  if (!userID) return res.status(400).json({ message: "User ID is required" });
  if (!fullName) return res.status(400).json({ message: "Full name is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!userName) return res.status(400).json({ message: "Username is required" });
  if (!password) return res.status(400).json({ message: "Password is required" });
  if (!unitNumber) return res.status(400).json({ message: "Unit number is required" });

  // EMAIL
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // PASSWORD
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ message: passwordError });
  }

  // PHONE NUMBER (OPTIONAL)
  if (contactNumber && !validatePhone(contactNumber)) {
    return res.status(400).json({
      message: "Invalid Philippine phone number",
    });
  }

  // NUMBER OF TENANTS
  if (numberOfTenants && Number(numberOfTenants) < 1) {
    return res.status(400).json({
      message: "Number of tenants must be at least 1",
    });
  }

  next();
};
