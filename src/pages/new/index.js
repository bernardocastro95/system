import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiPlusCircle} from 'react-icons/fi'
import './new.css'
import { useState } from 'react'
export default function New(){

    const [topic, setTopic] = useState('Support')
    const [status, setStatus] = useState('open')
    const [addOn, setAddOn] = useState('')

    function handleRegister(e){
        e.preventDefault()
        alert('TEST')
    }

    function handleChangeSelect(e){
        setTopic(e.target.value)
    }
    function handleOptionChange(e){
        setStatus(e.target.value)
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
                        <select>
                            <option key={1} value={1}>
                                Bernardo Castro
                            </option>
                        </select>
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