//import firebase from './services/firebaseConnection';
import {BrowserRouter} from 'react-router-dom'
import AuthProvider from './contexts/auth';
import 'react-toastify/dist/ReactToastify.css'
import Routes from './routes'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer autoClose={3000}/>
        <Routes/>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
