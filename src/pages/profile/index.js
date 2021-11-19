import {useState, useContext} from 'react' 
import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiSettings, FiUpload} from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'

export default function Profile(){
    const {user, signOut} = useContext(AuthContext)

    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="My Profile">
                    <FiSettings size={25}/> 
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label className="avatar">
                            <span>
                                <FiUpload color="#fff" sizer={25}/>
                            </span>

                            <input type="file" accept="image/*"/>
                            {avatarUrl === null ? 
                                <img src={avatar} width="250" alt="Default Profile Picture"/>
                            : 
                                <img src={avatarUrl} width="250" alt="Default Profile Picture"/>
                            }
                        </label>


                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                        <label>Email</label>
                        <input type="text" value={email} disabled={true}/>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>

            <div className="container">
                <button className="logout-btn" onClick={() => signOut()}>Logout</button>
            </div>
        </div>
    )
}