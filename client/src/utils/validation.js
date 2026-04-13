// ===============================
// 🔹 Common Validators
// ===============================

// Check empty
export const isEmpty = (value) => {
  return !value || value.toString().trim() === "";
};

// Email validation
export const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation (min 6 chars)
export const isStrongPassword = (password) => {
  return password && password.length >= 6;
};

// Number validation
export const isNumber = (value) => {
  return !isNaN(value);
};

// Range validation
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return num >= min && num <= max;
};



// ===============================
// 🔹 Auth Validation
// ===============================

// Signup validation
export const validateSignup = (data) => {
  const errors = {};

  if (isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!isEmail(data.email)) {
    errors.email = "Valid email is required";
  }

  if (!isStrongPassword(data.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

// Login validation
export const validateLogin = (data) => {
  const errors = {};

  if (!isEmail(data.email)) {
    errors.email = "Valid email is required";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return errors;
};



// ===============================
// 🔹 Prediction Validation
// ===============================

// Heart
export const validateHeart = (data) => {
  const errors = {};

  if (!isNumber(data.age) || !isInRange(data.age, 1, 120)) {
    errors.age = "Valid age required (1-120)";
  }

  if (!isNumber(data.cholesterol)) {
    errors.cholesterol = "Cholesterol must be a number";
  }

  if (!isNumber(data.bloodPressure)) {
    errors.bloodPressure = "Blood Pressure must be a number";
  }

  if (!isNumber(data.maxHeartRate)) {
    errors.maxHeartRate = "Max heart rate must be a number";
  }

  return errors;
};

// Stroke
export const validateStroke = (data) => {
  const errors = {};

  if (!isNumber(data.age)) {
    errors.age = "Age must be a number";
  }

  if (!isNumber(data.glucose)) {
    errors.glucose = "Glucose must be a number";
  }

  if (!isNumber(data.bmi)) {
    errors.bmi = "BMI must be a number";
  }

  return errors;
};

// Diabetes
export const validateDiabetes = (data) => {
  const errors = {};

  if (!isNumber(data.glucose)) {
    errors.glucose = "Glucose must be a number";
  }

  if (!isNumber(data.insulin)) {
    errors.insulin = "Insulin must be a number";
  }

  if (!isNumber(data.bmi)) {
    errors.bmi = "BMI must be a number";
  }

  return errors;
};

// Kidney
export const validateKidney = (data) => {
  const errors = {};

  if (!isNumber(data.creatinine)) {
    errors.creatinine = "Creatinine must be a number";
  }

  if (!isNumber(data.bloodUrea)) {
    errors.bloodUrea = "Blood Urea must be a number";
  }

  if (!isNumber(data.hemoglobin)) {
    errors.hemoglobin = "Hemoglobin must be a number";
  }

  return errors;
};

// Liver
export const validateLiver = (data) => {
  const errors = {};

  if (!isNumber(data.bilirubin)) {
    errors.bilirubin = "Bilirubin must be a number";
  }

  if (!isNumber(data.enzymes)) {
    errors.enzymes = "Enzymes must be a number";
  }

  if (!isNumber(data.proteins)) {
    errors.proteins = "Proteins must be a number";
  }

  return errors;
};



// ===============================
// 🔹 Helper
// ===============================

// Check if no errors
export const isValid = (errors) => {
  return Object.keys(errors).length === 0;
};