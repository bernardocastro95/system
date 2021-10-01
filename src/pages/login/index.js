import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import logo from '../../assets/logo.png'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
            <h1>Enter</h1>
            <input type="text" placeholder="mail@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
          </form>

          <Link to="/register">Sign-Up</Link>
        </div>
      </div>
    );
  }
  
  export default Login;
  