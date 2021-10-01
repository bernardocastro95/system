import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'
import logo from '../../assets/logo.png'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  function handleSubmit(e){
    e.preventDefault();
    alert('Click')
  }
    return (
      <div className="container-center">
        <div className="login">
          <div className="logo-area">
            <img src={logo} alt="system-logo"/>
          </div>

          <form onSubmit={handleSubmit}>
            <h1>Create an account</h1>
            <input type="text" placeholder="Your name here" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="mail@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Signup</button>
          </form>

          <Link to="/">Login</Link>
        </div>
      </div>
    );
  }
  
  export default Signup;
  