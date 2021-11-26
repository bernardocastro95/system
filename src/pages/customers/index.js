import './customer.css'
import Title from '../../components/Title'
import Header from '../../components/Header'

import {FiUser} from 'react-icons/fi'
import { useState } from 'react'

export default function Customers(){

    const [companyName, setCompanyName] = useState('')
    const [registerNumber, setRegisterNumber] = useState('')
    const [address, setAddress] = useState('')

    function handleAddCompany(e){
        e.preventDefault()
        alert('TEST')
    }

    return(
        <div>
           <Header/>
           <div className="content">
               <Title name="Customers">
                   <FiUser size={25}/>
               </Title>

               <div className="container">
                   <form className="form-profile customers" onSubmit={handleAddCompany}>
                       <label>Company's name</label>
                       <input type="text" placeholder="Your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                       <label>Register Number</label>
                       <input type="text" placeholder="XXX.XXX.XXX" value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)}/>
                       <label>Address</label>
                       <input type="text" placeholder="Your company address" value={address} onChange={(e) => setAddress(e.target.value)}/>

                       <button type="submit">Register</button>
                   </form>
               </div>
           </div>
        </div>
    )
}