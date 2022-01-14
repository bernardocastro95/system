import './extension.css'
import {FiX} from 'react-icons/fi'

export default function Extension({content, close}){
    return(
        <div className='extension'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={23} color="#FFF"/>
                    Back
                </button>

                <div>
                    <h2>Call Details</h2>
                    <div className='row'>
                        <span>
                            Customer: <i>{content.customer}</i>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Topic: <i>{content.topic}</i>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Registered: <i>{content.createdFormated}</i>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Status: <i style={{color: "#FFF", backgroundColor: content.status === 'Open' ? '#5cb85c' : '#999'}}>{content.status}</i>
                        </span>
                    </div>

                    {content.addOn !== '' && (
                        <>
                        <h3>Add-On</h3>
                        <p>{content.addOn}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}