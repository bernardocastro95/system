import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from'../services/firebaseConnection'

export const AuthContext = createContext({})

function AuthProvider({children}){

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {

        function loadStorage(){
            const storageUser = localStorage.getItem('UserSystem')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }
        loadStorage()
    }, [])

    async function signIn(email, password){
        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value)=> {
            let uid = value.user.uid

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get()

            let data = {
                uid: uid,
                name: userProfile.data().name,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Welcome to the platform')
        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
            toast.error('Something went wrong')
        })
    }

    async function signUp(email, password, name){
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid

            await firebase.firestore().collection('users')
            .doc(uid).set({
                name: name,
                avatarUrl: null
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success('Welcome to the platform')
            })
        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
            toast.error('Something went wrong')
        })
    }
    

    function storageUser(data){
        localStorage.setItem('UserSystem', JSON.stringify(data))
    }

    async function signOut(){
        await firebase.auth().signOut()
        localStorage.removeItem('UserSystem')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user, 
            user, 
            loading, 
            signUp,
            signOut,
            signIn,
            loadingAuth,
            setUser,
            storageUser
            }}>

            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;