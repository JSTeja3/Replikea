import { useState } from 'react'

function LoginPage(){
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    function handleContinue(){
        if(!email.trim()){
            setError('Please enter your email')
            return
        }
        if(!email.includes('@')){
            setError('Please enter a valid email address');
            return
        }

        setError('');
        setShowPassword(true);
    }

    return(
        <main>
            <h1>Sign In</h1>
            <p>Welcome Back to Replikea</p>

            <label>
                Work Email:
            </label>
            <input 
                type="email"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
            />

            {showPassword && (
                <div>
                    <label>
                        Password:
                    </label>

                    <input 
                        type="password"
                    />
                </div>
            )}
            

            <button onClick = {handleContinue}>Continue</button>

            {error && (<p>{error}</p>)}
            <p>Your email: {email}</p>
        </main>
    )
}

export default LoginPage