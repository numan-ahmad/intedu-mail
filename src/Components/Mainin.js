import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { BiCheckbox } from 'react-icons/bi';
import { BsArchiveFill } from 'react-icons/bs';
import { MdForwardToInbox, MdOutlineArrowBack } from 'react-icons/md';
import { RiSpamLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compose } from '../Screen/Compose';
import { LocContext } from './LocationContext';
import Spinner from 'react-bootstrap/Spinner';
import { BsInbox } from 'react-icons/bs';

export const Mainin = () => {
  const { setlink } = useContext(LocContext);
  const { userInfo } = useContext(LocContext);
  const navigate = useNavigate();
  const [emails, setemails] = useState([]);
  const [Sucess, setSucess] = useState(false);
  const [emailsloading, setemailsloading] = useState(false);
  const [emailstatusloading, setemailstatusloadig] = useState(false);
  const [Message, Setmessage] = useState('');
  const [mailid, Setmailid] = useState(null);
  const [mailchoose, Setmailchoose] = useState(false);

  useEffect(() => {
    if (!userInfo.name) {
      navigate('/');
    }
  }, [navigate, userInfo.name]);

  const handlelink = (x) => {
    navigate(`/Reply/${x.id}?path=${x.attachment_link}`);

    setlink(x.attachment_link);
    localStorage.setItem('Link', JSON.stringify(x.attachment_link));
  };

  useEffect(() => {
    if (Sucess) {
      setSucess(false);
    }

    const Getallmail = async () => {
      setemailsloading(true);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.access}` },
      };
      try {
        console.log('dasdasjdasjhdjhsajhdajhjhk');
        const { data } = await Axios.get(
          `http://admin.studentdesk.online/mail/received?id=${userInfo.id}&status=received`,
          config
        );
        if (data) {
          setemails(data);
          setemailsloading(false);
        }
      } catch (error) {
        console.log(error);
        setemailsloading(false);
      }
    };

    Getallmail();
  }, [Sucess]);

  const ChangingStatusApi = async (status) => {
    setemailstatusloadig(true);
    const config = {
      headers: { Authorization: `Bearer ${userInfo.access}` },
    };
    try {
      const { data } = await Axios.patch(
        'http://admin.studentdesk.online/mail/move_mail',
        { email_id: mailid, status: status },
        config
      );
      if (data === 'Email status changed.') {
        setSucess(true);
        console.log('yes hogay');
        setemailstatusloadig(false);
        Setmailchoose(false);
        // setemails(emails)
      } else {
        console.log(data.message);
        setemailstatusloadig(false);
        Setmessage(data);
      }
    } catch (error) {
      setemailstatusloadig(false);
      Setmessage(error);
    }
  };
  const statusChange = (x) => {
    if (x === mailid) {
      Setmailid(' ');
      Setmailchoose(false);
    } else {
      Setmailchoose(true);

      Setmailid(x);
    }
  };

  return (
    <div className='Mainfull'>
      <div className='mainheader ReplyheadOpt'>
        {/* <div className='Checkboxdrpdown '> */}
        <Link className='Back' to='/Inbox'>
          <MdOutlineArrowBack />
          <span className='small'>Back</span>
        </Link>
        <div className='optionOnheaderOfReply'>
          {!mailchoose ? (
            <span className='Back Backarch'>
              <MdForwardToInbox />
              Inbox
            </span>
          ) : (
            <span
              onClick={() => ChangingStatusApi('received')}
              className='back  smallMore'
            >
              <MdForwardToInbox /> Inbox
            </span>
          )}
          {!mailchoose ? (
            <span className='Back Backarch'>
              <MdForwardToInbox />
              Move
            </span>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                <span className='back smallMore '>
                  <MdForwardToInbox />
                  Move
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => ChangingStatusApi('received')}>
                  Inbox
                </Dropdown.Item>
                <Dropdown.Item onClick={() => ChangingStatusApi('archived')}>
                  Archive
                </Dropdown.Item>
                <Dropdown.Item onClick={() => ChangingStatusApi('spam')}>
                  Spam
                </Dropdown.Item>
                <Dropdown.Item onClick={() => ChangingStatusApi('trash')}>
                  Trash
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {!mailchoose ? (
            <span className='Back Backarch'>
              <AiFillDelete /> Delete
            </span>
          ) : (
            <span
              onClick={() => ChangingStatusApi('trash')}
              className='back  smallMore'
            >
              <AiFillDelete /> {'  '}Delete
            </span>
          )}
        </div>

        {/* </div> */}
      </div>

      {/* {Message&&<div>{Message}</div>} */}
      {emailstatusloading && <Spinner />}
      {emailsloading ? (
        <Spinner animation='grow' />
      ) : (
        <div className='Maininbox'>
          {emails.length ? (
            emails
              .filter((x) => x.id !== '0')
              .map((x) => (
                <>
                  <div className='Messages' key={x.id}>
                    <input
                      onClick={() => statusChange(x.id)}
                      type='checkbox'
                      checked={mailid === x.id ? true : false}
                      name='archive'
                    />
                    <div onClick={() => handlelink(x)}>
                      <div className='Screeenallmail'>
                        <div>
                          me,{x.send_from} {x.id}
                        </div>
                      </div>

                      {/* <img src={x.attachment_link&&`http://206.189.191.111/media/protected/${x.attachment_link}/jpgg.jpg`} alt="no"></img> */}
                    </div>
                    <div>
                      {mailid === x.id ? (
                        <span onClick={() => ChangingStatusApi('trash')}>
                          <AiFillDelete />
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </>
              ))
          ) : (
            <div className='empty-icon'>
              <BsInbox />
            </div>
          )}
        </div>
      )}

      {/* <Compose/> */}
    </div>
  );
};
