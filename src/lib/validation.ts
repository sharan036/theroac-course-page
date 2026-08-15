/**
 * Form validation utilities
 * Provides comprehensive client-side validation for auth forms
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const NAME_MIN_LENGTH = 2;

/**
 * Validate email format
 */
export function validateEmail(email: string): string | null {
  if (!email || !email.trim()) {
    return "Email is required";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required";
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  return null;
}

/**
 * Validate full name
 */
export function validateFullName(name: string): string | null {
  if (!name || !name.trim()) {
    return "Full name is required";
  }
  if (name.trim().length < NAME_MIN_LENGTH) {
    return `Full name must be at least ${NAME_MIN_LENGTH} characters`;
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return "Full name can only contain letters, spaces, hyphens, and apostrophes";
  }
  return null;
}

/**
 * Validate login form
 */
export function validateLoginForm(email: string, password: string): ValidationResult {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  if (!password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validatePhone(phone: string): string | null {
  if (!phone || !phone.trim()) {
    return "Phone number is required";
  }
  if (!/^\+?[0-9\s\-()]+$/.test(phone)) {
    return "Please enter a valid phone number";
  }
  return null;
}


/**
 * Validate signup form
 */
export function validateSignupForm(
  fullName: string,
  email: string,
  password: string,
  phone: string
): ValidationResult {
  const errors: Record<string, string> = {};

  const nameError = validateFullName(fullName);
  if (nameError) errors.fullName = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const phoneError = validatePhone(phone);
  if (phoneError) errors.phone = phoneError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
