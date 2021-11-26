import {useState, useContext} from 'react' 
import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiSettings, FiUpload} from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

export default function Profile(){
    const {user, signOut, setUser, storageUser} = useContext(AuthContext)

    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(e){
        if(e.target.files[0]){
            const img = e.target.files[0]

            if(img.type === 'image/jpeg' || img.type === 'image/png'){
                setImageAvatar(img)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }
            else {
                toast.error('Image type not supported')
                setImageAvatar(null)
                return null
            }
        }
    }

    async function handleUpload(){
        const current = user.uid

        const uploadTask = await firebase.storage()
        .ref(`images/${current}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async ()=>{
            toast.success('Photo Uploaded')

            await firebase.storage().ref(`images/${current}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url)=>{
                let urlPhoto = url

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlPhoto,
                    name: name
                })
                .then(()=> {
                    let data = {
                        ...user,
                        avatarUrl: urlPhoto,
                        name: name
                    }
                    setUser(data)
                    storageUser(data)
                })
            })
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(imageAvatar === null && name !== ''){
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                name: name
            })
            .then(()=>{
                let data = {
                    ...user,
                    name: name
                }
                setUser(data)
                storageUser(data)
                toast.success('Saved successfully')
            })
            .catch(()=>{

            })
        }
        else if(name !== '' && imageAvatar !== null){
            handleUpload()
        }
    }
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="My Profile">
                    <FiSettings size={25}/> 
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="avatar">
                            <span>
                                <FiUpload color="#fff" sizer={25}/>
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile}/>
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