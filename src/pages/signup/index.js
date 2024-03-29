import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'
import logo from '../../assets/logo.png'
import {AuthContext} from '../../contexts/auth'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const {signUp, loadingAuth} = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault();
    
    if(name !== '' && email !== '' && password !== '') {
      signUp(email, password, name)
    }
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
            <button type="submit">{loadingAuth ? 'Loading...' : 'Signup'}</button>
          </form>

          <Link to="/">Login</Link>
        </div>
      </div>
    );
  }
  
  export default Signup;
  