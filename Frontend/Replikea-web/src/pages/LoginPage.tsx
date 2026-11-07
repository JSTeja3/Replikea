import { useState } from "react";
import { useAuth } from "../context/useAuth";
import RegisterPage from "./RegisterPage";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const [showRegister, setShowRegister] = useState(false);

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
      if (!showPassword) {
        const response = await fetch(
          "http://localhost:5031/api/auth/check-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Unable to check email");
        }

        const data = await response.json();

        if (data.requiresPassword) {
          setShowPassword(true);
        }

        return;
      }
      //FLOW 2: Validate Password
      if (!password.trim()) {
        setError("Please enter your password");
        return;
      }

      const response = await fetch("http://localhost:5031/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      const sessionResponse = await fetch(
        "http://localhost:5031/api/auth/session",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          }
        }
      );

      if (!sessionResponse.ok) {
        throw new Error("Unable to establish authenticated session");
      }

      const sessionData = await sessionResponse.json();

      login(data.accessToken, sessionData);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if(showRegister){
    return <RegisterPage onBackToLogin={()=>setShowRegister(false)}></RegisterPage>
  }

  return (
    <main>
      <h1>Sign In</h1>
      <p>Welcome Back to Replikea</p>

      <label>Work Email:</label>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={showPassword}
      />

      {showPassword && (
        <div>
          <label>Password:</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      )}

      <button onClick={handleLogin}>{showPassword?"Login":"Continue"}</button>
      <p>
        Don't have an account?{" "}
        <button onClick={() => setShowRegister(true)}>Create Account</button>
      </p>

      {error && <p>{error}</p>}
      <p>Your email: {email}</p>
    </main>
  );
}

export default LoginPage;
