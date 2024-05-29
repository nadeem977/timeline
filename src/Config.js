export const BASE_API_URL = "http://localhost:8000/api"
export const IMAGE_URL = "http://localhost:8000"






const isPasswordValid = (password) => {
    const specialCharacterRegex = /[!@#\$%\^&\*]/;
  if (!specialCharacterRegex.test(password)) {
    return { valid: false, message: "Password must contain at least one special character (!@#$%^&*)" };
  }

  // Check for at least one uppercase letter
  const uppercaseRegex = /[A-Z]/;
  if (!uppercaseRegex.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" };
  }

  // Check for at least one lowercase letter
  const lowercaseRegex = /[a-z]/;
  if (!lowercaseRegex.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" };
  }

  // Check for at least one digit
  const numberRegex = /\d/;
  if (!numberRegex.test(password)) {
    return { valid: false, message: "Password must contain at least one digit" };
  }

  // Check if the length is at least 8 characters
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }

  // If all conditions pass, the password is valid
  return { valid: true, message: "Password is valid" };
};



  export default isPasswordValid;