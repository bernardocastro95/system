import {useState, useEffect} from 'react'
import Header from '../../components/Header'
import './dashboard.css'
import Title from '../../components/Title'
import {FiMessageSquare, FiPlus, FiSearch, FiEdit2} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import firebase from '../../services/firebaseConnection'
import {format} from 'date-fns'
import Extension from '../../components/Extension'


const listRef = firebase.firestore().collection('calls', 'desc').orderBy('created')
export default function Dashboard() {

    const [calls, setCalls] = useState([])
    const [load, setLoad] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [showPostExtension, setShowPostExtensio] = useState(false)
    const [details, setDetails] = useState()

    useEffect(() => {

      loadCalls()

      return() => {

      }
    }, [])

    async function loadCalls(){
      await listRef.limit(5)
      .get()
      .then((snapshot)=>{
        updateState(snapshot)
      })
      .catch((err)=>{
        console.log(err)
        setLoadingMore(false)
      })

      setLoad(false)
    }

    async function updateState(snapshot){
      const isCollectionEmpty = snapshot.size === 0

      if(!isCollectionEmpty){
        let list = []

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            topic: doc.data().topic,
            customer: doc.data().customer,
            customerId: doc.data().customerId,
            created: doc.data().created,
            createdFormat: format(doc.data().created.toDate(), 'mm/dd/yyyy'),
            status: doc.data().status,
            addOn: doc.data().addOn
          })
        })

        const lastDoc = snapshot.docs[snapshot.docs.length - 1]

        setCalls(calls => [...calls, ...list])
        setLastDocs(lastDoc)
      }
      else {
        setIsEmpty(true)
      }
      setLoadingMore(false)
    }

    async function handleMore(){
      setLoadingMore(true)
      await listRef.startAfter(lastDocs).limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot)
      })

    }

    function togglePostExtension(item){
      setShowPostExtensio(!showPostExtension)
      setDetails(item)
    }

    if(load){
      return(
        <div>
          <Header/>
            <div className="content">
              <Title name="Calls">
                <FiMessageSquare size={25}/>
              </Title>

              <div className='container dashboard'>
                <span>Searching for calls...</span>
              </div>
            </div>
        </div>
      )
    }

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
                   {calls.map((item, index) => {
                     return(
                      <tr key={index}>
                      <td data-label="Customer">{item.customer}</td>
                      <td data-label="Topic">{item.topic}</td>
                      <td data-label="Status">
                        <span className="badge" style={{backgroundColor: item.status === "open" ? '#5cb85c' : '#999'}}>{item.status}</span>
                      </td>
                      <td data-label="Registered">{item.createdFormat}</td>
                      <td data-label="#">
                        <button className="action" style={{backgroundColor: '#3583f6'}} onClick={() => togglePostExtension(item)}>
                          <FiSearch color="#FFF" size={17}/>
                        </button>
                        <Link className="action" style={{backgroundColor: '#f6a935'}} to={`/new/${item.id}`}>
                          <FiEdit2 color="#FFF" size={17}/>
                        </Link>
                      </td>
                    </tr>
                     )
                   })}       
               </tbody>
              </table>
              {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Searching Data...</h3>}
              {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>More Calls</button>}
               
            </>
          )}

       
        </div>

        {showPostExtension && (
          <Extension
            content={details}
            close={togglePostExtension}
          />
        )}
        
      </div>
    );
  }
  
  