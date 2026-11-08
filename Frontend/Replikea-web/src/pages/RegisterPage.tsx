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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validateForm(){
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

    setError("");
    return true;
  }

  async function handleRegister(){
    if(!validateForm()){
      return;
    }

    setIsSubmitting(true);
    setError("");

    try{
       await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password
       })

      onBackToLogin(email.trim());

    }catch(err){
      setError(err instanceof Error ? err.message : "Something went wrong");
    }finally{
      setIsSubmitting(false);
    }
  }


  return (
    <main>
      <h1>Create Account</h1>
      <p>Join Replikea</p>

      <form 
        onSubmit={(event)=>{
          event.preventDefault();
          handleRegister();
        }}>
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
          type={showPassword? "text":"password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?"Hide":"Show"}</button>

        <button 
          type="submit"
          disabled={isSubmitting}
        >{isSubmitting?"Registering..":"Register"}</button>
        {error && <p>{error}</p>}
      </form>

      <button disabled={isSubmitting} onClick={()=>onBackToLogin("")}>Back to Login</button>
    </main>
  );
}

export default RegisterPage;
