import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { BASE_URL } from './utils/constants'
import axios from 'axios'
const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchUser = async()=>{
    try{
    const result = await axios.get(BASE_URL + "/profile",{withCredentials: true})
    dispatch(addUser(result.data))
    }
    catch(err){
      if(err.status >= 400){
        return navigate("/")
      }
    }
  }
  useEffect(()=>{
    fetchUser()},[])
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body