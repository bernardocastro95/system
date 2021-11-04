import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import logo from '../../assets/logo.png'
import  {AuthContext} from '../../contexts/auth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signIn, loadingAuth} = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault()
    if(email !== '' && password !== ''){
      signIn(email, password)
    }
    
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
            <button type="submit">{loadingAuth ? 'Loading...' : 'Login'}</button>
          </form>

          <Link to="/register">Sign-Up</Link>
        </div>
      </div>
    );
  }
  
  export default Login;
  