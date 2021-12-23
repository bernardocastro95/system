import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiPlusCircle} from 'react-icons/fi'
import './new.css'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import firebase from '../../services/firebaseConnection'
import {toast} from 'react-toastify'
export default function New(){

    const [loadCustomer, setLoadCustomers] = useState(true)
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(0)

    const [topic, setTopic] = useState('Support')
    const [status, setStatus] = useState('open')
    const [addOn, setAddOn] = useState('')
    const {user} = useContext(AuthContext)

    useEffect(()=> {
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot)=>{
                let list = []

                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        companyName: doc.data().companyName
                    })
                })

                if(list.length === 0) {
                    console.log('NO COMPANY WAS FOUND')
                    setCustomers([{id: '1', companyName: 'FREELA'}])
                    setLoadCustomers(false)
                    return
                }
                setCustomers(list)
                setLoadCustomers(false)
            })
            .catch((error)=>{
                console.log('Error')
                setLoadCustomers(false)
                setCustomers([{id: 1, companyName: ''}])
            })
        }
        loadCustomers()
    }, [])

    async function handleRegister(e){
        e.preventDefault()
        
        await firebase.firestore().collection('calls')
        .add({
            created: new Date(),
            customer: customers[customerSelected].companyName,
            customerId: customers[customerSelected].id,
            topic: topic,
            status: status,
            addOn: addOn,
            userId: user.uid
        })
        .then(() => {
            toast.success('Call Registered')
            setAddOn('')
            setCustomerSelected(0)
            
        })
        .catch((err) => {
            toast.error('Error on registering call. Try again later !')
            console.log(err)
        })
    }

    function handleChangeSelect(e){
        setTopic(e.target.value)
    }
    function handleOptionChange(e){
        setStatus(e.target.value)
    }
    function handleChangeCustomers(e){
        setCustomerSelected(e.target.value)
    }
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="New Call">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Customer</label>

                        {loadCustomer ? (
                            <input type="text" disabled={true} value="Loading Customers"/>
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                            {customers.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.companyName}
                                    </option>
                                )
                            })}
                        </select>
                        )}
                        
                        <label>Topic</label>
                        <select value= {topic} onChange={handleChangeSelect}>
                            <option value="Support">Support</option>
                            <option value="Technician">Technician</option>
                            <option value="Finance">Finance</option>
                        </select>
                        <label>Status</label>
                        <div className="status">
                            <input 
                            type="radio"
                            name="radio"
                            value="open"
                            onChange={handleOptionChange}
                            checked={status === "open"}
                            />
                            <span>Opened</span>
                            <input 
                            type="radio"
                            name="radio"
                            value="progress"
                            onChange={handleOptionChange}
                            checked={status === "progress"}
                            />
                            <span>In Progress</span>
                            <input 
                            type="radio"
                            name="radio"
                            value="finished"
                            onChange={handleOptionChange}
                            checked={status === "finished"}
                            />
                            <span>Finished</span>
                        </div>

                        <label>Add-on</label>
                        <textarea type="text"
                        placeholder="Describe your issue (optional)"
                        value={addOn}
                        onChange={(e) => setAddOn(e.target.value)}/>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}