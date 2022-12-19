import React, { useContext } from 'react';
import Select from 'react-select';
import { FaSistrix, FaAlignJustify } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { RiHome4Fill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { LocContext } from './LocationContext';

// import { useParams } from 'react-router-dom';
const aquaticCreatures = [
  { label: 'Shark', value: 'Shark' },
  { label: 'Dolphin', value: 'Dolphin' },
  { label: 'Whale', value: 'Whale' },
  { label: 'Octopus', value: 'Octopus' },
  { label: 'Crab', value: 'Crab' },
  { label: 'Lobster', value: 'Lobster' },
];
export const Header = () => {
  const { userInfo } = useContext(LocContext);

  const { Humburger, SetHumbuerger } = useContext(LocContext);
  const { pathname } = useLocation();
  console.log(pathname);
  const styles = {
    menu: (base) => ({
      ...base,
      color: 'black',
    }),
  };

  return (
    pathname !== '/' &&
    pathname !== '/Signup' &&
    pathname !== '/Forget' && (
      <>
        <header>
          <div className='resphaeder'>
            {!Humburger ? (
              <div className='menu-bar' onClick={() => SetHumbuerger(true)}>
                <FaAlignJustify />
              </div>
            ) : (
              <div onClick={() => SetHumbuerger(false)}>
                <ImCross />
              </div>
            )}
            <div className='serachbar'>
              <div className='serachmain'>
                <Select
                  styles={styles}
                  options={aquaticCreatures.map((opt) => ({
                    label: opt.label,
                    value: opt.value,
                  }))}
                  isMulti
                />
                <FaSistrix className='n' />
              </div>
              {/* <div>
                </div> */}
            </div>
          </div>

          <div className='fordesk'>
            <div className='mainserach'>
              <div className='resplogo'>
                <img src='/Images/mainlogo.PNG' alt='logomain'></img>
              </div>
              <div className='serachbar'>
                <div className='serachmain'>
                  <Select
                    styles={styles}
                    options={aquaticCreatures.map((opt) => ({
                      label: opt.label,
                      value: opt.value,
                    }))}
                    isMulti
                  />
                </div>
                <div>
                  <FaSistrix className='n' />
                </div>
              </div>
            </div>

            <div className='profile'>
              <div>
                <BiUserCircle className='pic' />
                {userInfo.name ? userInfo.name : ''}
              </div>
              <div>
                <RiHome4Fill className='home' />
                Home
              </div>
            </div>
          </div>
          {/* {
        Humburger&&(
      <div className='resphaeder' onClick={()=>SetHumbuerger(false)}>
                <ImCross/>
              </div>)
   
  } */}
        </header>
        {/* </CSSTransition> */}
      </>
    )
  );
};
