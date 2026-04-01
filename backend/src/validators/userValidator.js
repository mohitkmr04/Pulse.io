import validator from "validator";

export const validateRegister = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return "All fields are required";
  }

  if (!validator.isEmail(email)) {
    return "Invalid email format";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null; // ✅ valid
};

export const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required";
  }

  if (!validator.isEmail(email)) {
    return "Invalid email format";
  }

  return null;
};