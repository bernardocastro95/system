import {useContext} from 'react'

import {AuthContext} from '../../contexts/auth'

function Dashboard() {
  const {signOut} = useContext(AuthContext)
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={()=> signOut()}>Sign Out</button>
      </div>
    );
  }
  
  export default Dashboard;
  