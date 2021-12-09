import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiPlusCircle} from 'react-icons/fi'
import './new.css'
export default function New(){
    function handleRegister(e){
        e.preventDefault()
        alert('TEST')
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
                        <select>
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
                            />
                            <span>Opened</span>
                            <input 
                            type="radio"
                            name="radio"
                            value="progress"
                            />
                            <span>In Progress</span>
                            <input 
                            type="radio"
                            name="radio"
                            value="finished"
                            />
                            <span>Finished</span>
                        </div>

                        <label>Add-on</label>
                        <textarea type="text"
                        placeholder="Describe your issue (optional)"/>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}