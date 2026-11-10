import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { register } from "../services/authService";

interface RegisterPageProps {
  onBackToLogin: (registeredEmail: string) => void;
}

function RegisterPage({ onBackToLogin }: RegisterPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function getPasswordStrength(password: string) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score === 3) return "Fair";
    if (score === 4) return "Good";
    return "Strong";
  }

  function validateForm() {
    if (!firstName.trim()) {
      setError("Please enter your first name");
      return false;
    }

    if (!lastName.trim()) {
      setError("Please enter your last name");
      return false;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return false;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError("");
    return true;
  }

  async function handleRegister() {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password,
      });

      onBackToLogin(email.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="auth-header">
        <h1>Create your Replikea Account</h1>
        <p>Set up your enterprise account to get started.</p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleRegister();
        }}
      >
        <div className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Work Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your work email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <div className="password-wrapper">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {password && (
              <div className="password-strength">
                <span>Password strength:</span>
                <strong className={getPasswordStrength(password).toLowerCase()}>
                  {getPasswordStrength(password)}
                </strong>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Re-enter your password"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
