import {useState} from 'react'
import Header from '../../components/Header'
import './dashboard.css'
import Title from '../../components/Title'
import {FiMessageSquare, FiPlus, FiSearch, FiEdit2} from 'react-icons/fi'
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
               <span>No Call Registered...</span>
   
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

               <table>
                 <thead>
                   <tr>
                     <th scope="col">Customer</th>
                     <th scope="col">Topic</th>
                     <th scope="col">Status</th>
                     <th scope="col">Register Date</th>
                     <th scope="col">#</th>
                   </tr>
                 </thead>
                 <tbody>
                 <tr>
                   <td data-label="Customer">Subject</td>
                   <td data-label="Topic">Support</td>
                   <td data-label="Status">
                     <span className="badge" style={{backgroundColor: '#5cb85c'}}>Current</span>
                   </td>
                   <td data-label="Registered">12/09/2021</td>
                   <td data-label="#">
                     <button className="action" style={{backgroundColor: '#3583f6'}}>
                       <FiSearch color="#FFF" size={17}/>
                     </button>
                     <button className="action" style={{backgroundColor: '#f6a935'}}>
                       <FiEdit2 color="#FFF" size={17}/>
                     </button>
                   </td>
                 </tr>
               </tbody>
              </table>
               
            </>
          )}

       
        </div>
        
      </div>
    );
  }
  
  