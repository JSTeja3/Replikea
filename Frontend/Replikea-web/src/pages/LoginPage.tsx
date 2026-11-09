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

  async function handleLogin() {
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

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
      //FLOW 2: Validate Password
      if (!password.trim()) {
        setError("Please enter your password");
        return;
      }

      //FLOW 3: Login
      const data = await loginRequest({
        email: email,
        password: password,
      });

      //FLOW 4:Retrieve authentication token
      const sessionData = await getSession(data.accessToken);

      // FLOW 5: Update React authentication state
      login(data.accessToken, sessionData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            type="button"
            className={!showRegister ? "active" : ""}
            onClick={() => setShowRegister(false)}
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

              <button className="primary-button" onClick={handleLogin}>
                {showPasswordInput ? "Sign In to Workspace" : "Continue"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default LoginPage;
