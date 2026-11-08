import { useState } from "react";
import { useAuth } from "../context/useAuth";
import RegisterPage from "./RegisterPage";
import { checkEmail, login as loginRequest, getSession } from  "../services/authService"


function LoginPage() {
  const [email, setEmail] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
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
          email:email
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
        email:email,
        password:password
      });

      //FLOW 4:Retrieve authentication token
      const sessionData = await getSession(data.accessToken);

      // FLOW 5: Update React authentication state
      login(data.accessToken, sessionData);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if(showRegister){
    return <RegisterPage 
    onBackToLogin={(registeredEmail)=>{
      setEmail(registeredEmail);
      setShowPasswordInput(false);
      setPassword("");
      setError("");
      setShowRegister(false);
    }}></RegisterPage>
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
        disabled={showPasswordInput}
      />

      {showPasswordInput && (
        <div>
          <label>Password:</label>

          <input
            type={showPassword? "text":"password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?"Hide":"Show"}</button>
        </div>
      )}

      <button onClick={handleLogin}>{showPasswordInput?"Login":"Continue"}</button>
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
