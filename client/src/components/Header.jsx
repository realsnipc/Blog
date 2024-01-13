import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { GiCoolSpices } from "react-icons/gi";
import catPfp from '../assets/pfp.png'

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";

  // If user is logged in, then define username 
  if (userInfo) {
    var username = userInfo.username;
  }
  // Clear token on logout
  async function logout() {
    await fetch(backendUrl + '/logout', {
      credentials: 'include'
    });
    setUserInfo(false);
    window.location = "/"
  }
  // Get user data 
  useEffect(() => {
    try {
      // Fetch cookie if user is logged in (checks if userinfo is null)
      if (!userInfo) {
        fetch(backendUrl + '/profile', {
          credentials: 'include',
        }).then(res => {
          res.json().then(userInfo => {
            if (userInfo == 'Login_Error') {
              setUserInfo(null)
            } else {
              setUserInfo(userInfo);
            }
          });
        });
      }

      // handle error if any
    } catch (error) {
      setUserInfo(null);
    }

  }, []);
  return (
    <>
      <header id='header' className=''>
        <Link id='logo' to='/'><GiCoolSpices /></Link>
        <nav>
          {/* set navbar if username (i.e userInfo) is available */}
          {
            userInfo && (
              <>
                <Link to='/user' className='nav_item'>                <img src="https://source.unsplash.com/random/900×700/?nature" alt="pfp" className='w-7 rounded-2xl h-7 cursor-pointer' /></Link>
                <Link to='/create' className='nav_item'>Create</Link>
                <Link className='nav_item' onClick={logout}>Logout</Link>
              </>
            )
          }
          {/* if userInfo is not available (user is not logged in ) */}
          {
            !userInfo && (
              <>
                <Link to="/login" className='nav_item'>Login</Link>
                <Link to="https://github.com/realsnipc/blog" className='nav_item'>Source</Link>
              </>
            )
          }
        </nav>
      </header>
    </>
  );
}

export default Header;