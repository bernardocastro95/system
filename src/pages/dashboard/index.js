import {useState} from 'react'
import Header from '../../components/Header'
import './dashboard.css'
import Title from '../../components/Title'
import {FiMessageSquare, FiPlus} from 'react-icons/fi'
import {Link} from 'react-router-dom'

export default function Dashboard() {

    const [calls, setCalls] = useState([])

    return (
      <div>
        <Header/>
        <div className="content">
          <Title name="Calls">
            <FiMessageSquare size={25}/>
          </Title>

          {calls.length === 0 ? (
               <div className="container dashboard">
               <span>No call Registered...</span>
   
               <Link to="/new" className="new ">
               <FiPlus sizer={25} color="#fff"/>
                 New Call
               </Link>
             </div>
          ): (
            <>
               <Link to="/new" className="new ">
                <FiPlus sizer={25} color="#fff"/>
                   New Call
               </Link>
            </>
          )}

       
        </div>
        
      </div>
    );
  }
  
  