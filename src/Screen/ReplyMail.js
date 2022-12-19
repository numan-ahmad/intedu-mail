import Axios  from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Spinner } from 'react-bootstrap'
import { BiCheckbox } from 'react-icons/bi'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Leftbar } from '../Components/Leftbar'
import { LocContext } from '../Components/LocationContext'
import { Sidebar } from '../Components/Sidebar'
import { BsArchiveFill} from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import {RiSpamLine } from "react-icons/ri";
export const ReplyMail = () => {
    const {link}=useContext(LocContext)
    console.log(link,"mehona")
    // console.log("hh")
  

    const {search}=useLocation()
    const loc=new URLSearchParams(search).get("path")
    console.log(loc)
    const {id:mailId}=useParams()
    const [userMail,setUserMail]=useState({})
    const [loadingMail,setLoadingMail]=useState(false)


    useEffect(()=>{
        
   console.log(mailId)
   
        const Singlemail=(async()=>{
            setLoadingMail(true)
            try {
             
              const {data}=await Axios.get("http://admin.studentdesk.online/mail/get_email?1")
                if (!data) {
                    console.log(data)
                    
                    
                }else{
                    setLoadingMail(false)
                    console.log(data)
                    setUserMail(data)
                    
                }
                
            } catch (error) {
                
                setLoadingMail(false)
                console.log(error)
            }


        })
        Singlemail()
    },[mailId])

    // console.log(userMail.attachment_link[0])


  return (
    <main>
        <Sidebar/>
        <div className='Mainfull'>
        <div className='mainheader ReplyheadOpt'>
        {/* <div className='Checkboxdrpdown '> */}
          <Link className='Back' to="/main">
          <MdOutlineArrowBack/><span>Back</span>
          </Link>
          <div className='optionOnheaderOfReply'>
           <Link className='Back'>
            
        <BsArchiveFill/>
        <span>Archive</span>
          

           </Link>
           <Link Link className='Back'>

        <AiFillDelete/>
        <span>Delete</span>
           </Link>
           <Link Link className='Back'>
        <RiSpamLine/>
        <span>More</span>

           </Link>

          </div>
     
        {/* </div> */}
  
      </div>


        <div className='Reply'>
            {loadingMail&&(<Spinner animation="grow" />)}
          {userMail&&  
            (
            <div className='replymailinbox'>
                   <div> 

                {userMail.send_from}
                   </div>
                   <div> 
              <div>
                <p>{userMail.body}</p>
                </div>
                  
         {
         userMail.attachment_link&&( userMail.attachment_link.map((x)=>(
              <div className='replymailmain'>
            {/* <img className='mailimage' src={x&&`http://206.189.191.111${x}`} alt="no"></img> */}
            </div>
          )))
         }
                   </div>
                
                </div>
            

            )}

        </div>
        </div>
        {/* <Leftbar/> */}

    </main>
  )
}
