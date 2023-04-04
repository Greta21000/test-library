import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

function App() {
  const [error, setError] = useState("");
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    console.log({e})
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    })
  }


  const handleValidation = (e) => {
    e.preventDefault();
    console.log("event", {signupInput});
    setError("");
    // !isEmail(email) ? setError("email invalid") : setError("");
    if(!isEmail(signupInput.email)){
      return setError("email invalid")
    }
    console.log({error});
    if(signupInput.password.length<5){
      return setError("le mot de passe doit contenir au moins 5 caractères")
    }
    if(signupInput.password !== signupInput.confirmPassword){
      setError("le mot de passe et sa confirmation ne sont pas identiques")
    }
    console.log({error});
  }

  return (
    <div className='container my-5' >
      <form onSubmit={handleValidation}>
        <div className='mb-3'>
          <label htmlFor="email" className='form-label' >Email</label>
          <input id="email" name="email" type="text" className='form-control'
          value={signupInput.email}
          onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="password" className='form-label' >Password</label>
          <input id="password" name="password" type="password" className='form-control'
                    value={signupInput.password}
                    onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="confirmPassword" className='form-label' >Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" className='form-control'
                              value={signupInput.confirmPassword}
                              onChange={(e) => handleChange(e)}
          />
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button type="submit" >Valider</button>
      </form>
    </div>
  );
}

export default App;