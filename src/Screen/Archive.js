import Axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { BsArchiveFill } from 'react-icons/bs';
import { MdOutlineArrowBack } from 'react-icons/md';
import { RiSpamLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Sidebar } from '../Components/Sidebar';
import { LocContext } from '../Components/LocationContext';
import { BsInbox } from 'react-icons/bs';

export const Archive = () => {
  const { userInfo } = useContext(LocContext);
  const [emails, setemails] = useState([]);
  const [emailsloading, setemailsloading] = useState(false);
  useEffect(() => {
    const Getallmail = async () => {
      setemailsloading(true);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.access}` },
      };
      try {
        const { data } = await Axios.get(
          `http://admin.studentdesk.online/mail/received?id=${userInfo.id}&status=archived`,
          config
        );
        if (data) {
          console.log(data);
          setemails(data);
          setemailsloading(false);
        }
      } catch (error) {
        console.log(error);
        setemailsloading(false);
      }
    };

    Getallmail();
  }, []);
  return (
    <main>
      <Sidebar />
      <div className='Mainfull'>
        <div className='mainheader ReplyheadOpt'>
          {/* <div className='Checkboxdrpdown '> */}
          <Link className='Back' to='/main'>
            <MdOutlineArrowBack />
            <span>Back</span>
          </Link>
          <div className='optionOnheaderOfReply'>
            <Link className='Back'>
              <BsArchiveFill />
              <span>Archive</span>
            </Link>
            <Link Link className='Back'>
              <AiFillDelete />
              <span>Delete</span>
            </Link>
            <Link Link className='Back'>
              <RiSpamLine />
              <span>More</span>
            </Link>
          </div>

          {/* </div> */}
        </div>
        {emailsloading ? (
          <Spinner animation='grow' />
        ) : (
          <div className='Maininbox'>
            {emails.length ?
              emails.filter((x) => x.id !== '0')
              .map((x) => (
                <div className='Messages'>
                  <input type='checkbox' name='archive' />
                  {/* onClick={()=>handlelink(x) */}
                  <div>
                    <div className='Screeenallmail'>
                      <div>me,{x.send_from}</div>
                      <div>me,{x.id}</div>
                    </div>

                    {/* <img src={x.attachment_link&&`http://206.189.191.111/media/protected/${x.attachment_link}/jpgg.jpg`} alt="no"></img> */}
                  </div>
                </div>
              )): <div className='empty-icon'><BsInbox /></div>}
          </div>
        )}
      </div>

      {/* <Leftbar/> */}
    </main>
  );
};
