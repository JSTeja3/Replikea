import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import RegisterPage from "./RegisterPage";
import {
  checkEmail,
  login as loginRequest,
  getSession,
} from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (showPasswordInput && !password.trim()) {
      setError("Please enter your password");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      //FLOW 1: Check email
      if (!showPasswordInput) {
        const data = await checkEmail({
          email: email,
        });

        if (data.requiresPassword) {
          setShowPasswordInput(true);
        }

        return;
      }

      //FLOW 2: Login
      const data = await loginRequest({
        email: email,
        password: password,
      });

      //FLOW 3: Retrieve authentication token
      const sessionData = await getSession(data.accessToken);

      // FLOW 4: Update React authentication state
      login(data.accessToken, {
        userId: sessionData.userId,
        firstName: sessionData.firstName,
        lastName: sessionData.lastName,
        email: sessionData.email,
        role: sessionData.role,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <img src="/replikea-logo.png" alt="Replikea" />
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={!showRegister ? "active" : ""}
            onClick={() => {
              setShowRegister(false);
              setShowPasswordInput(false);
              setPassword("");
              setShowPassword(false);
              setError("");
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            className={showRegister ? "active" : ""}
            onClick={() => setShowRegister(true)}
          >
            Create Account
          </button>
        </div>

        {showRegister ? (
          <RegisterPage
            onBackToLogin={(registeredEmail) => {
              setEmail(registeredEmail);
              setShowPasswordInput(false);
              setPassword("");
              setError("");
              setShowRegister(false);
              setShowPassword(false);
            }}
          />
        ) : (
          <>
            <div className="auth-header">
              <h1>Sign in to Replikea</h1>
              <p>Welcome back. Access your enterprise workspace.</p>
            </div>

            <div className="auth-form">
              <div className="form-group">
                <label htmlFor="login-email">Work Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={showPasswordInput}
                  placeholder="Enter your work email"
                />
              </div>

              {showPasswordInput && (
                <div className="form-group">
                  <label htmlFor="login-password">Password</label>

                  <div className="password-wrapper">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>
              )}

              {error && <p className="auth-error">{error}</p>}

              <button
                className="primary-button"
                onClick={handleLogin}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Signing in..."
                  : showPasswordInput
                    ? "Sign In to Workspace"
                    : "Continue"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default LoginPage;
