import { useState } from "react";

interface RegisterPageProps {
  onBackToLogin: () => void;
}

function RegisterPage({ onBackToLogin }: RegisterPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main>
      <h1>Create Account</h1>
      <p>Join Replikea</p>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="button">Register</button>
      </div>

      <button onClick={onBackToLogin}>Back to Login</button>
    </main>
  );
}

export default RegisterPage;
